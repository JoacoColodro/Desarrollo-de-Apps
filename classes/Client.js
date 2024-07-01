let clientId = 1

const DOLLAR_SAVINGS_ACCOUNT = "dollar"
const PESOS_SAVINGS_ACCOUNT = "pesos"

async function getDollarPrice() {
    try {
        const response = await fetch("https://dolarapi.com/v1/dolares/blue");
        const data = await response.json();
        return data.venta;
    } catch (error) {
        console.error("Error fetching dollar price:", error);
    }
}

// Llama a la función y asigna el valor a una variable
async function setDollarPrice() {
    const DOLLAR_PRICE = await getDollarPrice();
    console.log("Dollar Price:", DOLLAR_PRICE);
    // Aquí puedes usar DOLLAR_PRICE según sea necesario en tu aplicación
}

// Llama a la función para establecer el precio del dólar
const DOLLAR_PRICE = setDollarPrice();

class Client {
    constructor(dni, password, name, surname, hasDolarSavingsAccount){
        this.id = clientId
        clientId++

        this.dni = dni
        this.password = password 
        this.name = name
        this.surname = surname

        this.balance = 0
        this.overdraftFacility = 3000
        this.creditCardNumber = 777777777777 + this.id
        
        let currentDate = new Date() 
        this.creditCardDueDate = new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDay())
        
        if(hasDolarSavingsAccount == true){
            this.dolarBalance = 0
        }
        else {
            this.dolarBalance = -1
        }
        
    }

    sumBalance(){
        if(this.dolarBalance != -1){
            var dollarAmmountConverted = this.dolarBalance * DOLLAR_PRICE
        }
        else {
            var dollarAmmountConverted = 0
        }
    
        return this.balance + dollarAmmountConverted
    }
    
    takeMoney(ammount, type){
        if(type != DOLLAR_SAVINGS_ACCOUNT && type !== PESOS_SAVINGS_ACCOUNT){
            return false;
        }
        if(type == DOLLAR_SAVINGS_ACCOUNT && this.dolarBalance < 0){
            return false;
        }
        if(type == PESOS_SAVINGS_ACCOUNT){
            if((this.balance + this.overdraftFacility) >= ammount){
                this.balance -= ammount
                return true;
            }
            else{
                return false
            }
        }
        if(type == DOLLAR_SAVINGS_ACCOUNT){
            if(this.dolarBalance >= ammount){
                this.dolarBalance -= ammount
                return true;
            }
            else {
                return false;
            }
        }  
    }



    depositMoney(ammount, type){
        if(type == PESOS_SAVINGS_ACCOUNT){
            if(ammount > 0){
                this.balance += ammount
                return true;
            }
            else {
                return false
            }
        } 
            
        if(type == DOLLAR_SAVINGS_ACCOUNT){
            if(ammount > 0){
                this.dolarBalance += ammount
                return true
            }

            else{
                return false
            }
        }
        
        else {
            if(type !== PESOS_SAVINGS_ACCOUNT && type !== DOLLAR_SAVINGS_ACCOUNT){
                return -1
            }
        }
       

    }
    


    buyOrSellDollars(ammount, type){
        if(type != DOLLAR_SAVINGS_ACCOUNT && type !== PESOS_SAVINGS_ACCOUNT){
            return false;
        }
        // Buy Dollars
        else if(type == DOLLAR_SAVINGS_ACCOUNT){
            let ammountConverted = ammount * DOLLAR_PRICE
            let takesmoney = this.takeMoney(ammountConverted, PESOS_SAVINGS_ACCOUNT);
            if(takesmoney){
                this.depositMoney(ammount, DOLLAR_SAVINGS_ACCOUNT)
                return true;
            }
        }
        // Sell Dollars      
        else if(type == PESOS_SAVINGS_ACCOUNT){
            let ammountConverted = ammount * DOLLAR_PRICE
            let takesmoney = this.takeMoney(ammount, DOLLAR_SAVINGS_ACCOUNT);
            if(takesmoney){
                this.depositMoney(ammountConverted, PESOS_SAVINGS_ACCOUNT)
                return true;
            }
            
        }
            return false    
        
    }
}

const clients = [
    new Client('12345678', 'password1', 'John', 'Doe', true),
    new Client('87654321', 'password2', 'Jane', 'Smith', false),
    new Client('11111111', 'password3', 'Alice', 'Johnson', true),
    new Client('22222222', 'password4', 'Bob', 'Williams', false),
    new Client('33333333', 'password5', 'Michael', 'Brown', true),
    new Client('44444444', 'password6', 'Emily', 'Davis', false),
    new Client('1', '1', 'Franco', 'Ciapparelli', true),
    new Client('55555555', 'password7', 'William', 'Miller', true),
    new Client('66666666', 'password8', 'Olivia', 'Wilson', false),
    new Client('77777777', 'password9', 'James', 'Taylor', true),
    new Client('88888888', 'password10', 'Emma', 'Moore', false)
];

console.log("Clientes:", clients);

function filterClientById(clientId){
    let i = 0
    while(clients[i].id != clientId && i < clients.length){
        i++
    }
    if(i >= clients.length)
        return -1
    
    return clients[i]
}

function filterClientWithMoreBalance(){
    let clientWithMoreBalance = 0
    
    for(let i = 0; i < clients.length; i++){
        if (clients[i].sumBalance() > clients[clientWithMoreBalance].sumBalance()){
            clientWithMoreBalance = i
        }
    }
    
    return clients[clientWithMoreBalance]
}

function filterClientWithLessBalance(){
    let clientWithLessBalance = 0
    
    for(let i = 0; i < clients.length; i++){
        if (clients[i].sumBalance() < clients[clientWithLessBalance].sumBalance()){
            clientWithLessBalance = i
        }
    }
    
    return clients[clientWithLessBalance]
}

function hasSufficentBudget(client, type, amount) {
    if (type == PESOS_SAVINGS_ACCOUNT && amount > 0) {
        return amount <= client.balance;
    }    
    else if (type == DOLLAR_SAVINGS_ACCOUNT && amount > 0) {
        return amount <= client.dollarBalance;
    }
    return false;
}

function newTransference(beneficiaryClientId, payerClientId, amount, type) {
    let payer = null;
    let beneficiary = null;
    amount = new Number(amount)

    // Encuentra el pagador y el beneficiario
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id == payerClientId) {
            payer = clients[i];
        } else if (clients[i].id == beneficiaryClientId) {
            beneficiary = clients[i];
        }
    }

    // Verifica si el pagador y el beneficiario fueron encontrados
    if (!payer || !beneficiary) {
        return false;
    }

    // Verifica si el pagador tiene suficiente presupuesto
    if (!hasSufficentBudget(payer, type, amount)) {
        return false;
    }

    // Realiza la transferencia
    if (type == PESOS_SAVINGS_ACCOUNT) {
        payer.balance -= amount;
        beneficiary.balance += amount;
    } else if (type == DOLLAR_SAVINGS_ACCOUNT) {
        payer.dollarBalance -= amount;
        beneficiary.dollarBalance += amount;
    }

    return true;
}

