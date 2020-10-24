class MyFile {
  static fileTypes = {'document': ['.word', '.pdf', '.txt'],
    'source-code': ['.js', '.css', '.html'],
    'video': ['.mp4'],
    'music': ['.mp3'],
  }

  constructor(fileName, fileExtension, content, locked, parentFolder) {
    this.fileName = fileName
    this.fileExtension = MyFile.setFileType(fileExtension)
    this.content = content
    this.locked = locked
    this.parentFolder = parentFolder
  }

  static setFileType(fileType) {
    return Object.values(MyFile.fileTypes).flat().indexOf(fileType) === -1 ? '.txt' : fileType
  }

  getLifetimeBandwidthSize() {
    return MyFile.formatBytes(this.content.length * 10 * 1024 * 1024)
  }

  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  getFileType() {
    for (const [key, value] of Object.entries(MyFile.fileTypes)) {
      if (value.indexOf(this.fileExtension) !== -1) return key
    }
  }

  prependContent(data) {
    if (this.locked) return

    const content = data + this.content
    this.content = content
    return content
  }

  appendContent(data) {
    if (this.locked) return

    const content = this.content + data
    this.content = content
    return content
  }

  addContent(data, position) {
    if (this.locked) return

    const content = this.content.substring(0, position) + data + this.content.substring(position)
    this.content = content
    return content
  }

  showFileLocation() {
    return `${this.parentFolder} > ${this.fileName}${this.fileExtension}`
  }
}

const assignment = new MyFile('assignment', '.word',
    'Something that occurs too early before preparations are ready. Starting too soon.',
    false, 'homework')

console.log(assignment.getLifetimeBandwidthSize())
console.log(assignment.getFileType())
console.log(assignment.prependContent('good morning '))
console.log(assignment.appendContent(' good evening.'))
console.log(assignment.addContent('hello world', 13))
console.log(assignment.showFileLocation())
