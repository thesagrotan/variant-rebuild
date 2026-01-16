
import { Project, ProjectImage, ProjectImageSettings } from '@/data/projects'
import { FrameConfig } from '@/lib/frames'
// import { SiteContent } from '@/data/siteContent' // Is exported as const, but type is exported too.
import { SiteContent, siteContent } from '@/data/siteContent'

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

export function transformPage(doc: any): SiteContent {
    if (!doc || !doc.layout) {
        return siteContent; // Return default if not found
    }

    return doc.layout.map((block: any) => {
        switch (block.blockType) {
            case 'richText':
                return {
                    type: 'richText',
                    content: lexicalToMarkdown(block.content?.root),
                    style: block.style || 'default'
                };
            case 'carousel':
                return {
                    type: 'carousel',
                    icons: block.carousel?.map((item: any) => ({
                        url: getMediaUrl(item.icon),
                        alt: item.icon?.alt || ''
                    })) || []
                };
            case 'selectedWorks':
                return {
                    type: 'selectedWorks',
                    title: block.title
                };
            case 'helpWith':
                return {
                    type: 'helpWith',
                    heading: block.heading,
                    links: block.links?.map((row: any) => row.row.map((item: any) => item.text)) || []
                };
            default:
                return null;
        }
    }).filter(Boolean) as SiteContent;
}

export function transformSiteSettings(doc: any): { siteTitle: string, siteDescription: string } {
    return {
        siteTitle: doc.metadata?.siteTitle || 'Portfolio',
        siteDescription: doc.metadata?.siteDescription || ''
    }
}
