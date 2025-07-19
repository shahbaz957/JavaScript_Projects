document.addEventListener("DOMContentLoaded", () => {
  let products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 39.99 },
    { id: 3, name: "Product 3", price: 49.99 },
  ];
  let cart = []; // this is the empty array that is used to store the products that are being added in the cart by clicking add to cart button

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalDisplay = document.getElementById("cart-total");
  const priceTotalDisplay = document.getElementById("price-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}<span>
    <button data-id = ${product.id} class = "add-to-cart">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    // so we gonna event prevent bubbling up here
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    if (cart.length) {
      emptyCartMessage.classList.add("hidden");
      cartTotalDisplay.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartDiv = document.createElement("div");
        cartDiv.id = item.id;
        cartDiv.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button data-id = "${item.id}" class= "delete-cart">Delete</button>
            `;
        cartItems.appendChild(cartDiv);
        priceTotalDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalDisplay.classList.add("hidden");
      priceTotalDisplay.textContent = `0.00`;
    }
  }


  // ********************************* Deleting an item from CART *******************************


  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const targetDiv = document.getElementById(productId);
      const index = cart.findIndex(item => item.id === productId)
    //   console.log(targetDiv);
     targetDiv.remove();
      
    if (index != -1){
        cart.splice(index , 1)
        renderCart();
    }



    }
  });









  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout is completed");
    renderCart();
  });
});



