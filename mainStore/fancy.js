// Define variables
const cartItems = document.querySelector(".cart-items");
const total = document.querySelector(".cart-total-price");
const clearCartBtn = document.querySelector(".clear-cart");
const products = Array.from(document.querySelectorAll(".product"));

let cart = [];

// Add item to cart
function addToCart(name, price) {
  // Check if item is already in cart
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  // Add animation to cart icon
  const cartIcon = document.querySelector(".fa-shopping-cart");
  cartIcon.classList.add("cart-animation");
  setTimeout(() => {
    cartIcon.classList.remove("cart-animation");
  }, 500);

  // Update cart display
  showCart();
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);

  // Update cart display
  showCart();
}

// Show cart
function showCart() {
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemRow = document.createElement("div");
    itemRow.classList.add("cart-item");

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("cart-item-info");

    const itemName = document.createElement("h4");
    itemName.textContent = item.name;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$${item.price.toFixed(2)}`;

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(index));

    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemPrice);
    itemInfo.appendChild(itemQuantity);

    itemRow.appendChild(itemInfo);
    itemRow.appendChild(removeBtn);

    cartItems.appendChild(itemRow);

    totalPrice += item.price * item.quantity;
  });

  total.textContent = `Total: $${totalPrice.toFixed(2)}`;

  // Add animation to cart total
  const cartTotal = document.querySelector(".cart-total");
  cartTotal.classList.add("cart-total-animation");
  setTimeout(() => {
    cartTotal.classList.remove("cart-total-animation");
  }, 500);
}

// Clear cart
function clearCart() {
  cart = [];
  showCart();
}

// Add to cart button event listener
products.forEach(product => {
  const addToCartBtn = product.querySelector(".add-to-cart");
  const name = product.querySelector("h3").textContent;
  const price = parseFloat(product.querySelector("p").textContent.slice(1));

  addToCartBtn.addEventListener("click", () => addToCart(name, price));
});

// Clear cart button event listener
clearCartBtn.addEventListener("click", clearCart);
