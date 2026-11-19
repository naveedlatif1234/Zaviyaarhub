/* ==========================================
   ZaviyaarHub E-COMMERCE
   ========================================== */


/* PRODUCTS */

const products = [

  {
    id: 1,
    name: "Premium Face Serum",
    category: "Cosmetics",
    price: 1499,
    icon: "✨"
  },

  {
    id: 2,
    name: "Lipstick Collection",
    category: "Cosmetics",
    price: 999,
    icon: "💄"
  },

  {
    id: 3,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 2499,
    icon: "🎧"
  },

  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 3499,
    icon: "⌚"
  },

  {
    id: 5,
    name: "Fast Charging Cable",
    category: "Electronics",
    price: 799,
    icon: "🔌"
  },

  {
    id: 6,
    name: "LED Desk Lamp",
    category: "Household",
    price: 1299,
    icon: "💡"
  },

  {
    id: 7,
    name: "Kitchen Organizer",
    category: "Household",
    price: 899,
    icon: "🏠"
  },

{
  id: 8,
  name: "Storage Box Set",
  category: "Household",
  price: 1199,
  icon: "📦"
},
{
  id: 9,
  name: "Baby Feeding Bottle",
  category: "Baby Care",
  price: 650,
  icon: "🍼"
},
{
  id: 10,
  name: "Baby Soft Toys",
  category: "Baby Care",
  price: 850,
  icon: "🧸"
},
{
  id: 11,
  name: "Baby Care Gift Set",
  category: "Baby Care",
  price: 1499,
  icon: "👶"
},
{
  id: 12,
  name: "Baby Bib Set",
  category: "Baby Care",
  price: 499,
  icon: "🧷"
},

{
  id: 13,
  name: "Kitchen Storage Containers",
  category: "Kitchen & Home",
  price: 899,
  icon: "🥡"
},
{
  id: 14,
  name: "Stainless Steel Water Bottle",
  category: "Kitchen & Home",
  price: 699,
  icon: "🥤"
},
{
  id: 15,
  name: "Non-Stick Kitchen Utensils Set",
  category: "Kitchen & Home",
  price: 1299,
  icon: "🍳"
},
{
  id: 16,
  name: "Multipurpose Cleaning Brush",
  category: "Kitchen & Home",
  price: 399,
  icon: "🧹"
}

];



/* CART */

let cart = [];


/* LOAD PRODUCTS */

function displayProducts(productList) {

  const grid = document.getElementById("productsGrid");

  grid.innerHTML = "";

  if (productList.length === 0) {

    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px">
        <h3>No products found</h3>
        <p>Try another search.</p>
      </div>
    `;

    return;
  }


  productList.forEach(product => {

    grid.innerHTML += `

      <div class="product-card">

        <div class="product-image">
          ${product.icon}
        </div>

        <div class="product-info">

          <div class="product-category">
            ${product.category}
          </div>

          <h3>
            ${product.name}
          </h3>

          <div class="product-price">
            Rs. ${product.price.toLocaleString()}
          </div>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})">
            Add to Cart
          </button>

        </div>

      </div>

    `;

  });

}


/* SHOW ALL */

function showAllProducts() {

  document.getElementById("searchInput").value = "";

  displayProducts(products);

  updateFilterButtons("All");
}


/* FILTER */

function filterProducts(category) {

  const filtered = products.filter(
    product => product.category === category
  );

  document.getElementById("searchInput").value = "";

  displayProducts(filtered);

  updateFilterButtons(category);

  document.getElementById("products")
    .scrollIntoView({ behavior: "smooth" });
}


/* SEARCH */

function searchProducts() {

  const search = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();


  const filtered = products.filter(product =>

    product.name.toLowerCase().includes(search) ||

    product.category.toLowerCase().includes(search)

  );


  displayProducts(filtered);

  updateFilterButtons("");
}


/* FILTER BUTTON ACTIVE STATE */

function updateFilterButtons(category) {

  document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

      button.classList.remove("active");

      if (
        category &&
        button.textContent.trim() === category
      ) {
        button.classList.add("active");
      }

      if (
        category === "All" &&
        button.textContent.trim() === "All"
      ) {
        button.classList.add("active");
      }

    });

}


/* ADD TO CART */

function addToCart(productId) {

  const product = products.find(
    p => p.id === productId
  );

  if (!product) return;


  const existing = cart.find(
    item => item.id === productId
  );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();

  openCart();

}


/* UPDATE CART */

function updateCart() {

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  document.getElementById("cartCount")
    .textContent = count;


  const cartItems =
    document.getElementById("cartItems");


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div style="text-align:center;padding:30px">
        <div style="font-size:45px">🛒</div>
        <p>Your cart is empty.</p>
      </div>
    `;

    document.getElementById("cartTotal")
      .textContent = "Rs. 0";

    return;
  }


  cartItems.innerHTML = "";


  let total = 0;


  cart.forEach(item => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;


    cartItems.innerHTML += `

      <div class="cart-item">

        <div class="cart-item-icon">
          ${item.icon}
        </div>

        <div class="cart-item-info">

          <h4>${item.name}</h4>

          <p>
            Rs. ${item.price.toLocaleString()}
            × ${item.quantity}
          </p>

        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${item.id})">
          Remove
        </button>

      </div>

    `;

  });


  document.getElementById("cartTotal")
    .textContent =
    "Rs. " + total.toLocaleString();

}


/* REMOVE */

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  updateCart();

}


/* OPEN CART */

function openCart() {

  document
    .getElementById("cartOverlay")
    .classList.add("show");

}


/* CLOSE CART */

function closeCart(event) {

  if (
    event &&
    event.target !==
    document.getElementById("cartOverlay")
  ) {
    return;
  }

  document
    .getElementById("cartOverlay")
    .classList.remove("show");

}



/* WHATSAPP CHECKOUT */

function checkout() {


  const name = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const cod = document.getElementById("cashOnDelivery").checked;

  if (!name || !customerPhone || !city || !address) {
    alert("Please complete all delivery information.");
    return;
  }

  if (!/^[0-9+\-\s]{10,16}$/.test(customerPhone)) {
    alert("Please enter a valid mobile number.");
    return;
  }

  if (!cod) {
    alert("Currently, Cash on Delivery is the available payment method.");
    return;
  }

  let total = 0;

  let message = `NEW ORDER - ZAVIYAARHUB\n\n`;
  message += `Customer Name: ${name}\n`;
  message += `Customer Mobile: ${customerPhone}\n`;
  message += `City: ${city}\n`;
  message += `Delivery Address: ${address}\n`;
  message += `Payment: Cash on Delivery\n\n`;
  message += `ORDER DETAILS:\n`;

  cart.forEach(item => {

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    message += `${item.name} x ${item.quantity} - Rs. ${itemTotal.toLocaleString()}\n`;

  });

  message += `\nTOTAL: Rs. ${total.toLocaleString()}`;
  message += `\n\nPlease confirm my order.`;

  const phone = "923164215031";

  const whatsappURL =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

}



function checkout() {





/* INITIAL LOAD */

displayProducts(products);

updateCart();
