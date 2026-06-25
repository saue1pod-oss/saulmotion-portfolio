import {client} from './sanity'
import type {ProjectSummary, ProjectFull, AboutData} from './types'

const projectSummaryFields = `
  _id,
  title,
  slug,
  category,
  coverImage,
  mainVideo,
  shortDescription,
  order,
  year,
  featured
`

export async function getAllProjects(): Promise<ProjectSummary[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc, year desc) { ${projectSummaryFields} }`,
  )
}

export async function getAboutData(): Promise<AboutData | null> {
  return client.fetch(
    `*[_type == "about"][0]{ photo, paragraph1, paragraph2 }`,
  )
}

export async function getProjectBySlug(slug: string): Promise<ProjectFull | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      ${projectSummaryFields},
      client,
      collaborators,
      mainVideo,
      additionalVideos[]{_key, videoUrl, caption},
      caseStudy
    }`,
    {slug},
  )
}
