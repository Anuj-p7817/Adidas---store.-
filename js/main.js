// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();
    loadAllProducts();
    loadProductDetail();
});

// Update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Load featured products on homepage
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const products = await fetchProducts({ limit: 4 });
    displayProducts(products, container);
}

// Load all products on products page
async function loadAllProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    const products = await fetchProducts();
    displayProducts(products, container);

    // Add filter listeners
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
}

// Display products
function displayProducts(products, container) {
    container.innerHTML = '';
    
    if (!products || products.length === 0) {
        container.innerHTML = '<p>No products found</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-description">${product.description.substring(0, 50)}...</div>
                <button class="quick-add-btn" onclick="quickAddToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productCard.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        });
        
        container.appendChild(productCard);
    });
}

// Filter products
async function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const price = document.getElementById('price-filter').value;

    let filter = {};
    if (category) filter.category = category;
    if (price) filter.price = price;

    const products = await fetchProducts(filter);
    const container = document.getElementById('products-container');
    displayProducts(products, container);
}

// Load product detail
async function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) return;

    const product = await fetchProductById(productId);
    if (!product) return;

    document.getElementById('main-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `$${product.price}`;
}

// Quick add to cart
function quickAddToCart(productId) {
    const cart = getCart();
    const product = { id: productId, quantity: 1 };
    
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    
    saveCart(cart);
    updateCartCount();
    alert('Added to cart!');
}

// Add to cart from product detail
function addToCart() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const quantity = parseInt(document.getElementById('quantity').value);
    const size = document.getElementById('size-select').value;
    const color = document.getElementById('color-select').value;

    if (size === 'Select Size' || color === 'Select Color') {
        alert('Please select size and color');
        return;
    }

    const cart = getCart();
    const product = {
        id: productId,
        quantity: quantity,
        size: size,
        color: color
    };

    cart.push(product);
    saveCart(cart);
    updateCartCount();
    alert('Added to cart!');
}

// Buy now
function buyNow() {
    addToCart();
    window.location.href = 'cart.html';
}