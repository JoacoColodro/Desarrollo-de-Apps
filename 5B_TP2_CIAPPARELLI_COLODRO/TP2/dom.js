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
    }
}




