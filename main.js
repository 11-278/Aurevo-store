/* ===========================
   AUREVO MAIN JS
=========================== */

/* SPLASH SCREEN */

window.addEventListener("load", function () {
    const splash = document.getElementById("splash");

    if (splash) {
        setTimeout(() => {
            splash.style.opacity = "0";
            splash.style.transition = "0.5s";

            setTimeout(() => {
                splash.style.display = "none";
            }, 500);

        }, 2000);
    }
});

/* ===========================
   CART STORAGE
=========================== */

let cart = JSON.parse(localStorage.getItem("aurevoCart")) || [];

/* SAVE CART */

function saveCart() {
    localStorage.setItem(
        "aurevoCart",
        JSON.stringify(cart)
    );

    updateCartBadge();
}

/* ===========================
   ADD TO CART
=========================== */

function addToCart(name, price, image) {

    const existing = cart.find(
        item => item.name === name
    );

    if (existing) {
        existing.quantity += 1;
    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " added to cart.");
}

/* ===========================
   CART BADGE
=========================== */

function updateCartBadge() {

    const badge = document.getElementById("cart-count");

    if (!badge) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    badge.innerText = total;
}

/* ===========================
   DISPLAY CART
=========================== */

function displayCart() {

    const cartContainer =
        document.getElementById("cart-items");

    const subtotalElement =
        document.getElementById("subtotal");

    const totalElement =
        document.getElementById("total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {

        subtotal += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item mb-4">

            <div class="row align-items-center">

                <div class="col-md-3">
                    <img src="${item.image}"
                    class="img-fluid rounded">
                </div>

                <div class="col-md-3">
                    <h5>${item.name}</h5>
                    <p class="price">$${item.price}</p>
                </div>

                <div class="col-md-3">

                    <button class="btn btn-outline-light"
                    onclick="decreaseQuantity(${index})">
                    -
                    </button>

                    <span class="mx-3">
                    ${item.quantity}
                    </span>

                    <button class="btn btn-outline-light"
                    onclick="increaseQuantity(${index})">
                    +
                    </button>

                </div>

                <div class="col-md-3">

                    <button class="btn btn-danger"
                    onclick="removeItem(${index})">

                    <i class="fa fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

        `;
    });

    const delivery = 20;

    if (subtotalElement) {
        subtotalElement.innerText =
            "$" + subtotal;
    }

    if (totalElement) {
        totalElement.innerText =
            "$" + (subtotal + delivery);
    }
}

/* ===========================
   QUANTITY +
=========================== */

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();
}

/* ===========================
   QUANTITY -
=========================== */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    saveCart();

    displayCart();
}

/* ===========================
   REMOVE ITEM
=========================== */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}

/* ===========================
   LOAD
=========================== */

updateCartBadge();

displayCart();
