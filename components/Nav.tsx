import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/images/saulmotion-wordmark-white.png"
          alt="SaulMotion"
          height={20}
          width={120}
          style={{height: 20, width: 'auto'}}
          priority
        />
      </Link>
    </nav>
  )
}
