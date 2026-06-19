import {NextResponse} from 'next/server'
import {client} from '@/lib/sanity'

export async function GET() {
  try {
    const projects = await client.fetch(`*[_type == "project"]{_id, title, category}`)
    return NextResponse.json({
      ok: true,
      message: 'Sanity connection successful',
      projectCount: projects.length,
      projects,
    })
  } catch (error) {
    return NextResponse.json(
      {ok: false, error: String(error)},
      {status: 500},
    )
  }
}
