// Load cart items
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
});

async function loadCartItems() {
    const cart = getCart();
    const container = document.getElementById('cart-items');

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    container.innerHTML = '';
    let subtotal = 0;

    for (const item of cart) {
        const product = await fetchProductById(item.id);
        if (!product) continue;

        const total = product.price * item.quantity;
        subtotal += total;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                ${item.size ? `<p>Size: ${item.size}</p>` : ''}
                ${item.color ? `<p>Color: ${item.color}</p>` : ''}
            </div>
            <div class="cart-item-quantity">
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <div class="cart-item-price">$${total.toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        container.appendChild(cartItem);
    }

    updateCartSummary(subtotal);
}

// Update quantity
function updateQuantity(productId, quantity) {
    const cart = getCart();
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = parseInt(quantity);
        saveCart(cart);
        loadCartItems();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(p => p.id !== productId);
    saveCart(cart);
    loadCartItems();
    updateCartCount();
}

// Update cart summary
function updateCartSummary(subtotal) {
    const shipping = 10;
    const tax = (subtotal * 0.1).toFixed(2);
    const total = (subtotal + shipping + parseFloat(tax)).toFixed(2);

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax}`;
    document.getElementById('total').textContent = `$${total}`;
}

// Submit order
function submitOrder(event) {
    event.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }

    const orderData = {
        customer_name: document.querySelector('input[placeholder="Full Name"]').value,
        customer_email: document.querySelector('input[placeholder="Email"]').value,
        address: document.querySelector('input[placeholder="Address"]').value,
        city: document.querySelector('input[placeholder="City"]').value,
        zip_code: document.querySelector('input[placeholder="Zip Code"]').value,
        items: cart
    };

    createOrder(orderData).then(response => {
        if (response.success) {
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert('Error placing order');
        }
    });
}