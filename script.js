import proximityEffect from './dist-mjs/proxEffect.mjs'
// import proximityEffect from './dist-mjs/proxEffect.js'

const anchor = document.getElementById('anchor')
const pe = proximityEffect({ anchor }, function (deg) {
  anchor.style.rotate = `${deg - 90}deg`
})

// Another Logic:
const container = document.getElementById('container')
let mouseDown = false

container.onpointerdown = () => (mouseDown = true)
document.onpointerup = () => (mouseDown = false)
document.onpointermove = (e) => {
  if (!mouseDown) return
  container.style.top = e.clientY + 'px'
  container.style.left = e.clientX + 'px'
  pe.updatePosition()
}
