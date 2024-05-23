function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let cartItem = cart.find(c => c.productId === productId);

    if (product && product.stock > 0) {
        if (cartItem) {
            if (product.stock > cartItem.quantity) {
                cartItem.quantity++;
            } else {
                alert('Not enough stock!');
            }
        } else {
            cart.push({ productId: productId, quantity: 1 });
        }
        product.stock--;

        // Save the updated products state to the server
        updateProductOnServer(product);
    } else {
        alert('Out of stock!');
    }

    reloadCart();
}

function updateProductOnServer(product) {
    return fetch(`http://localhost:5500/products/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    }).then(response => response.json())
    .then(data => {
        console.log('Product updated successfully:', data);
    })
    .catch(error => {
        console.error('Error updating product:', error);
    });
}
