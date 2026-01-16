/**
 * Data Layer Utilities
 * 
 * This module provides data fetching utilities that work in both:
 * 1. Development mode: Can query PayloadCMS when available
 * 2. Static build mode: Uses pre-exported JSON files
 */

import projectsData from '@/data/projects.json'
import { projects as transformedProjects, Project, getProjectById as getProjectByIdLocal } from '@/data/projects'
import { siteContent as staticSiteContent, SiteContent } from '@/data/siteContent'

// Check if we're in static build mode
const isStaticBuild = process.env.BUILD_MODE === 'static'

/**
 * Get all projects
 * In static mode, uses the pre-transformed projects from projects.ts
 * In development mode, could query PayloadCMS (future enhancement)
 */
export async function getProjects(): Promise<Project[]> {
    // For now, always use static data
    // When PayloadCMS is fully integrated, this can query the CMS in dev mode
    return transformedProjects
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<Project | undefined> {
    // For now, always use static data
    return getProjectByIdLocal(id)
}

/**
 * Get site content (hero text, metadata, etc.)
 */
export async function getSiteContent(): Promise<SiteContent> {
    // For now, always use static data
    // When PayloadCMS is fully integrated, this can query the site-settings global
    return staticSiteContent
}

/**
 * For PayloadCMS integration (future use)
 * These functions will query PayloadCMS Local API when enabled
 */

// Placeholder for PayloadCMS query function
// async function queryPayload<T>(collection: string, query?: object): Promise<T[]> {
//   const payload = await getPayload({ config })
//   const result = await payload.find({
//     collection,
//     ...query,
//   })
//   return result.docs as T[]
// }
