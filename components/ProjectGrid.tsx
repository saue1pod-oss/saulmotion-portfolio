import {getAllProjects} from '@/lib/queries'
import FilteredGrid from './FilteredGrid'

export default async function ProjectGrid() {
  const projects = await getAllProjects()
  return <FilteredGrid projects={projects} />
}
