let cardId = 1

const PAYMENT_INTEREST = 80

class CreditCard {
    constructor(clientId, supplier, paymentInterest){
        this.cardId = cardId
        cardId++

        this.clientId = clientId
        this.type = "credit"
        this.supplier = supplier

        let currentDate = new Date() 
        this.dueDate = new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDay())

        this.balance = 0
        this.paymentInterest = paymentInterest
    }
}   

const creditCards = [
    new CreditCard(clients[0].id, 'Visa', 0.8),
    new CreditCard(clients[1].id, 'Mastercard', 0.9),
    new CreditCard(clients[2].id, 'American Express', 0.9),
    new CreditCard(clients[3].id, 'Visa', 0.2),
    new CreditCard(clients[4].id, 'Mastercard', 0.5),
    new CreditCard(clients[5].id, 'American Express', 0.9),
    new CreditCard(clients[6].id, 'Visa', 0.2),
    new CreditCard(clients[7].id, 'Mastercard', 0.5),
    new CreditCard(clients[8].id, 'American Express', 0.9),
    new CreditCard(clients[9].id, 'Visa', 0.9)
];

console.log(creditCards)

function filterCreditCardById(cardId){
    let i = 0
    while(creditCards[i].id != cardId && i < creditCards.length){
        i++
    }
    if(i >= creditCards.length)
        return -1
    
    return creditCards[i]
}

function filterCreditCardByClientId(clientId){
    let creditcardv = []
    for(let i in creditCards){
        if(creditCards[i].clientId == clientId){
            creditcardv.push(creditCards[i])
        }
    }
    return creditcardv
}
