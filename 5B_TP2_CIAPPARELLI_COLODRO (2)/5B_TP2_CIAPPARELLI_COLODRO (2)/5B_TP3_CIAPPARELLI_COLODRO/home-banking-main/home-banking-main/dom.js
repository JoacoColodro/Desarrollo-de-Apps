function getDni() {
    return document.getElementById("dni").value;
}

function getPassword() {
    return document.getElementById("password").value;
}

function getName() {
    return document.getElementById("name").value;
}

function getSurname() {
    return document.getElementById("surname").value;
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