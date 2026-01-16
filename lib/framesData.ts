/**
 * Frames Data Utility
 * 
 * Provides frame configuration data for the canvas.
 * This mirrors the existing FRAMES export but can be enhanced
 * to fetch from PayloadCMS in the future.
 */

import { FRAMES, FrameConfig } from './frames'

/**
 * Get all frame configurations
 */
export async function getFrames(): Promise<FrameConfig[]> {
    // For now, return static frame data
    // When PayloadCMS is integrated, this can query the frames collection
    return FRAMES
}

/**
 * Get a single frame by ID
 */
export async function getFrameById(id: string): Promise<FrameConfig | undefined> {
    return FRAMES.find(frame => frame.id === id)
}
