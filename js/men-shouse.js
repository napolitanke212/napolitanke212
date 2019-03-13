window.onload=function(){
    PrintStyle();
    getProducts();

    document.getElementById("range1").addEventListener("click",priceRande1);
    document.getElementById("range2").addEventListener("click",priceRande2);
    document.getElementById("range3").addEventListener("click",priceRande3);

   
   
       document.getElementById("sortHL").addEventListener("click",sortHtoL);
       document.getElementById("sortLH").addEventListener("click",sortLtoH);
   
       document.getElementById("search-text").addEventListener("keydown",searchMenJeans);
   
      
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
   
   // FILTER STYLE
   
   function PrintStyle(){
       $.ajax({
           url:"data/style.json",
           method:"GET",
           dataType:"json",
           success: function(style){
               let print="<select id='styleProducts'><option value='0'> Choose... </option>";
               for(s of style){
                   print += `<option value="${s.id}">${s.style}</option>`;
               }
               print += "<select>";
               document.getElementById("printStyle").innerHTML = print;
               document.getElementById("styleProducts").addEventListener("change",function(){
                   Number(this.value) ? filterStyle(this.value) : getProducts();
               });
           }
       });
   }
   
   function filterStyle(styleId){
       $.ajax({
           url:"data/menShouse.json",
           method: "GET",
           dataType: "json",
           success: function(data){
               data= data.filter(s=> s.style.id == styleId);
               printMenShouse(data);
           },
           error: function(err){
               console.log(err);
           }
       })
   }
   
   
   
   //PRODUCTS PRINT
   function getProducts(){
       $.ajax({
           url:"data/menShouse.json",
           method:"GET",
           dataType: "json",
           success: function(data){
           printMenShouse(data);
           },
           error: function(err){
               console.log(err)
           }
       });
   }
   
   function printMenShouse(data){
       let print = "";
       data.forEach(function(e){
           print += `
   
           <article>
               <a href='#'>
                   <img src="${e.img.src}" alt="${e.img.alt}" width='280px'/>
               </a> 
               <p> FLAMINGO </p> 
               <a href='#'>
                   <h2> ${e.name}</h2>
               </a>
               <span><h4> &euro;${e.price}</h4></span>
               <div id="buttom"><button data-id=${e.id} class="add-to-cart" > Add to cart </button></div>
           </article>`;
       });
   
       document.getElementById("shouseMen").innerHTML= print;

       bindCartEvents();
   }
   
   // SORT
   
   function sortHtoL(){
       $.ajax({
           url:"data/menShouse.json",
           method:"GET",
           dataType:"json",
           success: function(data){
               data.sort(function(a,b){
                   if(a.price == b.price)
                       return 0;
                   return a.price > b.price? -1 : 1;
               });
               printMenShouse(data);
           },
           error: function(err){
               console.log(err);
           }
       });
   }
   
   function sortLtoH(){
       $.ajax({
           url:"data/menShouse.json",
           method:"GET",
           dataType:"json",
           success: function(data){
               data.sort(function(a,b){
                   if(a.price == b.price)
                       return 0;
                   return a.price > b.price? 1 : -1;
               });
               printMenShouse(data);
           },
           error: function(err){
               console.log(err);
           }
       });
   } 
   
   //SEARCH ////////////////////////////// Ne RaDi
   
   function searchMenJeans(){
       const userInsert = this.value;
       $.ajax({
           url:"data/menShouse.json",
           method:"GET",
           dataType:"json",
           success: function(data){
               const filterProducts = data.filter( e=> {
                   if(e.name.toLowerCase().indexOf(userInsert.toLowerCase())!== -1){
                       return true;
                   }
               });
               printMenShouse(filterProducts);
           },
           error: function(err){
               console.log(err);
           }
       });
   }
   

   // ADD TO CART





function bindCartEvents() {
    $(".add-to-cart").click(addToCart);
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("menJeans"));
}

function addToCart() {
    let id = $(this).data("id");

    var products = productsInCart();

    if(products) {
        if(productIsAlreadyInCart()) {
            updateQuantity();
        } else {
            addToLocalStorage()
        }
    } else {
        addFirstItemToLocalStorage();
    }

    // alert("Cart successfully updated!");

    /* Male funkcije koje odradjuju po jednu funkcionalnost radi lakse odrzivosti koda */
    function productIsAlreadyInCart() {
        return products.filter(p => p.id == id).length;
    }

    function addToLocalStorage() {
        let products = productsInCart();
        products.push({
            id : id,
            quantity : 1
        });
        localStorage.setItem("menJeans", JSON.stringify(products));
    }

    function updateQuantity() {
        let products = productsInCart();
        for(let i in products)
        {
            if(products[i].id == id) {
                products[i].quantity++;
                break;
            }      
        }

        localStorage.setItem("menJeans", JSON.stringify(products));
    }

    

    function addFirstItemToLocalStorage() {
        let products = [];
        products[0] = {
            id : id,
            quantity : 1
        };
        localStorage.setItem("menJeans", JSON.stringify(products));
    }
}



function clearCart() {
    localStorage.removeItem("menJeans");
}

/* filter by price range */


function priceRande1(){
    $.ajax({
        url:"data/menShouse.json",
        method:"GET",
        dataType:"json",
        success: function(data){
          const filterPrice = data.filter( e=> {
                if(e.price <= 50){
                    return true;
                }
            });
            printMenShouse(filterPrice);
        },
        error: function(err){
            console.log(err);
        }
    });
} 

function priceRande2(){
    $.ajax({
        url:"data/menShouse.json",
        method:"GET",
        dataType:"json",
        success: function(data){
          const filterPrice = data.filter( e=> {
                if(e.price > 50 && e.price <= 100){
                    return true;
                }
            });
            printMenShouse(filterPrice);
        },
        error: function(err){
            console.log(err);
        }
    });
} 
function priceRande3(){
    $.ajax({
        url:"data/menShouse.json",
        method:"GET",
        dataType:"json",
        success: function(data){
          const filterPrice = data.filter( e=> {
                if(e.price > 100){
                    return true;
                }
            });
            printMenShouse(filterPrice);
        },
        error: function(err){
            console.log(err);
        }
    });
} 