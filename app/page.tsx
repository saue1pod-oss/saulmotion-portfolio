import ProjectGrid from '@/components/ProjectGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-screen-xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-light tracking-tight">SaulMotion</h1>
        </header>
        <ProjectGrid />
      </div>
    </main>
  )
}
