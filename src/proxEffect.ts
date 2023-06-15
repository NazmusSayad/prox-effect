export interface Options {
  anchor: HTMLElement
  handler: (degree: number) => void
  container?: HTMLElement
}

export default function proxEffect(options: Options) {
  const { anchor, handler, container = document.documentElement } = options

  // Validation....
  if (!(anchor instanceof HTMLElement && container instanceof HTMLElement)) {
    throw new Error(`'anchor' and 'container' must be a html element.`)
  }
  if (typeof handler !== 'function') {
    throw new Error('Handler must be a funciton.')
  }

  // Init...
  let anchorX: number, anchorY: number

  function updatePosition() {
    const rect = anchor.getBoundingClientRect()
    anchorX = rect.left + rect.width / 2
    anchorY = rect.top + rect.height / 2
  }

  function getAngle(cx: number, cy: number, ex: number, ey: number) {
    const dy = ey - cy
    const dx = ex - cx
    const rad = Math.atan2(dy, dx)
    const rad360 = rad < 0 ? rad + 2 * Math.PI : rad
    const deg = (rad360 * 180) / Math.PI
    return deg
  }

  function listnenMouseMove(e: MouseEvent) {
    const mouseX = e.clientX
    const mouseY = e.clientY
    const deg = getAngle(mouseX, mouseY, anchorX, anchorY)
    handler(deg - 90)
  }

  updatePosition()
  window.addEventListener('scroll', updatePosition)
  window.addEventListener('resize', updatePosition)
  container.addEventListener('mousemove', listnenMouseMove)

  return {
    updatePosition() {
      updatePosition()
    },
    abort() {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
      container.removeEventListener('mousemove', listnenMouseMove)
    },
  }
}
