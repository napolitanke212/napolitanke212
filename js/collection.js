
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
// ISPISIVANJE COLLECTION PHOTOSHUST

var ispis2 = "";
var nizCollection = ["images/photoshoot1.jpg", "images/photoshoot2.jpg", "images/photoshoot3.jpg", "images/photoshoot4.jpg", "images/photoshoot5.jpg", "images/photoshoot6.jpg", "images/photoshoot7.jpg", "images/photoshoot8.jpg", "images/photoshoot9.jpg", "images/photoshoot10.jpg", "images/photoshoot11.jpg", "images/photoshoot12.jpg", "images/photoshoot13.jpg", "images/photoshoot14.jpg"]
for (var i = 1; i < nizCollection.length; i++) {
    ispis2 += "<img src='" + nizCollection[i] + "' alt='photoshoot'/>";
}
document.getElementById("images").innerHTML = ispis2;

