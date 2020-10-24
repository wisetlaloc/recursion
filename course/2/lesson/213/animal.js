class Animal {
  activityMultiplier = 1.2;

  constructor(name, species, description, weightKg, heightM, isPredator, speedKph, urlPic, registerDate) {
    this.name = name
    this.species = species
    this.description = description
    this.weightKg = weightKg
    this.heightM = heightM
    this.isPredator = isPredator
    this.speedKph = speedKph
    this.urlPic = urlPic
    this.registerDate = registerDate
  }

  getStateString() {
    return 'name: ' + this.name +
      '\nspecies: ' + this.species +
      '\ndescription: ' + this.description +
      '\nweightKg: ' + String.valueOf(this.weightKg) + 'kg' +
      '\nheightM: ' + String.valueOf(this.heightM) + 'm' +
      '\n' + this.displayPredator() +
      '\nspeedKph: ' + String.valueOf(this.speedKph) + 'kph' +
      '\nurlPic: ' + this.urlPic +
      '\nregisterDate: ' + this.registerDate
  }

  getBmi() {
    return this.weightKg / Math.pow(this.heightM, 2)
  }

  getDailyCalories() {
    return 70 * Math.pow(this.weightKg, 0.75) * this.activityMultiplier
  }

  isDangerous() {
    return this.isPredator || this.heightM >= 1.7 || this.speedKph >= 35
  }

  isFaster(animal) {
    return this.speedKph > animal.speedKph
  }

  displayPredator() {
    return this.isPredator ? 'Predator' : 'Not Predator'
  }
}

rabbit = new Animal('rabbit', 'leporidae',
    'Rabbits are small mammals in the family Leporidae of the order Lagomorpha (along with the hare and the pika).',
    10, 0.3, false, 20, 'img1', '2020/5/25')
elephant = new Animal('elephant', 'Elephantidae',
    'Elephants are mammals of the family Elephantidae and the largest existing land animals.',
    300, 3, false, 5, 'img2', '2020/5/26')
console.log(rabbit.getStateString())
console.log(rabbit.getBmi()) // 111.11111111111111
console.log(rabbit.getDailyCalories()) // -> 472.36671315989327
console.log(rabbit.isDangerous()) // -> false

console.log(elephant.getStateString())
console.log(elephant.getBmi()) // 33.333333333333336
console.log(elephant.getDailyCalories()) // -> 6055.08476361958
console.log(elephant.isDangerous()) // -> true

console.log(elephant.isFaster(rabbit)) // -> false

// rabbit
// leporidae
// Rabbits are small mammals in the family Leporidae of the order Lagomorpha (along with the hare and the pika).
// 10
// 0.3
// false
// 20
// img1
// 2020/5/25

// elephant
// Elephantidae
// Elephants are mammals of the family Elephantidae and the largest existing land animals.
// 300
// 3
// false
// 5
// img2
// 2020/5/26
