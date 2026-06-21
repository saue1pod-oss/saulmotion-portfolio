'use client'

import SmoothScrollProvider from './SmoothScrollProvider'
import PageTransitionOverlay from './PageTransitionOverlay'
import LoadingScreen from './LoadingScreen'

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <>
      <SmoothScrollProvider />
      <LoadingScreen />
      <PageTransitionOverlay />
      {children}
    </>
  )
}
