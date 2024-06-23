let consumptionId = 1

class Consumption {
    constructor(cardId, date, placeName, ammount){
        this.consumptionId = consumptionId
        consumptionId++
        this.cardId = cardId
        this.date = date
        this.placeName = placeName
        this.ammount = ammount
    }
}

const consumptions = [
    new Consumption(1, new Date(2015, 3, 25), 'Restaurant A', 50),
    new Consumption(2, new Date(2016, 7, 10), 'Supermarket B', 100),
    new Consumption(3, new Date(2017, 10, 5), 'Cinema C', 30),
    new Consumption(4, new Date(2018, 2, 15), 'Gas Station D', 70),
    new Consumption(5, new Date(2019, 5, 20), 'Coffee Shop E', 20),
    new Consumption(6, new Date(2020, 9, 12), 'Clothing Store F', 200),
    new Consumption(7, new Date(2021, 11, 8), 'Electronics Store G', 500),
    new Consumption(8, new Date(2022, 1, 30), 'Bookstore H', 80),
    new Consumption(9, new Date(2023, 4, 18), 'Gym I', 120),
    new Consumption(10, new Date(2024, 6, 3), 'Travel Agency J', 1000)
]

console.log("Consumicion:", consumptions);


function filterConsumptionById(consumptionId){
    let i = 0
    while(consumptions[i].id != consumptionId && i < consumptions.length)
        i++;
    if(i >= consumptions.length )
        return -1
    
    return consumptions[i]
}
function filterConsumptionByCreditCardId(cardId){
    let filteredConsumptions = []
    for(let i in consumptions){
        if(consumptions[i].cardId == cardId){
            filteredConsumptions.push(consumptions[i])
        }
    }
    return filteredConsumptions
}

function addNewConsumption(cardId, placeName, ammount, date){
    if(!(date instanceof Date)){
        console.log("La fecha no es válida")
        return;
    }
    if(this.currentDate > creditCards.dueDate){
        console.log("La tarjeta de crédito está vencida")
        return;
    }
    consumptions.push(new Consumption(cardId, placeName, ammount, date))
    creditCards[filterCreditCardById(cardId)].balance += ammount;
    return true
    
}