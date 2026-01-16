import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

// Import generated types
import type { Config, Project, Frame, SiteSetting, Page } from '@/payload-types'

// Singleton for Payload Client
// Cached to prevent multiple connections in dev mode (hot reload)
let cachedPayload: Payload | null = null

export const getPayloadClient = async (): Promise<Payload> => {
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET is missing')
    }

    if (cachedPayload) {
        return cachedPayload
    }

    cachedPayload = await getPayload({ config })
    return cachedPayload
}

// Data Fetching Functions
// Wrapped in React cache() if we want request-level memoization, 
// strictly not needed for static builds but good practice.

export const getProjects = cache(async (): Promise<Project[]> => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'projects',
        depth: 2, // Populate images.image
        limit: 100,
        sort: 'year', // or custom sort
    })
    return docs
})

export const getFrames = cache(async (): Promise<Frame[]> => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'frames',
        depth: 1,
        limit: 100,
    })
    return docs
})

export const getPage = cache(async (slug: string): Promise<Page | null> => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 1,
        limit: 1,
    })
    return docs[0] || null
})

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
    const payload = await getPayloadClient()
    return await payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
    })
})
