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

// Get canvas and context
const canvas = document.getElementById('pizzaCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to match the pizza image
function resizeCanvas() {
    const pizzaImg = document.querySelector('.pizzaImg');
    canvas.width = pizzaImg.clientWidth;
    canvas.height = pizzaImg.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Ingredient positions and styles
const ingredientStyles = {
    pepperoni: { color: 'red', radius: 20 },
    mushrooms: { color: 'beige', radius: 15 },
    onions: { color: 'purple', radius: 12 },
    sausage: { color: 'crimson', width: 30, height: 15 }, // Rectangular
    bacon: { color: 'darkred', width: 40, height: 16 }, // Rectangular
    'extra-cheese': { color: 'yellow', radius: 25 },
    'black-olives': { color: 'black', radius: 10 },
    'green-peppers': { color: 'green', radius: 15 },
    pineapple: { color: 'gold', width: 30, height: 30 }, // Rectangular
    spinach: { color: 'darkgreen', radius: 15 },
    chicken: { color: 'coral', width: 36, height: 24 }, // Rectangular
    jalapenos: { color: 'limegreen', radius: 12 },
};

// Randomly place ingredients near the center
function drawIngredient(ingredient) {
    const style = ingredientStyles[ingredient];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Generate random positions within a circular area around the center
    for (let i = 0; i < 8; i++) { // Draw multiple instances of the ingredient
        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = Math.random() * (canvas.width / 4); // Random distance from center
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        if (ingredient === 'sausage' || ingredient === 'bacon' || ingredient === 'pineapple' || ingredient === 'chicken') {
            // Draw rectangle for these ingredients
            ctx.fillStyle = style.color;
            ctx.fillRect(x - style.width / 2, y - style.height / 2, style.width, style.height);
        } else {
            // Draw circle for other ingredients
            ctx.beginPath();
            ctx.arc(x, y, style.radius, 0, Math.PI * 2);
            ctx.fillStyle = style.color;
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Clear canvas and redraw selected ingredients
function updatePizza() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get selected toppings
    const selectedToppings = Array.from(
        document.querySelectorAll('input[name="toppings"]:checked')
    ).map(input => input.value);

    // Draw each selected topping
    selectedToppings.forEach(topping => drawIngredient(topping));
}

// Base price and ingredient prices
const basePrice = 10.0;
const ingredientPrices = {
    pepperoni: 1.5,
    mushrooms: 1.0,
    onions: 0.8,
    sausage: 2.0,
    bacon: 2.5,
    'extra-cheese': 1.5,
    'black-olives': 1.0,
    'green-peppers': 1.0,
    pineapple: 1.5,
    spinach: 1.0,
    chicken: 2.5,
    jalapenos: 1.0,
};

// Update price breakdown
function updatePriceBreakdown() {
    const selectedToppings = Array.from(
        document.querySelectorAll('input[name="toppings"]:checked')
    ).map(input => input.value);

    const priceList = document.getElementById('price-list');
    const totalPriceElement = document.querySelector('#price-breakdown p strong');

    // Clear the price list
    priceList.innerHTML = '<li>Base Price: $10.00</li>';

    // Calculate total price
    let totalPrice = basePrice;

    // Add selected toppings to the price list
    selectedToppings.forEach(topping => {
        const toppingPrice = ingredientPrices[topping];
        totalPrice += toppingPrice;

        // Capitalize the first letter of each word in the topping name
        const formattedTopping = topping
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const listItem = document.createElement('li');
        listItem.textContent = `${formattedTopping}: $${toppingPrice.toFixed(2)}`;
        priceList.appendChild(listItem);
    });

    // Update total price
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Add event listeners to toppings checkboxes
document.querySelectorAll('input[name="toppings"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updatePizza(); // Update the pizza drawing
        updatePriceBreakdown(); // Update the price breakdown
    });
});

// Initialize the price breakdown on page load
updatePriceBreakdown();

// Add event listeners to toppings checkboxes
document.querySelectorAll('input[name="toppings"]').forEach(checkbox => {
    checkbox.addEventListener('change', updatePizza);
});

document.addEventListener('click', function (event) {
    const isDropdown = event.target.closest('.menu-item');
    if (!isDropdown) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});