export function toVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

export function toVimeoEmbed(url: string): string {
  const id = toVimeoId(url)
  return id ? `https://player.vimeo.com/video/${id}` : url
}
