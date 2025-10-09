// USSD Food Delivery System - Frontend Logic
// Connects to C++ backend via HTTP API

class FoodDeliverySystem {
    constructor() {
        this.state = 'INIT';
        this.currentRestaurant = null;
        this.currentOrder = [];
        this.sessionId = this.generateSessionId();
        this.apiEndpoint = 'http://localhost:8080/api/ussd';
        this.useBackend = true; // Set to false to use simulation
        this.restaurants = [
            {
                id: 1,
                name: "Victoria 22",
                menu: [
                    { id: 1, name: "Prawn and hake madras curry with turmeric rice", price: 20.00 },
                    { id: 2, name: "Seafood linguine with roasted tomato and basil sauce", price: 17.50 },
                    { id: 3, name: "Red wine braised oxtail with parmesan mash", price: 17.50 },
                    { id: 4, name: "De-boned stuffed quails with a bone marrow jus", price: 20.00 },
                    { id: 5, name: "Sweet chili pork fillet wrapped in bacon", price: 17.50 },
                    { id: 6, name: "Eggplant tower, tomato passata, and lentil ragù", price: 12.50 },
                    { id: 7, name: "4 Cheese Penne", price: 17.50 }
                ]
            },
            {
                id: 2,
                name: "Organikks Ndizvo",
                menu: [
                    { id: 1, name: "Coconut Tilapia Curry (S)", price: 12.00 },
                    { id: 2, name: "Thai Green Curry (prawn, chicken, or veg) (V)", price: 18.00 },
                    { id: 3, name: "Braised Oxtail", price: 16.00 },
                    { id: 4, name: "Chicken Schnitzel", price: 16.00 },
                    { id: 5, name: "Lemon Butter Tilapia", price: 12.00 },
                    { id: 6, name: "Beef Fillet Medallions", price: 12.00 },
                    { id: 7, name: "Lasagne (beef or veg) (V)", price: 12.00 },
                    { id: 8, name: "Asian Stir Fry Noodles (prawn, chicken, or veg) (V)", price: 14.00 },
                    { id: 9, name: "Carbonara Pasta", price: 16.00 },
                    { id: 10, name: "Arrabiata or Napolitano Pasta (prawn, chicken, or mushroom) (V)", price: 12.00 }
                ]
            },
            {
                id: 3,
                name: "Amanzi Restaurant",
                menu: [
                    { id: 1, name: "West African Chicken Groundnut Stew", price: 25.00 },
                    { id: 2, name: "Confit Duck Leg with Beetroot, Red Onion Pickle & Cranberry Sauce", price: 28.00 },
                    { id: 3, name: "Miso Vegetables with Dashi Rice & Sesame Peanut Dressing", price: 20.00 },
                    { id: 4, name: "Seared Sole with Lentil Rice & Ginger Browned Butter", price: 28.00 },
                    { id: 5, name: "Chicken Kiev with Kimchi & Garlic Butter", price: 25.00 },
                    { id: 6, name: "Sticky Pork Belly with Soy & Chilli Pak Choi", price: 25.00 },
                    { id: 7, name: "Slow Cooked Lamb Shoulder with Harissa & Mint Yogurt", price: 28.00 },
                    { id: 8, name: "Five Spice Oxtail with Creamed Spinach", price: 25.00 },
                    { id: 9, name: "Maple & Fennel Cured Salmon with Pickled Cucumber", price: 30.00 },
                    { id: 10, name: "Prime Dry-Aged Beef with a Choice of Sauces", price: 28.00 }
                ]
            },
            {
                id: 4,
                name: "Paula's Place",
                menu: [
                    { id: 1, name: "1/4 Chicken & Prawns", price: 15.00 },
                    { id: 2, name: "1/4 Chicken & Calamari", price: 14.00 },
                    { id: 3, name: "1/4 Chicken & Hake", price: 13.00 },
                    { id: 4, name: "1/4 Chicken & Ribs", price: 16.00 },
                    { id: 5, name: "1/4 Chicken & Pork Chops", price: 14.00 },
                    { id: 6, name: "Hake & Pork Chops", price: 20.00 },
                    { id: 7, name: "Prawn & Calamari", price: 22.00 },
                    { id: 8, name: "Ribs & Hake", price: 18.00 }
                ]
            },
            {
                id: 5,
                name: "Mozambik Honeybear Greystone Park",
                menu: [
                    { id: 1, name: "1/4 Plain or spicy Moz-BBQ basting", price: 9.00 },
                    { id: 2, name: "1/4 Moz Peri-Peri Dry rub", price: 9.00 },
                    { id: 3, name: "1/4 Garlic, Lemon & Herb or Peri-Peri", price: 10.00 },
                    { id: 4, name: "1/4 Zambeziana coconut or Meninas sauce (no chilli)", price: 11.00 },
                    { id: 5, name: "1/2 Plain or spicy Moz-BBQ basting", price: 14.00 },
                    { id: 6, name: "1/2 Moz Peri-Peri Dry rub", price: 14.00 },
                    { id: 7, name: "1/2 Garlic, Lemon & Herb or Peri-Peri", price: 15.00 },
                    { id: 8, name: "1/2 Zambeziana coconut or Meninas sauce (no chilli)", price: 16.00 }
                ]
            },
            {
                id: 6,
                name: "Coimbra",
                menu: [
                    { id: 1, name: "Coimbra Prawns", price: 10.00 },
                    { id: 2, name: "Grilled Sole", price: 10.00 },
                    { id: 3, name: "Calamari", price: 10.00 },
                    { id: 4, name: "Coimbra Chicken (Half)", price: 6.00 },
                    { id: 5, name: "Grilled Pork Chops", price: 8.00 },
                    { id: 6, name: "Beef Espetada", price: 8.00 },
                    { id: 7, name: "Full Flame-Grilled Chicken with Piri-Piri Sauce", price: 6.00 }
                ]
            },
            {
                id: 7,
                name: "China Garden Zw",
                menu: [
                    { id: 1, name: "Pork slices with green chilies", price: 15.00 },
                    { id: 2, name: "Cumin flavored Lamb", price: 18.00 },
                    { id: 3, name: "Braised Fish", price: 20.00 },
                    { id: 4, name: "Sweet'n'Sour Chicken", price: 14.00 },
                    { id: 5, name: "Crispy Chicken", price: 16.00 },
                    { id: 6, name: "Sizzling Beef Short Ribs", price: 19.00 },
                    { id: 7, name: "Steamed Rice", price: 3.00 },
                    { id: 8, name: "Vegetable Fried Noodles", price: 5.00 },
                    { id: 9, name: "Pork Boiled Dumplings", price: 6.00 }
                ]
            },
            {
                id: 8,
                name: "Queen of Hearts Cafe",
                menu: [
                    { id: 1, name: "Butter Chicken Curry", price: 10.00 },
                    { id: 2, name: "Beef Dal Gosht Curry", price: 12.00 },
                    { id: 3, name: "Half Chicken (Peri Peri or Lemon & Herb or BBQ, served with chips)", price: 10.00 },
                    { id: 4, name: "Char-Grilled Pork Chop (served with chips and a garden salad)", price: 10.00 },
                    { id: 5, name: "Crumbed Fish (served with chips, salad, and homemade tartar sauce)", price: 10.00 },
                    { id: 6, name: "Char-Grilled 350g T-Bone Steak (served with chips, rice, or mash)", price: 14.00 },
                    { id: 7, name: "Grilled BBQ Pork Riblets (served with chips and slaw)", price: 15.00 },
                    { id: 8, name: "Peppered Rump Steak (served with garlic mash and a garden salad)", price: 16.00 },
                    { id: 9, name: "Char-Grilled Bourbon Rib Eye (marinated with bourbon sauce and served with garlic mash and salad)", price: 18.00 },
                    { id: 10, name: "Supreme Surf & Turf (chargrilled sirloin steak and prawns served with mash and vegetables)", price: 18.00 }
                ]
            },
            {
                id: 9,
                name: "Gava's",
                menu: [
                    { id: 1, name: "Beef/Pork Bones", price: 5.00 },
                    { id: 2, name: "Maguru (Tripe)", price: 5.00 },
                    { id: 3, name: "Chicken Stew", price: 6.00 },
                    { id: 4, name: "Beef Stew", price: 6.00 },
                    { id: 5, name: "Goat Meat", price: 6.00 },
                    { id: 6, name: "Liver and Kidney", price: 6.00 },
                    { id: 7, name: "Huku (Chicken)", price: 6.00 },
                    { id: 8, name: "Oxtail", price: 12.00 },
                    { id: 9, name: "Gava's Sampler (3 meats)", price: 10.00 },
                    { id: 10, name: "Vegetarian", price: 12.00 }
                ]
            },
            {
                id: 10,
                name: "Sabai Thai",
                menu: [
                    { id: 1, name: "Vegetable & Tofu", price: 12.95 },
                    { id: 2, name: "Chicken or Pork", price: 14.95 },
                    { id: 3, name: "Shrimp", price: 16.95 },
                    { id: 4, name: "Papaya Salad Som Tum", price: 11.95 },
                    { id: 5, name: "Larb Salad", price: 14.95 },
                    { id: 6, name: "Egg Fried Rice", price: 5.50 },
                    { id: 7, name: "Sticky Rice", price: 2.50 },
                    { id: 8, name: "Brown Rice", price: 2.50 },
                    { id: 9, name: "Side Salad", price: 6.00 },
                    { id: 10, name: "Extra Jasmine Rice", price: 2.50 },
                    { id: 11, name: "Extra Sticky Rice", price: 2.50 },
                    { id: 12, name: "Extra Protein (Chicken, Pork, or Shrimp)", price: 3.00 }
                ]
            }
        ];
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async processInput(input) {
        if (this.useBackend) {
            return await this.processWithBackend(input);
        } else {
            return this.processLocally(input);
        }
    }

    async processWithBackend(input) {
        try {
            this.showConnectionStatus('backend', 'Backend Connected');
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    input: input
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Backend connection error:', error);
            this.showConnectionStatus('error', 'Connection Error');
            // Fallback to local processing
            console.log('Falling back to local simulation...');
            this.showConnectionStatus('simulation', 'Local Simulation');
            return this.processLocally(input);
        }
    }

    showConnectionStatus(type, message) {
        // Remove existing status
        const existingStatus = document.querySelector('.connection-status');
        if (existingStatus) {
            existingStatus.remove();
        }

        // Create new status
        const status = document.createElement('div');
        status.className = `connection-status ${type}`;
        status.textContent = message;
        
        // Add to screen
        const screen = document.querySelector('.screen');
        if (screen) {
            screen.appendChild(status);
        }

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (status.parentNode) {
                status.remove();
            }
        }, 3000);
    }

    processLocally(input) {
        switch (this.state) {
            case 'INIT':
                if (input === '*0101#') {
                    this.state = 'RESTAURANT_SELECT';
                    return this.showRestaurants();
                }
                return {
                    message: "Invalid USSD code. Please try again.\n\nEnter USSD code to continue:",
                    prompt: true
                };

            case 'RESTAURANT_SELECT':
                const restaurantId = parseInt(input);
                if (restaurantId >= 1 && restaurantId <= this.restaurants.length) {
                    this.currentRestaurant = this.restaurants[restaurantId - 1];
                    this.state = 'MENU_SELECT';
                    return this.showMenu();
                }
                return {
                    message: "Invalid restaurant number.\n\n" + this.showRestaurants().message,
                    prompt: true
                };

            case 'MENU_SELECT':
                if (input === '0') {
                    if (this.currentOrder.length > 0) {
                        this.state = 'PAYMENT_SELECT';
                        return this.showOrderSummary();
                    }
                    return {
                        message: "No items in order. Please select at least one item.\n\n" + this.showMenu().message,
                        prompt: true
                    };
                }

                const menuItemId = parseInt(input);
                const menu = this.currentRestaurant.menu;
                if (menuItemId >= 1 && menuItemId <= menu.length) {
                    this.currentOrder.push(menu[menuItemId - 1]);
                    return {
                        message: `✅ Added: ${menu[menuItemId - 1].name}\n\n` + this.showMenu().message,
                        prompt: true
                    };
                }
                return {
                    message: "Invalid menu item.\n\n" + this.showMenu().message,
                    prompt: true
                };

            case 'PAYMENT_SELECT':
                if (input === '1' || input === '2' || input === '3') {
                    this.state = 'PAYMENT_PROCESS';
                    return this.processPayment(input);
                }
                return {
                    message: "Invalid payment option.\n\n" + this.showOrderSummary().message,
                    prompt: true
                };

            case 'PAYMENT_PROCESS':
                return this.completeOrder();

            default:
                return {
                    message: "Session error. Please restart.",
                    prompt: false
                };
        }
    }

    showRestaurants() {
        let message = "USSD code validated. Proceeding...\n\nAvailable Restaurants:\n\n";
        this.restaurants.forEach((restaurant, index) => {
            message += `${index + 1}. ${restaurant.name}\n`;
        });
        message += "\nEnter restaurant number:";
        return { message, prompt: true };
    }

    showMenu() {
        let message = `Menu for ${this.currentRestaurant.name}:\n\n`;
        this.currentRestaurant.menu.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
        });
        message += "\nEnter menu item number (0 to finish):";
        return { message, prompt: true };
    }

    showOrderSummary() {
        let total = 0;
        let message = "Order Summary:\n\n";
        this.currentOrder.forEach(item => {
            message += `• ${item.name} ($${item.price.toFixed(2)})\n`;
            total += item.price;
        });
        message += `\nTotal: $${total.toFixed(2)}\n\n`;
        message += "Select payment method:\n";
        message += "1. Visa Card\n";
        message += "2. EcoCash\n";
        message += "3. Payment on Delivery\n\n";
        message += "Enter your choice:";
        return { message, prompt: true };
    }

    processPayment(option) {
        const paymentMethods = {
            '1': 'Visa Card',
            '2': 'EcoCash',
            '3': 'Payment on Delivery'
        };

        let message = `Payment Method: ${paymentMethods[option]}\n\n`;
        
        if (option === '1') {
            message += "Enter card details:\n(This is a demo - any input accepted)\n\nEnter to continue:";
        } else if (option === '2') {
            message += "Enter EcoCash PIN:\n(This is a demo - any input accepted)\n\nEnter to continue:";
        } else {
            message += "Payment will be collected on delivery.\n\nEnter to confirm:";
        }
        
        return { message, prompt: true };
    }

    completeOrder() {
        const total = this.currentOrder.reduce((sum, item) => sum + item.price, 0);
        let message = "✅ Payment successful!\n";
        message += "✅ Order confirmed and being prepared\n";
        message += "🚚 Order dispatched and on the way\n";
        message += "🏠 Order delivered successfully!\n\n";
        message += `Total Paid: $${total.toFixed(2)}\n\n`;
        message += "Thank you for using USSD Food Delivery!\n\n";
        message += "Press Cancel to close or dial *0101# to order again.";
        
        // Reset for next order
        this.currentOrder = [];
        this.currentRestaurant = null;
        this.state = 'INIT';
        
        return { message, prompt: false };
    }

    reset() {
        this.state = 'INIT';
        this.currentRestaurant = null;
        this.currentOrder = [];
    }
}

// Initialize the system
const foodDeliverySystem = new FoodDeliverySystem();
let currentInput = '';

// UI Functions
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.getElementById('currentTime').textContent = 
        `${hours}:${minutes.toString().padStart(2, '0')}`;
}

function dialPress(digit) {
    currentInput += digit;
    document.getElementById('dialInput').value = currentInput;
}

function dialDelete() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById('dialInput').value = currentInput;
}

function dialClear() {
    currentInput = '';
    document.getElementById('dialInput').value = '';
}

async function dialCall() {
    if (currentInput.trim()) {
        // Switch to USSD screen
        document.getElementById('dialScreen').classList.remove('active');
        document.getElementById('ussdScreen').classList.add('active');
        
        // Show loading state
        displayUSSDMessage("Processing...", false);
        
        try {
            // Process the USSD code
            const result = await foodDeliverySystem.processInput(currentInput);
            displayUSSDMessage(result.message, result.prompt);
        } catch (error) {
            displayUSSDMessage("Connection error. Please try again.", true);
        }
        
        // Clear dial input
        currentInput = '';
        document.getElementById('dialInput').value = '';
    }
}

async function sendUSSD() {
    const input = document.getElementById('ussdInput').value.trim();
    if (input) {
        // Show loading state
        const inputArea = document.querySelector('.ussd-input-area');
        const actions = document.querySelector('.ussd-actions');
        inputArea.style.display = 'none';
        actions.style.display = 'none';
        
        displayUSSDMessage("Processing...", false);
        
        try {
            const result = await foodDeliverySystem.processInput(input);
            displayUSSDMessage(result.message, result.prompt);
            document.getElementById('ussdInput').value = '';
        } catch (error) {
            displayUSSDMessage("Connection error. Please try again.", true);
        }
    }
}

function displayUSSDMessage(message, showInput) {
    const ussdContent = document.getElementById('ussdContent');
    ussdContent.innerHTML = '';
    
    // Check if it's a processing message
    if (message === "Processing...") {
        const processingDiv = document.createElement('div');
        processingDiv.className = 'processing';
        processingDiv.innerHTML = `
            <div class="loading"></div>
            <div class="processing-text">Processing...</div>
        `;
        ussdContent.appendChild(processingDiv);
    } else {
        const messageElement = document.createElement('p');
        messageElement.className = 'ussd-message';
        messageElement.textContent = message;
        ussdContent.appendChild(messageElement);
    }
    
    // Show or hide input area
    const inputArea = document.querySelector('.ussd-input-area');
    const actions = document.querySelector('.ussd-actions');
    
    if (showInput) {
        inputArea.style.display = 'block';
        actions.style.display = 'flex';
        // Small delay to ensure smooth transition
        setTimeout(() => {
            document.getElementById('ussdInput').focus();
        }, 300);
    } else {
        inputArea.style.display = 'none';
        actions.style.display = 'none';
    }
    
    // Scroll to top
    ussdContent.scrollTop = 0;
}

function cancelSession() {
    foodDeliverySystem.reset();
    document.getElementById('ussdScreen').classList.remove('active');
    document.getElementById('dialScreen').classList.add('active');
    currentInput = '';
    document.getElementById('dialInput').value = '';
    document.getElementById('ussdInput').value = '';
}

// Event Listeners
document.getElementById('ussdInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendUSSD();
    }
});

// Make input area clickable to show keyboard on mobile
document.getElementById('ussdInput').addEventListener('click', function() {
    this.removeAttribute('readonly');
    this.focus();
});

// Initialize
updateTime();
setInterval(updateTime, 60000); // Update time every minute

// Start with dial screen
document.getElementById('dialScreen').classList.add('active');

