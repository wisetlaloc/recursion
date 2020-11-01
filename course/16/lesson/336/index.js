const target = document.getElementById('slider-container')
const sliderItems = document.querySelectorAll('.slider-data .slider-item')

const sliderShow = document.createElement('div')
const main = document.createElement('div')
const extra = document.createElement('div')

sliderShow.classList.add('d-flex', 'flex-nowrap', 'overflow-hiddens', 'justify-content-center')

main.classList.add('main', 'full-width')
extra.classList.add('extra', 'full-width')

main.append(sliderItems[0])

sliderShow.append(main)
sliderShow.append(extra)
target.append(sliderShow)

main.setAttribute('data-index', '0')
const resizeElements = () => {
  main.style.marginLeft = `${(target.offsetWidth - 224) / 2}px`
}
resizeElements()
window.addEventListener('resize', () => resizeElements())

// ここからJavaScriptを記述してください。
function slideJump(dir) {
  const steps = dir === 'right' ? 1 : -1
  let index = parseInt(main.getAttribute('data-index'))
  const currentElement = sliderItems.item(index)

  index += steps

  if (index < 0) index = sliderItems.length -1
  else if (index >= sliderItems.length) index = 0

  const nextElement = sliderItems.item(index)

  main.setAttribute('data-index', index.toString())
  animateMain(currentElement, nextElement, dir)
}

function animateMain(currentElement, nextElement, animationType) {
  main.innerHTML = ''
  main.append(nextElement)

  extra.innerHTML = ''
  extra.append(currentElement)

  main.classList.add('expand-animation')
  extra.classList.add('deplete-animation')

  if (animationType === 'right') {
    sliderShow.innerHTML = ''
    sliderShow.append(extra)
    sliderShow.append(main)
  } else if (animationType === 'left') {
    sliderShow.innerHTML = ''
    sliderShow.append(main)
    sliderShow.append(extra)
  }
}

// const items = {
//   1: { name: 'popcor'}
// }