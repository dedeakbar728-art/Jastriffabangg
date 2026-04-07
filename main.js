console.log('Hello World!');
// Database Produk (Bisa ditambah sendiri)
const products = [
    { id: 1, name: "Hoodie Vintage Adidas", price: 250000, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id: 2, name: "Kemeja Flanel Uniqlo", price: 150000, img: "https://images.unsplash.com/photo-1596755094514-f87034a7a241?w=400" },
    { id: 3, name: "Kaos Oversize Streetwear", price: 85000, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400" },
    { id: 4, name: "Celana Corduroy Brown", price: 180000, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" }
];

let cart = [];

// Menampilkan Produk
const productList = document.getElementById('product-list');
products.forEach(product => {
    productList.innerHTML += `
        <div class="card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString()}</p>
            <button class="btn-add" onclick="addToCart('${product.name}', ${product.price})">Tambah Keranjang</button>
        </div>
    `;
});

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    cartItems.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<p>${index + 1}. ${item.name} - Rp ${item.price.toLocaleString()}</p>`;
    });
    
    totalAmount.innerText = total.toLocaleString();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function sendToWhatsApp() {
    const name = document.getElementById('buyer-name').value;
    const address = document.getElementById('buyer-address').value;
    const payment = document.getElementById('payment-method').value;

    if (!name || !address || cart.length === 0) {
        alert("Lengkapi data dan pilih barang dulu, Bang!");
        return;
    }

    let productText = "";
    cart.forEach((item, i) => {
        productText += `${i + 1}. ${item.name} (Rp ${item.price.toLocaleString()})%0A`;
    });

    const phoneNumber = "628123456789"; // GANTI DENGAN NOMOR WA ANDA
    const finalTotal = document.getElementById('total-amount').innerText;

    const message = `Halo Jastriff Abang!%0A%0A` +
                    `Saya mau pesan barang berikut:%0A${productText}%0A` +
                    `*Total Harga:* Rp ${finalTotal}%0A%0A` +
                    `*Data Pengiriman:*%0A` +
                    `- Nama: ${name}%0A` +
                    `- Alamat: ${address}%0A` +
                    `- Pembayaran: ${payment}`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}