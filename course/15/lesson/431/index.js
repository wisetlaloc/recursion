class Wallpaper {
  static DEFAULT_CLASSES = ['d-flex', 'my-5']
  constructor(vertical, horizontal, width) {
    this.el = Wallpaper.generateWallpaper(vertical, horizontal, width)
  }

  static generateWallpaper(vertical, horizontal, width) {
    const div = document.createElement('div')
    div.classList.add(...Wallpaper.DEFAULT_CLASSES, this.verticalClass(vertical), this.horizontalClass(horizontal))
    div.style.width = width
    return div
  }

  static verticalClass(type) {
    switch (type) {
      case 'top': return 'align-items-top'
      case 'center': return 'align-items-middle'
      case 'bottom': return 'align-items-bottom'
    }
  }

  static horizontalClass(type) {
    switch (type) {
      case 'left': return 'justify-content-start'
      case 'center': return 'justify-content-center'
      case 'right': return 'justify-content-end'
    }
  }
}

const img = (url, width) => {
  const img = document.createElement('img')
  img.src = url
  img.width = width
  return img
}

const quote = (text, color) => {
  const p = document.createElement('p')
  p.classList.add('position-absolute', 'w-50p', 'display-6')
  p.innerText = text
  p.style.color = `#${color}`
  return p
}

const motivationalSpeechWallpaper = (speech, color, imageUrl, vertical, horizontal, target) => {
  const width = target.parentElement.offsetWidth
  const wallpaper = new Wallpaper(vertical, horizontal, width).el
  wallpaper.append(img(imageUrl, width))
  wallpaper.append(quote(speech, color))
  target.append(wallpaper)
}

const domObj = document.getElementById('target')

const showWallpapers = () => {
  motivationalSpeechWallpaper(
      'Perfection is achieved, not when there is nothing more to add, ' +
  'but when there is nothing left to take away. - Antoine de Saint', '2c3e50',
      'https://recursionist.io/img/different-job.png', 'center', 'center', domObj)

  motivationalSpeechWallpaper('The scientist discovers a new type of material or energy and the engineer discovers ' +
 'a new use for it. - Gordon Lindsay Glegg', '2c3e50',
  'https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg', 'bottom', 'left', domObj)

  motivationalSpeechWallpaper('Scientists study the world as it is, engineers create the world that never has been. ' +
  '- Theodore von Karman', 'ecf0f1',
  'https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg', 'top', 'right', domObj)
}

showWallpapers()
