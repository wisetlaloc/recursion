class BankAccount {
  constructor(bankName, ownerName, savings, interestPerDay) {
    this.bankName = bankName
    this.ownerName = ownerName
    this.savings = savings
    this.interestPerDay = interestPerDay
  }

  showInfo() {
    return `bank: ${this.bankName}\n` +
      `owner name: ${this.ownerName}\n` +
      `bank account number: ${BankAccount.getRandomInteger()}`
  }

  static getRandomInteger() {
    return Math.floor(Math.random() * Math.pow(10, 8))
  }

  depositMoney(depositAmount) {
    const fee = this.savings <= 20000 ? 100 : 0
    this.savings += depositAmount - fee
  }

  withdrawlMoney(withdrawlAmount) {
    withdrawlAmount = Math.min(withdrawlAmount, this.savings * 0.2)
    this.savings -= withdrawlAmount
    return withdrawlAmount
  }

  pasttime(days) {
    this.savings *= Math.pow((this.interestPerDay + 1), days)
  }
}

const claire = new BankAccount('Chase', 'Claire Simmons', 30000, 0.010001)
console.log(claire.showInfo())
console.log(claire.depositMoney(100))
console.log(claire.withdrawlMoney(100))
console.log(claire.pasttime(8))
const remy = new BankAccount('Bank of America', 'Remy Clay', 10000, 0.010001)
console.log(remy.showInfo())
