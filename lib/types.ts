export type ProjectCategory = 'Showreel' | 'Logo animation' | 'Brand identity'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface ProjectSummary {
  _id: string
  title: string
  slug: { current: string }
  category: ProjectCategory
  coverImage: SanityImage
  mainVideo?: string
  shortDescription?: string
  order?: number
  year?: number
  featured?: boolean
}

export interface AdditionalVideo {
  _key: string
  videoUrl: string
  caption?: string
}

export interface ProjectFull extends ProjectSummary {
  client?: string
  mainVideo?: string
  additionalVideos?: AdditionalVideo[]
  caseStudy?: PortableTextBlock[]
}

// Minimal type for PortableText blocks
export interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: unknown
}
