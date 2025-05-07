document.addEventListener("scroll", function () {
    const homeSection = document.querySelector(".home");
    const scrollPosition = window.scrollY;
    homeSection.style.backgroundPositionY = `${scrollPosition * 0.01}px`;
});

function toggleDropdown(menuItem) {
    const dropdown = menuItem.querySelector('.dropdown-menu');
    const isVisible = dropdown.style.display === 'block';
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// ADD TO CART FUNCTIONALITY =====================================================================
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
updateCartCounter();

function addToCart(pizzaName, button) {
    const selectedSize = button.parentElement.querySelector('input[type="radio"]:checked');
    if (selectedSize) {
        const sizeAndPrice = selectedSize.value;
        alert(`${pizzaName} (${sizeAndPrice}) added to cart!`);
        cartCount++;
        localStorage.setItem('cartCount', cartCount); // Save the updated count to localStorage
        updateCartCounter();
    } else {
        alert("Please select a size before adding to cart.");
    }
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cartCount;
    }
}
// ADD TO CART END ===============================================================================

document.addEventListener('click', function (event) {
    const isDropdown = event.target.closest('.menu-item');
    if (!isDropdown) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});