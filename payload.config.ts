import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Media } from './src/payload/collections/Media.ts'
import { Projects } from './src/payload/collections/Projects.ts'
import { Frames } from './src/payload/collections/Frames.ts'
import { Users } from './src/payload/collections/Users.ts'
import { SiteSettings } from './src/payload/globals/SiteSettings.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    // Admin panel configuration
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },

    // Collections
    collections: [Users, Media, Projects, Frames],

    // Globals
    globals: [SiteSettings],

    // Rich text editor
    editor: lexicalEditor(),

    // Secret for payload
    secret: process.env.PAYLOAD_SECRET || 'development-secret-change-in-production',

    // TypeScript output
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },

    // Database adapter
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || 'mongodb://localhost:27017/portfolio',
    }),

    // Sharp for image processing
    sharp,

    // CORS settings for development
    cors: ['http://localhost:3000'],
})
