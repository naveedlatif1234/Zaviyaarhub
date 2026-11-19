
/* ==========================================
   ZAVIYAARHUB E-COMMERCE
   COMPLETE CART & WHATSAPP CHECKOUT
   ========================================== */


/* PRODUCTS */

const products = [
  { id: 1, name: "Premium Face Serum", category: "Cosmetics", price: 1499, icon: "✨" },
  { id: 2, name: "Lipstick Collection", category: "Cosmetics", price: 999, icon: "💄" },
  {
  id: 3,
  name: "Zavi-Yaar H895B TWS Wireless Earbuds",
  category: "Electronics",
  price: 1250,
  icon: "🎧",
  image: "h895b-earbuds.jpg",
  description: "Bluetooth 5.3, deep bass, LED battery display, touch control and built-in microphone. Up to 5–6 hours playtime.",
  delivery: "Free Delivery"
},
  { id: 4, name: "Smart Watch", category: "Electronics", price: 3499, icon: "⌚" },
  { id: 5, name: "Fast Charging Cable", category: "Electronics", price: 799, icon: "🔌" },
  { id: 6, name: "LED Desk Lamp", category: "Household", price: 1299, icon: "💡" },
  { id: 7, name: "Kitchen Organizer", category: "Household", price: 899, icon: "🏠" },
  { id: 8, name: "Storage Box Set", category: "Household", price: 1199, icon: "📦" },
  { id: 9, name: "Baby Feeding Bottle", category: "Baby Care", price: 650, icon: "🍼" },
  { id: 10, name: "Baby Soft Toys", category: "Baby Care", price: 850, icon: "🧸" },
  { id: 11, name: "Baby Care Gift Set", category: "Baby Care", price: 1499, icon: "👶" },
  { id: 12, name: "Baby Bib Set", category: "Baby Care", price: 499, icon: "🧷" },
  { id: 13, name: "Kitchen Storage Containers", category: "Kitchen & Home", price: 899, icon: "🥡" },
  { id: 14, name: "Stainless Steel Water Bottle", category: "Kitchen & Home", price: 699, icon: "🥤" },
  { id: 15, name: "Non-Stick Kitchen Utensils Set", category: "Kitchen & Home", price: 1299, icon: "🍳" },
  { id: 16, name: "Multipurpose Cleaning Brush", category: "Kitchen & Home", price: 399, icon: "🧹" }
];


/* WHATSAPP NUMBER */

const whatsappNumber = "923164215031";


/* CART */

let cart = [];


/* FORMAT PRICE */

function formatPrice(price) {
  return "Rs. " + price.toLocaleString("en-PK");
}


/* DISPLAY PRODUCTS */

function displayProducts(productList) {
  const grid = document.getElementById("productsGrid");

  if (!grid) return;

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

          <h3>${product.name}</h3>

          <div class="product-price">
            ${formatPrice(product.price)}
          </div>

          <button class="add-btn"
            onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}


/* SHOW ALL PRODUCTS */

function showAllProducts() {
  document.getElementById("searchInput").value = "";
  displayProducts(products);
  updateFilterButtons("All");
}


/* FILTER PRODUCTS */

function filterProducts(category) {
  const filtered = products.filter(
    product => product.category === category
  );

  document.getElementById("searchInput").value = "";

  displayProducts(filtered);
  updateFilterButtons(category);

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
}


/* SEARCH PRODUCTS */

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
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.classList.remove("active");

    if (button.textContent.trim() === category) {
      button.classList.add("active");
    }
  });
}


/* ADD TO CART */

function addToCart(productId) {
  const product = products.find(
    item => item.id === productId
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


/* CHANGE PRODUCT QUANTITY */

function changeQuantity(productId, change) {
  const item = cart.find(
    product => product.id === productId
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(
      product => product.id !== productId
    );
  }

  updateCart();
}


/* REMOVE PRODUCT */

function removeFromCart(productId) {
  cart = cart.filter(
    product => product.id !== productId
  );

  updateCart();
}


/* UPDATE CART */

function updateCart() {
  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  document.getElementById("cartCount").textContent = count;

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align:center;padding:25px">
        <h3>Your cart is empty</h3>
        <p>Add products to place your order.</p>
      </div>
    `;

    cartTotal.textContent = formatPrice(0);
    return;
  }

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">

        <div class="cart-item-icon">
          ${item.icon}
        </div>

        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)} each</p>

          <div style="display:flex;align-items:center;gap:10px;margin-top:8px">

            <button
              onclick="changeQuantity(${item.id}, -1)"
              style="padding:4px 10px;border:1px solid #ddd;border-radius:5px">
              −
            </button>

            <strong>${item.quantity}</strong>

            <button
              onclick="changeQuantity(${item.id}, 1)"
              style="padding:4px 10px;border:1px solid #ddd;border-radius:5px">
              +
            </button>

          </div>
        </div>

        <div style="text-align:right">
          <strong>${formatPrice(itemTotal)}</strong>

          <br>

          <button
            class="remove-btn"
            onclick="removeFromCart(${item.id})">
            Remove
          </button>
        </div>

      </div>
    `;
  });

  cartTotal.textContent = formatPrice(total);
}


/* OPEN CART */

function openCart() {
  document.getElementById("cartOverlay")
    .classList.add("show");
}


/* CLOSE CART */

function closeCart(event) {
  document.getElementById("cartOverlay")
    .classList.remove("show");
}


/* WHATSAPP CHECKOUT */

function checkout() {

  if (cart.length === 0) {
    alert("Your cart is empty. Please add products first.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const address = document.getElementById("customerAddress").value.trim();

  const cod = document.getElementById("cashOnDelivery").checked;

  if (!name || !phone || !city || !address) {
    alert("Please fill in your name, mobile number, city and complete delivery address.");
    return;
  }

  let total = 0;

  let message = `*NEW ORDER - ZAVIYAARHUB*\n\n`;

  message += `*CUSTOMER DETAILS*\n`;
  message += `Name: ${name}\n`;
  message += `Mobile: ${phone}\n`;
  message += `City: ${city}\n`;
  message += `Address: ${address}\n\n`;

  message += `*ORDER DETAILS*\n`;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    message += `${index + 1}. ${item.name}\n`;
    message += `Quantity: ${item.quantity}\n`;
    message += `Price: ${formatPrice(item.price)}\n`;
    message += `Subtotal: ${formatPrice(itemTotal)}\n\n`;
  });

  message += `*TOTAL: ${formatPrice(total)}*\n\n`;

  message += `Payment Method: ${
    cod ? "Cash on Delivery" : "Please confirm payment method"
  }\n\n`;

  message += `Please confirm my order. Thank you!`;

  const whatsappURL =
    `https://wa.me/${923164215031}?text=${encodeURIComponent(message)}`;

  window.location.href = whatsappURL;
/* INITIAL LOAD */

displayProducts(products);
updateCart();
