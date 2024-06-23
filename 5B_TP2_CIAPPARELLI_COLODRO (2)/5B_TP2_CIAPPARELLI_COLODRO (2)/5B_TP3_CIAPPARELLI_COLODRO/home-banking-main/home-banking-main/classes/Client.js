let clientId = 1

const DOLLAR_SAVINGS_ACCOUNT = "dollar"
const PESOS_SAVINGS_ACCOUNT = "pesos"

const PRECIO_DEL_DOLAR = 1200

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
        console.log(ammount)
        console.log(type)
        if(type != DOLLAR_SAVINGS_ACCOUNT && type !== PESOS_SAVINGS_ACCOUNT){
            return false;
        }
        else if(type == DOLLAR_SAVINGS_ACCOUNT){
            let ammountConverted = ammount * PRECIO_DEL_DOLAR
            let takesmoney = this.takeMoney(ammountConverted, PESOS_SAVINGS_ACCOUNT);
            if(takesmoney){
                this.depositMoney(ammount, DOLLAR_SAVINGS_ACCOUNT)
                return true;
            }
        }      
        else if(type == PESOS_SAVINGS_ACCOUNT){
            let ammountConverted = ammount / PRECIO_DEL_DOLAR
            let takesmoney = this.takeMoney(ammountConverted, DOLLAR_SAVINGS_ACCOUNT);
            if(takesmoney){
                this.depositMoney(ammount, PESOS_SAVINGS_ACCOUNT)
                return true;
            }
            
        }
            return false    
        
    }
}

const clients = [
    new Client('12345678', 'password1', 'John', 'Doe', 1000, true),
    new Client('87654321', 'password2', 'Jane', 'Smith', 1500, false),
    new Client('11111111', 'password3', 'Alice', 'Johnson', 2000, true),
    new Client('22222222', 'password4', 'Bob', 'Williams', 2500, false),
    new Client('33333333', 'password5', 'Michael', 'Brown', 3000, true),
    new Client('44444444', 'password6', 'Emily', 'Davis', 3500, false),
    new Client('55555555', 'password7', 'William', 'Miller', 4000, true),
    new Client('66666666', 'password8', 'Olivia', 'Wilson', 4500, false),
    new Client('77777777', 'password9', 'James', 'Taylor', 5000, true),
    new Client('88888888', 'password10', 'Emma', 'Moore', 5500, false)
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
function HasSufficentBudget(type, ammount){
    if(type == PESOS_SAVINGS_ACCOUNT && ammount > 0){
        if(ammount <= clients[i].balance)
            return true;
    }    
    else if(type == DOLLAR_SAVINGS_ACCOUNT && ammount > 0){
         if(ammount <= clients[i].dolarBalance)
            return true;
    } 
    return false
}

function newTransference(beneficiaryClientId, payerClientId, ammount, type){
    for(let i = 0; clients.length < i; i++){
        if(clients[i].id == payerClientId){
            clients[i].balance -= ammount 
            let result = HasSufficentBudget(type, ammount);
        }            
        else if(clients[i] == beneficiaryClientId){
            clients[i].balance += ammount           
        }
        else{
        return false
        }
    }
}
