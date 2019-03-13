window.onload = function () {

    document.getElementById("submitLogin").addEventListener("click", proveraLogin);
    document.getElementById("submitSignUp").addEventListener("click", proveraSingUp);
}

function proveraLogin() {

    var userName, reUserName, password, rePassword, arrayFalse, arrayTrue;

    userName = document.getElementById("tbUserName");
    password = document.getElementById("tbPassword");

    reUserName = /^  [A-z0-9]+ $/;
    rePassword = /^ [A-z0-9]+ $/;

    arrayFalse = [];
    arrayTrue = [];

    if (!reUserName.test(userName.value) && userName.valur == "") {
        arrayFalse.push(userName.value);
    }
    else {
        arrayTrue.push(userName.value);
    }

    if (!rePassword.test(password.value) && password.valur == "") {
        arrayFalse.push(password.value);
    }
    else {
        arrayTrue.push(password.value);
    }
}

function proveraSingUp() {

    var email, reEmail, password, rePassword, repeatPassword, arrayFalse, arrayTrue; ;

    email = document.getElementById("tbEmailSu");
    password = document.getElementById("tbPasswordSu");
    repeatPassword = document.getElementById("tbPasswordR");

    reEmail = /^[A-z]+\d*\@(gmail|hotmail|yahoo)\.(com)$/;
    rePassword = /^ [A-z0-9]+ $/;

    arrayFalse = [];
    arrayTrue = [];


    if (!reEmail.test(email.value)){
        arrayFalse.push(email.value);
    }
    else {
        arrayTrue.push(email.value);
    }

    if (!rePassword.test(password.value) && password.valur == "") {
        arrayFalse.push(password.value);
    }
    else {
        arrayTrue.push(password.value);
    }

    if (password.value != repeatPassword.value) {
        arrayFalse.push(repeatPassword.value);
        repeatPassword.style.borderColor = "red";
    }
    else {
        arrayTrue.push(repeatPassword.value);
        repeatPassword.style.borderColor = "initial";
    }
}

// MENU
$.ajax({
    url:"data/menu.json",
    method:"GET",
    dataType: "json",
    success: function(data){
      PrintMenu(data);
    },
    error: function(err){
        console.log(err)
    }
});

function PrintMenu(data){
    let print = "<ul>";
    data.forEach(function(e){
        print += `
        
        <li>
        <a href="#"> ${e.name} </a>
        <ul>
            <li><a href="${e.href.jeans}"> ${e.nameHref.jeans} </a></li>
            <li><a href="${e.href.shorts}"> ${e.nameHref.shorts} </a></li>
            <li><a href="${e.href.shouse}"> ${e.nameHref.shouse} </a></li>
            <li><a href="${e.href.tShirts}"> ${e.nameHref.tShirts} </a></li>
        </ul>
    </li>
    <li>
   

        `;
    });
    print += `</ul>`;
    document.getElementById("printMenu").innerHTML = print;
}
