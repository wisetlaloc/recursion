class Invoice {
  constructor(invoiceNumber, invoiceDate, company, companyAddress,
      billToName, billToAddress, invoiceItemNode) {
    this.billToAddress = billToAddress
    this.billToName = billToName
    this.company = company
    this.companyAddress = companyAddress
    this.invoiceDate = invoiceDate
    this.invoiceItemNode = invoiceItemNode
    this.invoiceNumber = invoiceNumber
  }

  amountDue(taxes) {
    let beforeTaxes = 0
    let currentNode = this.invoiceItemNode
    while (currentNode !== null) {
      beforeTaxes += currentNode.getTotalPrice()
      currentNode = currentNode.next
    }
    return taxes ? 1.1 * beforeTaxes : beforeTaxes
  }

  printBuyingItems() {
    console.log('Printing the Item List...')
    let currentNode = this.invoiceItemNode
    while (currentNode !== null) {
      currentNode.printBuyingItem()
      currentNode = currentNode.next
    }
  }

  printInvoice() {
    const items = []
    let currentNode = this.invoiceItemNode
    while (currentNode !== null) {
      items.push(currentNode.printItem())
      currentNode = currentNode.next
    }
    const lines = [
      'Invoice',
      `No. : ${this.invoiceNumber}`,
      `INVOICE DATE : ${this.invoiceDate}`,
      `SHIP TO : ${this.company}`,
      `ADDRESS : ${this.companyAddress}`,
      `BILL TO : ${this.billToName}`,
      `ADDRESS : ${this.billToAddress}`,
      ...items,
      `SUBTOTAL : ${this.amountDue(false)}`,
      `TAX : ${this.amountDue(false) * 0.1}`,
      `TOTAL : ${this.amountDue(true)}`,
    ]
    for (const line of lines) {
      console.log(line)
    }
  }
}

class InvoiceItemNode {
  constructor(quantity, product, next) {
    this.quantity = quantity
    this.product = product
    this.next = next
  }

  getTotalPrice() {
    return this.product.price * this.quantity
  }

  printBuyingItem() {
    const text = `item: ${this.product.title}, price: ${this.product.price},` +
      ` quantity: ${this.quantity}`
    console.log(text)
  }

  printItem() {
    return `${this.product.title}($${this.product.price})--- ` +
      `${this.quantity} pcs. --- AMOUNT: ${this.getTotalPrice()}`
  }
}

class Product {
  constructor(title, price) {
    this.title = title
    this.price = price
  }
}

const shampoo = new Product('shampoo', 10)
const conditioner = new Product('conditioner', 5)
const toothBrush = new Product('tooth brush', 3)

const itemT = new InvoiceItemNode(10, toothBrush, null)
const itemC = new InvoiceItemNode(9, conditioner, itemT)
const itemS = new InvoiceItemNode(7, shampoo, itemC)

const invoice = new Invoice('UC1234567890', '2020/05/06', 'Recursion',
    'Los Angles', 'Steven', 'Dallas', itemS)

invoice.printBuyingItems()
invoice.printInvoice()
