$(document).ready(function () {
    let products = productsInCart();
    
    if(!products.length)
        showEmptyCart();
    else
        displayCartData();

});

function displayCartData() {
    let products = productsInCart();

    $.ajax({
        url : "data/menShorts.json",
        success : function(data) {
            let productsForDisplay = [];

            //izdvajanje objekata dohvacenih ajaxom tako da tu budu samo objekti koji su u localstorage i dodavanje kolicine
            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }
                        
                }
                return false;
            });
            generateTable(data)
        }
    });
}

function generateTable(products) {
    let html = `
            <table class="timetable_sub">
				<thead>
					<tr>
						<th>SL No.</th>
						<th>Product</th>
						<th>Product Name</th>
                        <th>Base Price</th>
                        <th>Quantity</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>`;
                
    for(let p of products) {
        html += generateTr(p);
    }

    html +=`    </tbody>
            </table>`;

    $("#content-cart").html(html);

    function generateTr(p) {
       return  `<tr class="rem1">
        <td class="invert">${p.id}</td>
        <td class="invert-image">
            <a href="single.html">
                <img src="${p.img.src}" style='height:100px' alt="${p.img.alt}" class="img-responsive">
            </a>
        </td>
        <td class="invert">${p.name}</td>
        <td class="invert">$${p.price}</td>
        <td class="invert">${p.quantity}</td>
        <td class="invert">$${p.price * p.quantity}</td>
        <td class="invert">
            <div class="rem">
                <div class=""><button onclick='removeFromCart(${p.id})'>Remove</button> </div>
            </div>
        </td>
    </tr>`
    }
}

function showEmptyCart() {
    $("#content-cart").html("<h1>Your cart is empty!</h1>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("menJeans"));
}



function removeFromCart(id) {
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("menJeans", JSON.stringify(filtered));

    displayCartData();
}