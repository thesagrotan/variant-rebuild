
import { Project, ProjectImage, ProjectImageSettings } from '@/data/projects'
import { FrameConfig } from '@/lib/frames'
// import { SiteContent } from '@/data/siteContent' // Is exported as const, but type is exported too.
import type { SiteContent } from '@/data/siteContent'

// Simple Lexical to Markdown string converter
function lexicalToMarkdown(root: any): string {
    if (!root || !root.children) return ''

    return root.children.map((block: any) => {
        if (block.type === 'paragraph') {
            return block.children.map((child: any) => {
                if (child.type === 'text') {
                    if (child.format === 1) { // Bold
                        return `**${child.text}**`
                    }
                    return child.text
                }
                return ''
            }).join('')
        }
        return ''
    }).join('\n\n')
}

// Transform Payload Media to URL
function getMediaUrl(media: any): string {
    if (!media) return ''
    if (typeof media === 'string') return media // ID?
    if (media.url) return media.url
    return ''
}

export function transformProject(doc: any): Project {
    const transformSettings = (settings: any): ProjectImageSettings => ({
        objectFit: 'cover', // defaults
        objectPosition: settings?.objectPosition || 'center',
        scale: settings?.scale || 1,
        translateX: settings?.translateX || '0',
        translateY: settings?.translateY || '0'
    })

    const cardImages = (doc.images || []).map((img: any) => ({
        src: getMediaUrl(img.image),
        alt: img.image?.alt || doc.title,
        width: img.image?.width,
        height: img.image?.height,
        ...transformSettings(img.cardSettings)
    }))

    const detailImages = (doc.images || []).map((img: any) => ({
        src: getMediaUrl(img.image),
        alt: img.image?.alt || doc.title,
        width: img.image?.width,
        height: img.image?.height,
        ...transformSettings(img.detailSettings)
    }))

    return {
        id: doc.projectId, // Payload field 'projectId' maps to App 'id'
        title: doc.title,
        year: doc.year,
        categories: (doc.categories || []).map((c: any) => c.category),
        longDescription: lexicalToMarkdown(doc.longDescription.root),
        logo: getMediaUrl(doc.logo),
        logoText: doc.logoText,
        images: {
            card: cardImages as [ProjectImage, ProjectImage, ProjectImage],
            detail: detailImages as [ProjectImage, ProjectImage, ProjectImage]
        }
    }
}

export function transformFrame(doc: any): FrameConfig {
    return {
        id: doc.frameId,
        tag: doc.tag,
        initialX: {
            relX: doc.initialX.relX,
            relY: doc.initialX.relY,
            w: doc.initialX.w,
            h: doc.initialX.h
        },
        width: doc.width,
        height: doc.height,
        rotation: doc.rotation,
        type: doc.type,
        src: getMediaUrl(doc.media)
    }
}

export function transformSiteSettings(doc: any): SiteContent {
    return {
        hero: {
            intro: lexicalToMarkdown(doc.hero.intro.root),
            experience: lexicalToMarkdown(doc.hero.experience.root),
            approach: lexicalToMarkdown(doc.hero.approach.root),
            lead: lexicalToMarkdown(doc.hero.lead.root),
            cta: doc.hero.cta,
            email: doc.hero.email
        },
        selectedWork: doc.selectedWorkTitle,
        helpWith: {
            heading: doc.helpWith.heading,
            links: doc.helpWith.links.map((row: any) => row.row.map((item: any) => item.text))
        }
    }
}
