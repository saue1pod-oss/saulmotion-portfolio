import Nav from '@/components/Nav'
import ProjectGrid from '@/components/ProjectGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0]">
      <Nav />

      <div className="mx-auto max-w-screen-xl px-6 pb-24 md:px-10">
        {/* Hero title */}
        <h1 className="mb-12 font-serif text-[28px] italic leading-tight tracking-[-0.02em] md:text-[32px]">
          Identity{' '}
          <span style={{color: '#FF454E'}}>in motion.</span>
        </h1>

        <ProjectGrid />
      </div>
    </main>
  )
}
