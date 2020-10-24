// string型 name: 惑星の名前
// double型 massKg: 惑星の質量(kg)
// double型 meanRadiusKm: 惑星の半径(km)
// double型 distanceToStarLs: 惑星系システム内で、惑星から恒星まで光が届くのにかかる時間(s)。
// 太陽系の惑星が太陽(恒星)の周りを回っているように、惑星系とは恒星の重力により結合され、複数の天体が公転している構造のことを指します。
// double型 constantOfGravitation: 万有引力定数。6.67438 * 10−11
// double型 speedOfLight: 光速(m/s)。2.99792458 * 10 ^ 8
// double型 massOfSun: 太陽の質量(kg)。1.989 * 10 ^ 30
// double型 radiusOfSun: 太陽の半径(km)。6.96 * 10 ^ 5
// int型 oneYear: 1年(sec)。1年間は31556926秒。
// 挙動
// getVolume() -> double型: 惑星の体積を返します。球体の体積を求める公式を使ってください。
// getSurfaceArea() -> double型: 惑星の表面積を返します。
// compareToPlanet(planet) -> double型: 入力から渡される惑星と比較して、惑星の体積の差を表すスカラ値を返します。
// getSurfaceGravity() -> double型: 惑星の重力を返します。（Hint:惑星の質量×万有引力定数/惑星の半径の二乗を使って求めてください。）
// getDistanceToStarKm() -> double型: 公転半径(km)を返します。公転距離とは惑星から恒星までの距離のことを指します。
// getOrbitalSpeed() -> double型: 公転速度(m/s)を返します。太陽の質量は各惑星の質量に比べて非常に大きいので、
// 惑星は太陽の周りを円運動していると仮定してください。また、遠心力と引力が等しいとして計算してください。
// getOrbitalPeriodYear() -> double型: 公転周期(year)を返します。

class Planet {
  constantOfGravitation = 6.67438 * Math.pow(10, -11)
  speedOfLight = 2.99792458 * Math.pow(10, 8)
  massOfSun = 1.989 * Math.pow(10, 30)
  radiusOfSun = 6.96 * Math.pow(10, 5)
  oneYear = 31556926

  constructor(name, massKg, meanRadiusKm, distanceToStarLs) {
    this.name = name
    this.massKg = massKg
    this.meanRadiusKm = meanRadiusKm
    this.distanceToStarLs = distanceToStarLs
  }

  getVolume() {
    return 4 / 3 * Math.PI * Math.pow(this.meanRadiusKm, 3)
  }

  getSurfaceArea() {
    return 4 * Math.PI * Math.pow(this.meanRadiusKm, 2)
  }

  compareToPlanet(planet) {
    return this.getSurfaceArea() / planet.getSurfaceArea()
  }

  getSurfaceGravity() {
    return this.constantOfGravitation * this.massKg * Math.pow(this.meanRadiusKm / 1000, -2)
  }

  getDistanceToStarKm() {
    return this.distanceToStarLs / this.speedOfLight / 1000
  }

  getOrbitalSpeed() {
    return Math.sqrt(this.constantOfGravitation * this.massOfSun / (this.getDistanceToStarKm() * 1000))
  }

  getOrbitalPeriodYear() {
    return 2 * Math.PI * this.getDistanceToStarKm() * 1000 / this.getOrbitalSpeed() / this.oneYear
  }
}

const earth = new Planet('Earth', 5.974e24, 6.3782e3, 4.990e2)
console.log(earth.getVolume())
console.log(earth.getSurfaceArea())
console.log(earth.getSurfaceGravity())
console.log(earth.getDistanceToStarKm())
console.log(earth.getOrbitalSpeed())
console.log(earth.getOrbitalPeriodYear())

const saturn = new Planet('Saturn', 5.6880e26, 6.0268e4, 4.760e3)
console.log(saturn.getVolume())
console.log(saturn.getSurfaceArea())
console.log(saturn.compareToPlanet(earth))
console.log(saturn.getSurfaceGravity())
console.log(saturn.getDistanceToStarKm())
console.log(saturn.getOrbitalSpeed())
console.log(saturn.getOrbitalPeriodYear())
// Earth
// 5.974e24
// 6.3782e3
// 4.990e2

// Saturn
// 5.6880e26
// 6.0268e4
// 4.760e3
