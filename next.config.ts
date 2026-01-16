import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const isStaticExport = process.env.BUILD_MODE === 'static'

const nextConfig: NextConfig = {
  // Conditionally enable static export for GitHub Pages
  ...(isStaticExport && {
    output: 'export',
    distDir: 'out',
    images: {
      unoptimized: true,
    },
    // Base path for GitHub Pages (set via env variable)
    basePath: process.env.GITHUB_PAGES_PATH || '',
    // Exclude payload routes from static export by using custom extensions
    // Pages in (payload) group won't be built for static export
    pageExtensions: ['page.tsx', 'page.ts', 'tsx', 'ts'],
  }),
}

// Only wrap with Payload for non-static builds
export default isStaticExport ? nextConfig : withPayload(nextConfig)
