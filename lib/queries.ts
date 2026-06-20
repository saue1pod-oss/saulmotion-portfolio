import {client} from './sanity'
import type {ProjectSummary, ProjectFull} from './types'

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

export async function getProjectBySlug(slug: string): Promise<ProjectFull | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      ${projectSummaryFields},
      client,
      mainVideo,
      additionalVideos[]{_key, videoUrl, caption},
      caseStudy
    }`,
    {slug},
  )
}
