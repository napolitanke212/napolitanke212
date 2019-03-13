window.onload=function(){

};


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


$.ajax({
    url:"data/products.json",
    method:"GET",
    dataType: "json",
    success: function(data){
      PrintProductsIndexPage(data);
    },
    error: function(err){
        console.log(err)
    }
});
function PrintProductsIndexPage(data){
    let print = "";
        data.forEach(function(e){
            print += `<article>
                        <a href='${e.href}'> 
                            <img src='${e.img.src}'alt='${e.img.alt}' width='280px/>
                        </a>
                        <p>FLAMINGO</p>
                        <a href='${e.href}'>
                            <h2>${e.name} </h2>
                        </a>
                        <span> &euro;50.00</span>
                      </article>`;
        });
        document.getElementById("main-article").innerHTML = print;
}




















