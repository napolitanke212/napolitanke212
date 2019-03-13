window.onload = function () {
    
    document.getElementById("submit").addEventListener("click", provera);
}
function provera() {

    var category, categoryValue, firstName, reFirstName, lastName, reLastName, eMail, reEmail, orderNumber, specialRemarks, arrayFalse, arrayTrue;

    category = document.getElementById("ddCategory");
    categoryValue = category.options[category.selectedIndex].value;
   

    firstName = document.getElementById("tbfirstName");
    lastName = document.getElementById("tblastName");
    eMail = document.getElementById("tbEmail");
    orderNumber = document.getElementById("tbOrderNumber");
    specialRemarks = document.getElementById("tbSpecialRemarks");

    reFirstName = /^[A-Z]{1}[a-z]+$/;
    reLastName = /^[A-Z]{1}[a-z]+$/;
    reEmail = /^[A-z]+\d*\@(gmail|hotmail|yahoo)\.(com)$/;

    arrayFalse = [];
    arrayTrue = [];

    if (categoryValue == "0") {
        arrayFalse.push(categoryValue);
        document.getElementById("star").style.color = "red";
    }
    else {
        arrayTrue.push(categoryValue);
        document.getElementById("star").style.color = "initial";
    }

    if (!reFirstName.test(firstName.value)) {
        arrayFalse.push(lastName.value);
        firstName.style.borderColor = "red";
    }
    else {
        arrayTrue.push(firstName.value);
        firstName.style.borderColor = "initial";
    }

    if (!reLastName.test(lastName.value)) {
        arrayFalse.push(lastName.value);
        lastName.style.borderColor = "red";
    }
    else {
        arrayTrue.push(lastName.value);
        lastName.style.borderColor = "initial";
    }

    if (!reEmail.test(eMail.value)) {
        arrayFalse.push(eMail.value);
        eMail.style.borderColor = "red";
    }
    else {
        arrayTrue.push(eMail.value);
        eMail.style.borderColor = "initial";
    }

    if (orderNumber.value.length < 5) {
        arrayFalse.push(orderNumber.value);
        orderNumber.style.borderColor = "red";
    }
    else {
        arrayTrue.push(orderNumber.value);
        orderNumber.style.borderColor = "initial";
    }
    if (specialRemarks.value == "") {
        arrayFalse.push(specialRemarks.value);
    }
    else {
        arrayTrue.push(specialRemarks.value);
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