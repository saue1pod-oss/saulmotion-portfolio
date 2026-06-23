export function toVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/)?(\d+)/)
  return match ? match[1] : null
}

export function toVimeoEmbed(url: string): string {
  const id = toVimeoId(url)
  return id ? `https://player.vimeo.com/video/${id}?transparent=0&autoplay=0` : url
}

/** Background mode: autoplay, muted, loop, no player UI */
export function toVimeoBackground(url: string): string {
  const id = toVimeoId(url)
  return id ? `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1` : url
}
