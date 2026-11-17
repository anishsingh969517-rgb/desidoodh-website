// Desi Doodh website settings
// IMPORTANT: Replace the sample number below with your WhatsApp number.
// Use country code + number, digits only. India example: 919876543210
const WHATSAPP_NUMBER = "917607369374";


// DESIDOODH PRODUCT CATALOG

const products = [
  {
    id: 1,
    name: "Milk 200 ml",
    price: 10,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600",
    category: "Milk"
  },
  {
    id: 2,
    name: "Milk 500 ml",
    price: 30,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600",
    category: "Milk"
  },
  {
    id: 3,
    name: "Milk 1000 ml",
    price: 60,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600",
    category: "Milk"
  },
  {
    id: 4,
    name: "Mini Curd",
    price: 10,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
    category: "Curd"
  },
  {
    id: 5,
    name: "Medium Curd",
    price: 35,
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600",
    category: "Curd"
  },
  {
    id: 6,
    name: "Large Curd",
    price: 70,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
    category: "Curd"
  }
];

let cart = [];

// DISPLAY PRODUCTS

function displayProducts() {
  const grid = document.getElementById("product-grid");

  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.src='https://placehold.co/400x300?text=DesiDoodh'"
      >
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <div class="price">₹${product.price}</div>
        <button class="add-button"
          onclick="addToCart(${product.id})">
          Add to Cart +
        </button>
      </div>
    </div>
  `).join("");
}

// ADD PRODUCT TO CART

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCart();
}

// CHANGE QUANTITY

function changeQuantity(id, amount) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

// UPDATE CART DISPLAY

function updateCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  document.getElementById("cart-count").textContent = count;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("cart-total").textContent =
    "Total: ₹" + total;

  document.getElementById("cart-items").innerHTML =
    cart.length === 0
    ? "<p>Your cart is empty.</p>"
    : cart.map(item => `
      <div class="cart-row">
        <div>
          <strong>${item.name}</strong>
          <br>₹${item.price} × ${item.quantity}
        </div>
        <div>
          <button onclick="changeQuantity(${item.id},-1)">−</button>
          ${item.quantity}
          <button onclick="changeQuantity(${item.id},1)">+</button>
        </div>
      </div>
    `).join("");
}

// OPEN CART

function showCart() {
  document.getElementById("cart-modal").style.display = "flex";
  updateCart();
}

// CLOSE CART

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

// WHATSAPP CHECKOUT

function checkout() {
  if (cart.length === 0) {
    alert("Please add products to your cart first!");
    return;
  }

  const phone = "917607369374";

  let message = "Hello DesiDoodh! I want to place an order:\n\n";

  cart.forEach(item => {
    message += item.name +
      " × " + item.quantity +
      " = ₹" + (item.price * item.quantity) + "\n";
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  message += "\nTotal Amount: ₹" + total;
  message += "\n\nPlease confirm my order.";

  const url =
    "https://wa.me/" + phone +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

// START WEBSITE

document.addEventListener("DOMContentLoaded", function() {
  displayProducts();
  updateCart();
});
