function getDni() {
    return document.getElementById("dni").value;
}

function getRegisterDni() {
    return document.getElementById("dniRegister").value;
}

function getPassword() {
    return document.getElementById("password").value;
}

function getPasswordRegister(){
    return document.getElementById("passwordRegister").value
}

function getName(){
    return document.getElementById("name").value
}

function getNameRegister(){
    return document.getElementById("nameRegister").value
}

function getSurname(){
    return document.getElementById("surname").value
}

function getDollarAccount(){
    return document.getElementById("dollarAccount").checked
}



function changeScreen() {
    const homepage = document.getElementById("homepage");
    const login = document.getElementById("login");
    if (homepage.style.display !== "none") {
        homepage.style.display = "none";
        login.style.display = "";
    } else {
        homepage.style.display = "";
        login.style.display = "none";
        completeSelectsUsers()
        completeSelectsCards()
    }
}


function changeScreenRegister() {
    const register = document.getElementById("register");
    const login = document.getElementById("login");
    if (register.style.display !== "none") {
        register.style.display = "none";
        login.style.display = "";
    } else {
        register.style.display = "";
        login.style.display = "none";
    }
}

function changeScreenRegisterLogin() {
    const homepage = document.getElementById("homepage");
    const register = document.getElementById("register");
    if (homepage.style.display !== "none") {
        homepage.style.display = "none";
        register.style.display = "";
    } else {
        homepage.style.display = "";
        register.style.display = "none";
        completeSelectsUsers()
        completeSelectsCards()
    }
}



function depositMoneyDom() {
    let ammount = document.getElementById("ammount").value;
    let currency = document.getElementById("currency").value.toLowerCase();
   
    if (!ammount || !currency) {
        return alert("Por favor ingrese todos los datos.");
    }
   
    ammount = new Number(ammount);
    if (!(ammount instanceof Number) || ammount <= 0) {
        return alert("Por favor ingrese un monto válido.");
    }
   
    let filteredClient = filterClientById(idActiveClient);
    filteredClient.depositMoney(ammount, currency);

    if (currency == DOLLAR_SAVINGS_ACCOUNT){
        document.getElementById("updatedAmmount").innerHTML = "Cantidad de dolares actualizada: " + filteredClient.dolarBalance;
    }
    else {
        document.getElementById("updatedAmmount").innerHTML = "Cantidad de pesos actualizada: " + filteredClient.balance;
    }
}

function takeMoneyDom(){
    let ammount = document.getElementById("ammount").value;
    let currency = document.getElementById("currency").value.toLowerCase();
   
    if (!ammount || !currency) {
        return alert("Por favor ingrese todos los datos.");
    }
   
    ammount = new Number(ammount);
    if (!(ammount instanceof Number) || ammount <= 0) {
        return alert("Por favor ingrese un monto válido.");
    }
   
    let filteredClient = filterClientById(idActiveClient);
    filteredClient.takeMoney(ammount, currency);

    if (currency == DOLLAR_SAVINGS_ACCOUNT){
        document.getElementById("updatedAmmount").innerHTML = "Cantidad de dolares actualizada: " + filteredClient.dolarBalance;
    }
    else {
        document.getElementById("updatedAmmount").innerHTML = "Cantidad de pesos actualizada: " + filteredClient.balance;
    }
}

function sellDollarsDom(){
    let ammount = document.getElementById("ammountDollars").value;
    
    if (!ammount) {
        return alert("Por favor ingrese todos los datos.");
    }
   
    ammount = new Number(ammount);
    if (!(ammount instanceof Number) || ammount <= 0) {
        return alert("Por favor ingrese un monto válido.");
    }
   
    let filteredClient = filterClientById(idActiveClient);
    filteredClient.buyOrSellDollars(ammount, "pesos");

    document.getElementById("updatedAmmountDollar").innerHTML = "Cantidad de dolares actualizada: " + filteredClient.dolarBalance;
}

function buyDollarsDom(){
    let ammount = document.getElementById("ammountDollars").value;
    
    if (!ammount) {
        return alert("Por favor ingrese todos los datos.");
    }
   
    ammount = new Number(ammount);
    if (!(ammount instanceof Number) || ammount <= 0) {
        return alert("Por favor ingrese un monto válido.");
    }
   
    let filteredClient = filterClientById(idActiveClient);
    filteredClient.buyOrSellDollars(ammount, "dollar");

    document.getElementById("updatedAmmountDollar").innerHTML = "Cantidad de dolares actualizada: " + filteredClient.dolarBalance;
}

function getSelectedCurrency() {
    const selectedRadio = document.querySelector('input[name="radioMoneda"]:checked');
    if (selectedRadio) {
        return selectedRadio.value;
    }
    return null; // o puedes lanzar un error si es necesario
}

function newTransferenceDom(){
    let beneficiaryClientId = document.getElementById("selectClienteDestino").value
    let payerClientId = idActiveClient
    let ammount = document.getElementById("montoTransferencia").value
    let selectedCurrency = getSelectedCurrency();
    newTransference(beneficiaryClientId, payerClientId, ammount, selectedCurrency)
}

function addNewConsumptionDom(){
    let cardId = document.getElementById("selectClienteNuevoConsumo").value
    let date = document.getElementById("fechaConsumo").valueAsDate
    let placeName = document.getElementById("nuevoLocal").value
    let ammount = document.getElementById("nuevoConsumo").value
    addNewConsumption(cardId, date, placeName, ammount)
}

function showClientsDom(){
    table = document.getElementsByClassName("table")[0]
    let tableRows = `<thead>
                                <tr>
                                    <th>DNI</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">`;
    for (let i = 0; i < clients.length; i++){
        let client = clients[i]
       
        tableRows += `
        <tr>
            <td>${client.dni}</td>
            <td>${client.name}</td>
            <td>${client.surname}</td>
        </tr>
    `;
    }

    tableRows += `</tbody>`
    table.innerHTML = tableRows;
}

function clientWithMoreBalanceDom(){
    client = filterClientWithMoreBalance()
    clientCards = filterCreditCardByClientId(client.id)
    clientConsumptions = filterConsumptionByCreditCardId(clientCards[0].cardId)

    let text = `<div class="card">
    <div class="card-header">
        Información de una cuenta
    </div>
    <div class="card-body">
        <h5 class="card-title">Cliente solicitado:</h5>
        <p class="card-text"><strong>DNI:</strong> ${client.dni} </p>
        <p class="card-text"><strong>Apellido:</strong> ${client.surname}</p>
        <p class="card-text"><strong>Nombre:</strong> ${client.name}</p>
        <p class="card-text"><strong>Saldo en cuenta en pesos:</strong> ${client.balance}</p>
        <p class="card-text"><strong>Saldo en cuenta en dólares:</strong> ${client.dolarBalance}</p>
        <p class="card-text"><strong>Saldo pendiente de pago en la tarjeta:</strong> ${clientCards[0].balance}</p>
        <h5 class="card-title mt-4">Últimos consumos:</h5>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Local</th>
                    <th scope="col">Consumo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${clientConsumptions[clientConsumptions.length - 1].placeName}</td>
                    <td>${clientConsumptions[clientConsumptions.length - 1].ammount}</td>
                </tr>
                <tr>
                    <td>${clientConsumptions[clientConsumptions.length - 2].placeName}</td>
                    <td>${clientConsumptions[clientConsumptions.length - 2].ammount}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`
    document.getElementById("homepage").innerHTML += text
}

function clientWithLessBalanceDom(){
    client = filterClientWithLessBalance()
    clientCards = filterCreditCardByClientId(client.id)
    clientConsumptions = filterConsumptionByCreditCardId(clientCards[0].cardId)

    let text = `<div class="card">
    <div class="card-header">
        Información de una cuenta
    </div>
    <div class="card-body">
        <h5 class="card-title">Cliente solicitado:</h5>
        <p class="card-text"><strong>DNI:</strong> ${client.dni} </p>
        <p class="card-text"><strong>Apellido:</strong> ${client.surname}</p>
        <p class="card-text"><strong>Nombre:</strong> ${client.name}</p>
        <p class="card-text"><strong>Saldo en cuenta en pesos:</strong> ${client.balance}</p>
        <p class="card-text"><strong>Saldo en cuenta en dólares:</strong> ${client.dolarBalance}</p>
        <p class="card-text"><strong>Saldo pendiente de pago en la tarjeta:</strong> ${clientCards[0].balance}</p>
        <h5 class="card-title mt-4">Últimos consumos:</h5>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Local</th>
                    <th scope="col">Consumo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${clientConsumptions[clientConsumptions.length - 1].placeName}</td>
                    <td>${clientConsumptions[clientConsumptions.length - 1].ammount}</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`
    document.getElementById("homepage").innerHTML += text
}

function drawOptionUser(id, dni, name, surname){
    let text = `<option value="${id}">${dni}-${surname.toUpperCase()}-${name.toUpperCase()}</option>`
    let selects = document.getElementsByClassName("selectsUsers")
    for(let i = 0; i < selects.length; i++){
        selects[i].innerHTML += text
    }
}

function completeSelectsUsers(){
    document.getElementById("selectClienteOrigen").innerHTML = `${filterClientById(idActiveClient).surname}, ${filterClientById(idActiveClient).name}`
    
    for(let i = 0; i < clients.length; i++){
        let client = clients[i]
        if (client.id != idActiveClient){
            drawOptionUser(client.id, client.dni, client.name, client.surname)
        }    
        
    }
}

function drawOptionCards(id, supplier){
    let text = `<option value="${id}">${supplier.toUpperCase()}</option>`
    let selects = document.getElementsByClassName("selectsCards")
    for(let i = 0; i < selects.length; i++){
        selects[i].innerHTML += text
    }
}

function completeSelectsCards(){
    activeClientCards = filterCreditCardByClientId(idActiveClient)
    for(let i = 0; i < activeClientCards.length; i++){
        let card = activeClientCards[i]
        drawOptionCards(card.cardId, card.supplier)
    }
}