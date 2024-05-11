async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
  } else {
    const { worker } = await import('./browser')
    await worker.start()
  }
}
// @ts-ignore-next-line
await initMocks()

export {}
