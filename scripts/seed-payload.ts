
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { projects } from '@/data/projects.json'
import { FRAMES } from '@/lib/frames'
// import { siteContent } from '@/data/siteContent' // Can't easily import TS file in script without compilation or ts-node hacks for mixed types. 
// Easier to just read the file or hardcode the import if using tsx. 
// Since we use tsx, we can import it if we fix module resolution.
// Let's try dynamic import or just re-declaring it if simple.
// It is simple, but importing is better.
import { siteContent } from '@/data/siteContent'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Helper to convert Markdown-style **bold** text to Lexical RichText
function generateLexicalFromMarkdown(text: string) {
    const parts = text.split(/(\*\*.*?\*\*)/g)

    const children = parts.map((part) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return {
                type: 'text',
                text: part.slice(2, -2),
                format: 1, // Bold
                version: 1,
            }
        }
        if (part === '') return null
        return {
            type: 'text',
            text: part,
            format: 0,
            version: 1,
        }
    }).filter(Boolean)

    return {
        root: {
            type: 'root',
            format: '' as const,
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            children: [
                {
                    type: 'paragraph',
                    format: '' as const,
                    indent: 0,
                    version: 1,
                    direction: 'ltr' as const,
                    children: children,
                }
            ],
        },
    }
}

// Simple text to lexical for descriptions
function generateLexicalFromText(text: string) {
    if (!text) return { root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const, children: [] } }

    // Split by double newline for paragraphs
    const paragraphs = text.split('\n\n')

    return {
        root: {
            type: 'root',
            format: '' as const,
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            children: paragraphs.map(p => ({
                type: 'paragraph',
                format: '' as const,
                indent: 0,
                version: 1,
                direction: 'ltr' as const,
                children: [
                    {
                        type: 'text',
                        text: p,
                        format: 0,
                        version: 1,
                    }
                ]
            }))
        }
    }
}

async function seed() {
    const payload = await getPayload({ config: configPromise })

    console.log('--- Starting Seed ---')

    // 1. Upload Media
    // We need to map old paths to new Media IDs
    // key: "original_path" -> value: "media_id"
    const mediaMap = new Map<string, string>()

    async function uploadFile(filePath: string, alt: string): Promise<string | null> {
        try {
            const absolutePath = path.join(process.cwd(), 'public', filePath)
            if (!fs.existsSync(absolutePath)) {
                console.warn(`File not found: ${filePath}`)
                return null
            }

            const buffer = fs.readFileSync(absolutePath)
            const filename = path.basename(filePath)

            // Check if exists
            const existing = await payload.find({
                collection: 'media',
                where: {
                    filename: { equals: filename }
                }
            })

            if (existing.docs.length > 0) {
                return existing.docs[0].id
            }

            const media = await payload.create({
                collection: 'media',
                data: {
                    alt,
                },
                file: {
                    data: buffer,
                    name: filename,
                    mimetype: filePath.endsWith('mp4') ? 'video/mp4' : 'image/png', // Simple mime check
                    size: buffer.length
                }
            })
            return media.id
        } catch (e) {
            console.error(`Failed to upload ${filePath}:`, e)
            return null
        }
    }

    // Upload Project Images
    for (const project of projects) {
        if (project.logo) {
            const id = await uploadFile(project.logo, `${project.title} Logo`)
            if (id) mediaMap.set(project.logo, id)
        }
        for (const img of (project.images || [])) {
            if (img.src) {
                const id = await uploadFile(img.src, img.alt || project.title)
                if (id) mediaMap.set(img.src, id)
            }
        }
    }

    // Upload Frame Images
    for (const frame of FRAMES) {
        if (frame.src) {
            const id = await uploadFile(frame.src, frame.tag)
            if (id) mediaMap.set(frame.src, id)
        }
    }

    console.log('Media uploaded.')

    // 2. Seed Projects
    console.log('Seeding Projects...')
    // Clear existing (optional, careful in prod)
    // await payload.delete({ collection: 'projects', where: { id: { exists: true } } })

    for (const project of projects) {
        const formattedImages = await Promise.all((project.images || []).map(async (img: any) => {
            const mediaId = mediaMap.get(img.src)
            if (!mediaId) return null

            return {
                image: mediaId,
                cardSettings: {
                    objectPosition: img.card?.objectPosition,
                    scale: img.card?.scale,
                    translateX: img.card?.translateX,
                    translateY: img.card?.translateY
                },
                detailSettings: {
                    objectPosition: img.detail?.objectPosition
                }
            }
        }))

        const existingProject = await payload.find({
            collection: 'projects',
            where: { projectId: { equals: project.id } }
        })

        const data = {
            projectId: project.id,
            title: project.title,
            year: project.year,
            categories: project.categories.map((c: string) => ({ category: c })),
            longDescription: generateLexicalFromText(project.longDescription),
            logo: project.logo ? mediaMap.get(project.logo) : undefined,
            logoText: project.logoText,
            images: formattedImages.filter((img): img is NonNullable<typeof formattedImages[number]> => img !== null)
        }

        if (existingProject.docs.length > 0) {
            await payload.update({
                collection: 'projects',
                id: existingProject.docs[0].id,
                data
            })
        } else {
            await payload.create({
                collection: 'projects',
                data
            })
        }
    }

    // 3. Seed Frames
    console.log('Seeding Frames...')
    for (const frame of FRAMES) {
        const mediaId = mediaMap.get(frame.src)
        if (!mediaId) {
            console.warn(`No media for frame ${frame.id}`)
            continue
        }

        const existingFrame = await payload.find({
            collection: 'frames',
            where: { frameId: { equals: frame.id } }
        })

        const data = {
            frameId: frame.id,
            tag: frame.tag,
            type: frame.type,
            media: mediaId,
            initialX: {
                relX: frame.initialX.relX,
                relY: frame.initialX.relY,
                w: frame.initialX.w,
                h: frame.initialX.h
            },
            width: frame.width,
            height: frame.height,
            rotation: frame.rotation
        }

        if (existingFrame.docs.length > 0) {
            await payload.update({
                collection: 'frames',
                id: existingFrame.docs[0].id,
                data
            })
        } else {
            await payload.create({
                collection: 'frames',
                data
            })
        }
    }

    // 4. Seed Site Content
    console.log('Seeding Site Settings...')
    await payload.updateGlobal({
        slug: 'site-settings',
        data: {
            hero: {
                intro: generateLexicalFromMarkdown(siteContent.hero.intro),
                experience: generateLexicalFromMarkdown(siteContent.hero.experience),
                approach: generateLexicalFromMarkdown(siteContent.hero.approach),
                lead: generateLexicalFromMarkdown(siteContent.hero.lead),
                cta: siteContent.hero.cta,
                email: siteContent.hero.email
            },
            selectedWorkTitle: siteContent.selectedWork,
            helpWith: {
                heading: siteContent.helpWith.heading,
                links: siteContent.helpWith.links.map(row => ({
                    row: row.map(text => ({ text }))
                }))
            },
            metadata: {
                siteTitle: "Portfolio",
                siteDescription: "A high-fidelity reconstruction of Portfolio"
            }
        }
    })

    console.log('--- Seed Complete ---')
    process.exit(0)
}

seed()
