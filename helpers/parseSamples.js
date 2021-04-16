export function parseSamples(data) {
  return data.currentPage.map((s) => ({
    id: s.id,
    imageUrl: s.thumbnails.medium.url,
    title: s.title.length > 50 ? s.title.slice(0, 50) + '...' : s.title,
    authorName: s.channelTitle,
  }))
}
