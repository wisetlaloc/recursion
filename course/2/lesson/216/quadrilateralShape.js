class QuadrilateralShape {
  constructor(ab, bc, cd, da) {
    this.ab = ab
    this.bc = bc
    this.cd = cd
    this.da = da
    this.ac = new Line(this.ab.start, this.cd.start)
    this.bd = new Line(this.bc.start, this.da.start)
    this.resetUnlessConnected()
  }

  resetUnlessConnected() {
    const notConnected = [
      [this.ab.start, this.da.end], [this.bc.start, this.ab.end],
      [this.cd.start, this.bc.end], [this.da.start, this.cd.end],
    ].some(([p1, p2]) => !p1.equals(p2))

    if (notConnected) {
      this.ab = this.bc = this.cd = this.da = this.ac = this.bd = new Line(Point.origin(), Point.origin())
    }
  }

  getShapeType() {
    if (!this.isQuadrilateral()) return 'not a quadrilateral'
    if (this.sameLength(...this.sides())) {
      if (this.sameLength(...this.diagnals())) return 'square(正方形)'
      return 'rhombus(ひし形)'
    }
    if (this.parallelSidePairs() === 2) {
      if (this.sameLength(...this.diagnals())) return 'rectangle(長方形)'
      return 'parallelogram(平行四辺形)'
    }
    if (this.parallelSidePairs() === 1) return 'trapezoid(台形)'
    if (this.isAKite()) return 'kite(凧)'
    return 'other（その他）'
  }

  getPerimeter() {
    return Math.floor(this.sides().reduce((acc, side) => acc + side.length(), 0) * 100) / 100
  }

  getAngle(angleString) {
    switch (angleString) {
      case 'DAB': return this.da.angle(this.ab.reversed())
      case 'ABC': return this.ab.angle(this.bc.reversed())
      case 'BCD': return this.bc.angle(this.cd.reversed())
      case 'CDA': return this.cd.angle(this.da.reversed())
    }
  }

  getArea() {
    return this.getAreaOfTriangle(this.da, this.ab.reversed()) + this.getAreaOfTriangle(this.bc, this.cd.reversed())
  }

  getAreaOfTriangle(line1, line2) {
    return Math.abs(line1.outerProduct(line2)) / 2
  }

  sameLength(...lines) {
    return lines.every(line => line.length() == lines[0].length())
  }

  showPoints() {
    return this.sides().map(side => `(${side.start.x}, ${side.start.y})`).join(' ')
  }

  showInfo() {
    console.log(`Generate quadrilateral with points ${this.showPoints()}`)
    console.log(`ShapeType: ${this.getShapeType()}`)
    console.log(`Perimeter: ${this.getPerimeter()}`)
    console.log(`Angles: ${['DAB', 'ABC', 'BCD', 'CDA'].map(angle => `${angle}: ${this.getAngle(angle)}`).join(', ')}`)
    console.log(`Area: ${this.getArea()}`)
    this.draw()
  }

  sides() {
    return [this.ab, this.bc, this.cd, this.da]
  }

  oppositeSides() {
    return [[this.ab, this.cd], [this.bc, this.da]]
  }

  diagnals() {
    return [this.ac, this.bd]
  }

  isQuadrilateral() {
    return this.allSidesArePositive() && this.allNextSidesNotParallel()
  }

  allSidesArePositive() {
    return this.sides().every(side => side.length() > 0)
  }

  allNextSidesNotParallel() {
    return [[0, 1], [0, 3], [1, 2], [2, 3]]
        .every(([i, j]) => !this.isParallel(this.sides()[i], this.sides()[j]))
  }

  parallelSidePairs() {
    return this.oppositeSides().filter(pair => this.isOppositeParallel(...pair)).length
  }

  isAKite() {
    return (this.sameLength(this.ab, this.bc) && this.sameLength(this.cd, this.da)) ||
      (this.sameLength(this.bc, this.cd) && this.sameLength(this.da, this.ab))
  }

  isParallel(...lines) {
    return lines[0].isParallel(lines[1])
  }

  isOppositeParallel(...lines) {
    return lines[0].isOppositeParallel(lines[1])
  }

  draw() {
    const canvas = new Canvas(this.x()['max'] - this.x()['min'], this.y()['max'] - this.y()['min'])
    this.sides().forEach(side => canvas.add(side))
    canvas.draw()
  }

  x() {
    return {max: Math.max(...this.sides().map(side => side.x()['max'])),
      min: Math.min(...this.sides().map(side => side.x()['min']))}
  }

  y() {
    return {max: Math.max(...this.sides().map(side => side.y()['max'])),
      min: Math.min(...this.sides().map(side => side.y()['min']))}
  }
}

class Canvas {
  constructor(width, height) {
    this.drawArea = [...Array(height)].map(_ => [...Array(width)].fill('　'))
    this.offsetX = 0
    this.offsetY = 0
  }

  add(line) {
    switch (line.angleToHorizon()) {
      case 0:
        if (line.start.y > 0) {
          this.drawArea = [...this.drawArea, this.newRow(line, '﹍')]
        } else {
          this.drawArea = [this.newRow(line, '﹉'), ...this.drawArea]
          this.offsetY++
        }
        break
      case 45:
        for (let i = line.x()['min'], j = line.y()['min']; i < line.x()['max']; i++, j++) {
          this.drawArea[j + this.offsetY][i + this.offsetX] = '／'
        }
        break
      case 90:
        if (line.start.x > 0) {
          this.drawArea = Canvas.transpose([...Canvas.transpose(this.drawArea), this.newColumn(line, '｜')])
        } else {
          this.drawArea = Canvas.transpose([this.newColumn(line, '｜'), ...Canvas.transpose(this.drawArea)])
          this.offsetX++
        }
        break
      case 135:
        for (let i = line.x()['min'], j = line.y()['max'] - 1; i < line.x()['max']; i++, j--) {
          this.drawArea[j + this.offsetY][i + this.offsetX] = '＼'
        }
        break
    }
  }

  height() {
    return this.drawArea.length
  }

  width() {
    return this.drawArea[0].length
  }

  newRow(line, char) {
    return [...Array(this.width())].map((_, i) => {
      const shiftedI = i - this.offsetX
      return line.x()['min'] <= shiftedI && line.x()['max'] > shiftedI ? char : '　'
    } )
  }

  newColumn(line, char) {
    return [...Array(this.height())].map((_, i) => {
      const shiftedI = i - this.offsetY
      return line.y()['min'] <= shiftedI && line.y()['max'] > shiftedI ? char : '　'
    } )
  }

  static transpose(arr) {
    return arr[0].map((_, colI) => arr.map(row => row[colI]))
  }

  draw() {
    this.drawArea.slice().reverse().forEach(row => console.log(row.join('　')))
  }
}

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static origin() {
    return new Point(0, 0)
  }

  equals(point) {
    return this.x === point.x && this.y === point.y
  }
}

class Line {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.dx = end.x - start.x
    this.dy = end.y - start.y
  }

  length() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  }

  reversed() {
    return new Line(this.end, this.start)
  }

  isParallel(line) {
    return this.dx * line.dy == this.dy * line.dx
  }

  isOppositeParallel(line) {
    return this.isParallel(line) && this.dx * line.dx <= 0 && this.dy * line.dy <= 0
  }

  innerProduct(line) {
    return this.dx * line.dx + this.dy * line.dy
  }

  outerProduct(line) {
    return this.dx * line.dy - this.dy * line.dx
  }

  angle(line) {
    return Math.floor(Math.acos(this.innerProduct(line) / this.length() / line.length()) / Math.PI * 180)
  }

  angleToHorizon() {
    return this.dy > 0 || (this.dy === 0 && this.dx > 0) ?
      this.angle(new Line(this.start, new Point(this.start.x + 1, this.start.y))) :
      this.angle(new Line(this.start, new Point(this.start.x - 1, this.start.y)))
  }

  x() {
    return {min: Math.min(this.start.x, this.end.x), max: Math.max(this.start.x, this.end.x)}
  }

  y() {
    return {min: Math.min(this.start.y, this.end.y), max: Math.max(this.start.y, this.end.y)}
  }
}

const sqLineA = new Line(new Point(0, 0), new Point(5, 0))
const sqLineB = new Line(new Point(5, 0), new Point(5, 5))
const sqLineC = new Line(new Point(5, 5), new Point(0, 5))
const sqLineD = new Line(new Point(0, 5), new Point(0, 0))
const square = new QuadrilateralShape(sqLineA, sqLineB, sqLineC, sqLineD)
square.showInfo()

const rcLineA = new Line(new Point(0, 0), new Point(8, 0))
const rcLineB = new Line(new Point(8, 0), new Point(8, 5))
const rcLineC = new Line(new Point(8, 5), new Point(0, 5))
const rcLineD = new Line(new Point(0, 5), new Point(0, 0))
const rectangle = new QuadrilateralShape(rcLineA, rcLineB, rcLineC, rcLineD)
rectangle.showInfo()

const p1LineA = new Line(new Point(0, 0), new Point(2, 2))
const p1LineB = new Line(new Point(2, 2), new Point(2, 6))
const p1LineC = new Line(new Point(2, 6), new Point(0, 4))
const p1LineD = new Line(new Point(0, 4), new Point(0, 0))
const parallelogram1 = new QuadrilateralShape(p1LineA, p1LineB, p1LineC, p1LineD)
parallelogram1.showInfo()

const p2lineA = new Line(new Point(0, 0), new Point(4, 0))
const p2lineB = new Line(new Point(4, 0), new Point(6, 2))
const p2lineC = new Line(new Point(6, 2), new Point(2, 2))
const p2lineD = new Line(new Point(2, 2), new Point(0, 0))
const parallelogram2 = new QuadrilateralShape(p2lineA, p2lineB, p2lineC, p2lineD)
parallelogram2.showInfo()

const tplineA = new Line(new Point(0, 0), new Point(6, 0))
const tplineB = new Line(new Point(6, 0), new Point(4, 2))
const tplineC = new Line(new Point(4, 2), new Point(2, 2))
const tplineD = new Line(new Point(2, 2), new Point(0, 0))

const trapezoid = new QuadrilateralShape(tplineA, tplineB, tplineC, tplineD)
trapezoid.showInfo()

const tp2lineA = new Line(new Point(0, 0), new Point(2, 2))
const tp2lineB = new Line(new Point(2, 2), new Point(2, 4))
const tp2lineC = new Line(new Point(2, 4), new Point(0, 6))
const tp2lineD = new Line(new Point(0, 6), new Point(0, 0))

const trapezoid2 = new QuadrilateralShape(tp2lineA, tp2lineB, tp2lineC, tp2lineD)
trapezoid2.showInfo()
