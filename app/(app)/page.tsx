
import { getProjects, getFrames, getSiteSettings } from '@/lib/api'
import { transformProject, transformFrame, transformSiteSettings } from '@/lib/transformers'
import ClientHome from '@/components/home/ClientHome'

export const dynamic = 'force-static' // Output static pages for GitHub Pages

export default async function Page() {
  const payloadProjects = await getProjects()
  const payloadFrames = await getFrames()
  const payloadSiteSettings = await getSiteSettings()

  const projects = payloadProjects.map(transformProject)
  const frames = payloadFrames.map(transformFrame)
  const siteContent = transformSiteSettings(payloadSiteSettings)

  return (
    <ClientHome
      projects={projects}
      frames={frames}
      siteContent={siteContent}
    />
  )
}
