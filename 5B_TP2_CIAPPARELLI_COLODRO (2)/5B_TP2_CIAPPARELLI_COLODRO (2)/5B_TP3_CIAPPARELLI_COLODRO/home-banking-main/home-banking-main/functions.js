let idActiveClient = 1

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
    let clientsId = clientExists(dni, password);
    console.log(clientsId)
    if (clientsId >= 1) {
        changeScreen();
        return true;
    } else if (clientsId == 0) {
        alert("La contraseña es incorrecta");
        return false;
    } else { 
        alert("No existe el DNI");
        return false;
    }
}

function validateNewClient(dni, password, name, surname){
    if(!(dni instanceof Number && dni.length > 8)){
        return false;
    }
    else if(password.length == 0){
        return false;
    }
    else if(name.length == 0){
        return false;
    }    
    else if(surname.length == 0){
        return false;
    }

}





function registerNewClient(dni, password, name, surname, hasDolarSavingsAccount){
    let clientExist = clientExists(dni, password);
    if(clientExist == 0){
        return alert("El dni no es válido")
    }
    
    else if (userExist == 1){
        return alert("El dni y la contraseña no son válidos")
    }

    else{
        clients.push(new Client(dni, password, name, surname, hasDolarSavingsAccount))
        changeScreen()
        idActiveClient = clientId
    }
}