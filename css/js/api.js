const API_URL = 'php/';

// Fetch all products
async function fetchProducts(filter = {}) {
    try {
        const params = new URLSearchParams(filter);
        const response = await fetch(`${API_URL}products.php?${params}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Fetch single product
async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_URL}products.php?id=${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Add to cart
async function saveCart(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Get cart
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Create order
async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_URL}order.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
}