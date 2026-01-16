
import { getProjects, getFrames, getPage } from '@/lib/api'
import { transformProject, transformFrame, transformPage } from '@/lib/transformers'
import ClientHome from '@/components/home/ClientHome'

export const dynamic = 'force-static' // Output static pages for GitHub Pages

export default async function Page() {
  const payloadProjects = await getProjects()
  const payloadFrames = await getFrames()
  const payloadPage = await getPage('home')

  const projects = payloadProjects.map(transformProject)
  const frames = payloadFrames.map(transformFrame)
  const siteContent = transformPage(payloadPage)

  return (
    <ClientHome
      projects={projects}
      frames={frames}
      siteContent={siteContent}
    />
  )
}
