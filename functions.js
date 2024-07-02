let idActiveClient = 0
let loggedUserId = 0

function clientExists(dni, password) {
    let i = 0;
    while (i < clients.length && clients[i].dni !== dni) {
        i++;
    }
    if (i == clients.length) {
        return -1;

    } else if (clients[i].dni === dni && clients[i].password === password) {
        return clients[i].id;

    } else if (clients[i].dni === dni && clients[i].password !== password) {
        return 0;
    }
    return -1;
}

function logIn(dni, password) {
    let clientId = clientExists(dni, password);
    if (clientId >= 1) {
        idActiveClient = clientId;
        changeScreen();
        return true;
    } else if (clientId == 0) {
        alert("La contraseña es incorrecta");
        return false;
    } else { 
        alert("No existe el DNI");
        return false;
    }
}

function validateNewClient(dni, password, name, surname){
    if(dni.length > 8){
        console.log("Falla el DNI")
        return false;
    }
    if(password.length == 0){
        console.log("Falla la password")
        console.log(password)
        return false;
    }
    if (name.length == 0){
        console.log("Falla el nombre")
        return false;
    }    
    if (surname.length == 0){
        console.log("Falla el apellido")
        return false;
    }
    
    return true
    

}

function registerNewClient(dni, password, name, surname, hasDolarSavingsAccount){
    let validatedNewClient = validateNewClient(dni, password, name, surname);
    if(!validatedNewClient){
        return alert("Los datos no son válidos")
    }
    else {
        clients.push(new Client(dni, password, name, surname, hasDolarSavingsAccount))
        idActiveClient = clients[clients.length - 1].id;
        changeScreenRegisterLogin()
    }
}

function logOut(){
    document.getElementById("dni").value = ""
    document.getElementById("password").value = ""
    changeScreen();
    idActiveClient = 0;
}
