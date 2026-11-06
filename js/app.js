// SHOPPING CART
let cart = JSON.parse(localStorage.getItem("crumbCart") || "[]");

function saveCart() {
    localStorage.setItem("crumbCart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function addToCart(id) {
    const product = getProductById(id);

    if (!product || product.stock <= 0) {
        alert("Sorry! This product is out of stock.");
        return;
    }

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        if (existing.quantity >= product.stock) {
            alert("Sorry! No more stock available.");
            return;
        }
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    alert(product.name + " added to cart!");
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== Number(id));
    saveCart();
}

function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === Number(id));
    const product = getProductById(id);

    if (!item) return;

    const newQuantity = item.quantity + amount;

    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }

    if (!product || newQuantity > product.stock) {
        alert("Maximum available stock reached.");
        return;
    }

    item.quantity = newQuantity;
    saveCart();
}

function calculateTotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

function updateCartCount() {
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const element = document.getElementById("cartCount");

    if (element) element.textContent = count;
}

function renderCart() {
    const container = document.getElementById("cartItems");
    const totalElement = document.getElementById("cartTotal");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty!</p>";
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>

                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `).join("");
    }

    if (totalElement) {
        totalElement.textContent = "₹" + calculateTotal();
    }
}

function openCart() {
    const overlay = document.getElementById("cartOverlay");
    if (overlay) overlay.style.display = "block";
    renderCart();
}

function closeCart() {
    const overlay = document.getElementById("cartOverlay");
    if (overlay) overlay.style.display = "none";
}

// PRODUCT DISPLAY AND STOCK
function displayProducts(category = "All", search = "") {
    const container = document.getElementById("products");

    if (!container) return;

    const filtered = products.filter(product => {
        const matchesCategory =
            category === "All" || product.category === category;

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    container.innerHTML = filtered.map(product => {
        const unavailable = product.stock <= 0;

        return `
            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none'"
                >

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h4>₹${product.price}</h4>

                ${
                    unavailable
                    ? `<span class="stock-label">OUT OF STOCK</span>
                       <button disabled>Unavailable</button>`
                    : `<p class="stock-available">
                           Available: ${product.stock}
                       </p>
                       <button onclick="addToCart(${product.id})">
                           Add to Cart
                       </button>`
                }

            </div>
        `;
    }).join("");
}

function filterProducts(category) {
    displayProducts(category);
}

function searchProducts() {
    const input = document.getElementById("searchInput");
    displayProducts("All", input ? input.value : "");
}

// CHECKOUT
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const customerName = prompt("Enter your full name:");

    if (!customerName || !customerName.trim()) {
        alert("Please enter your name.");
        return;
    }

    const email = prompt("Enter your email address:");

    if (!email || !email.trim()) {
        alert("Please enter your email.");
        return;
    }

    // Check stock again before placing order
    for (const item of cart) {
        const product = getProductById(item.id);

        if (!product || product.stock < item.quantity) {
            alert(item.name + " is no longer available in the requested quantity.");
            return;
        }
    }

    const orders = JSON.parse(
        localStorage.getItem("crumbOrders") || "[]"
    );

    const order = {
        id: Date.now(),
        customerName: customerName.trim(),
        email: email.trim(),
        items: cart.map(item => ({ ...item })),
        total: calculateTotal(),
        date: new Date().toLocaleString("en-IN"),
        createdAt: new Date().toISOString(),
        status: "Order Placed"
    };

    orders.push(order);

    // Reduce available stock
    cart.forEach(item => {
        const product = getProductById(item.id);
        product.stock -= item.quantity;
    });

    localStorage.setItem("crumbOrders", JSON.stringify(orders));
    localStorage.setItem("crumbProducts", JSON.stringify(products));

    cart = [];
    saveCart();

    alert("Order placed successfully! Your Order ID is " + order.id);

    window.location.href = "my-orders.html";
}

// CUSTOM CAKE ORDER
function submitCustomOrder(event) {
    event.preventDefault();

    const form = event.target;
    const data = Object.fromEntries(new FormData(form).entries());

    const requests = JSON.parse(
        localStorage.getItem("cakeRequests") || "[]"
    );

    data.createdAt = new Date().toISOString();

    requests.push(data);

    localStorage.setItem("cakeRequests", JSON.stringify(requests));

    alert("Your custom cake request has been submitted!");

    form.reset();
}

// CONTACT FORM
function submitContact(event) {
    event.preventDefault();

    alert("Thank you for contacting Crumb & Co.!");

    event.target.reset();
}

// MOBILE MENU
function toggleMenu() {
    const nav = document.querySelector("nav");

    if (nav) {
        nav.classList.toggle("active");
    }
}

// INITIALIZE WEBSITE
document.addEventListener("DOMContentLoaded", function() {
    const savedProducts = JSON.parse(
        localStorage.getItem("crumbProducts") || "null"
    );

    if (savedProducts) {
        savedProducts.forEach(saved => {
            const product = products.find(
                item => item.id === saved.id
            );

            if (product) product.stock = saved.stock;
        });
    }

    displayProducts();
    updateCartCount();
    renderCart();

    const dateInput = document.getElementById("date");

    if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
    }
});