# 📱 USSD Food Delivery - Mobile Web Interface

An iPhone 16-styled web interface that simulates the USSD food delivery experience directly in your browser.

## 🎯 Features

- **📱 iPhone 16 Design**: Authentic iPhone interface with Dynamic Island and modern iOS styling
- **☎️ USSD Dial Pad**: Interactive dial pad to enter USSD codes
- **🍽️ Full Menu System**: Browse menus from 10 restaurants in Harare
- **💳 Multiple Payment Methods**: Visa Card, EcoCash, and Payment on Delivery
- **🎨 Smooth Animations**: iOS-like transitions and interactions
- **📲 Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Option 1: Open Locally
Simply open `index.html` in your web browser:
```bash
open index.html
# or
double-click index.html
```

### Option 2: Run with a Local Server
For better performance, use a local server:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then navigate to: `http://localhost:8000`

## 📱 How to Use

### Step 1: Dial the USSD Code
1. Use the dial pad to enter: `*0101#`
2. Press the green call button 📞

### Step 2: Select a Restaurant
1. You'll see a list of 10 available restaurants
2. Enter the restaurant number (1-10)
3. Press "Send"

### Step 3: Build Your Order
1. Browse the menu items
2. Enter item numbers to add them to your order
3. Enter `0` when finished

### Step 4: Choose Payment Method
1. Select from:
   - **1**: Visa Card
   - **2**: EcoCash
   - **3**: Payment on Delivery
2. Complete the payment flow

### Step 5: Order Confirmation
1. See your order status update in real-time
2. Order confirmed → Dispatched → Delivered! 🎉

## 🎨 Interface Components

### iPhone Frame Features:
- ✨ **Dynamic Island**: Authentic iPhone 16 design element
- ⏰ **Status Bar**: Shows time, signal, WiFi, and battery
- 🏠 **Home Indicator**: Bottom gesture indicator

### USSD Screen:
- 📝 **Message Display**: Shows restaurant lists, menus, and order info
- ⌨️ **Input Field**: Enter your selections
- 🔘 **Action Buttons**: Send or Cancel operations

### Dial Pad:
- 🔢 **Number Keys**: Full dial pad with letters (like a real phone)
- ⌫ **Delete/Clear**: Edit your input
- 📞 **Call Button**: Initiate USSD session

## 🍽️ Available Restaurants

1. **Victoria 22** - Fine Dining
2. **Organikks Ndizvo** - Thai & International
3. **Amanzi Restaurant** - Contemporary African
4. **Paula's Place** - Seafood & Grills
5. **Mozambik Honeybear** - Portuguese & African
6. **Coimbra** - Portuguese Cuisine
7. **China Garden Zw** - Chinese
8. **Queen of Hearts Cafe** - International
9. **Gava's** - Traditional Zimbabwean
10. **Sabai Thai** - Thai Cuisine

## 💳 Payment Methods

### 1. Visa Card
- Simulates card payment entry
- Accepts any demo input

### 2. EcoCash
- Zimbabwe's mobile money platform
- Enter PIN to complete payment

### 3. Payment on Delivery
- Cash payment upon delivery
- No prepayment required

## 🛠️ Technical Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations
- **Vanilla JavaScript**: No frameworks required
- **Responsive Design**: Mobile-first approach

## 📁 File Structure

```
food-delivery-system/
├── index.html          # Main HTML structure
├── styles.css          # iPhone 16 styling and animations
├── app.js              # USSD logic and interactions
└── WEB_INTERFACE.md    # This file
```

## 🎯 Key Features Explained

### State Management
The app uses a state machine to track user progress:
- `INIT`: Waiting for USSD code
- `RESTAURANT_SELECT`: Choose restaurant
- `MENU_SELECT`: Build order
- `PAYMENT_SELECT`: Choose payment method
- `PAYMENT_PROCESS`: Complete transaction

### Real-time Updates
- Order items appear instantly when selected
- Running total calculation
- Payment confirmation flow

### Error Handling
- Invalid USSD code detection
- Out-of-range selections caught
- Empty order prevention

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Safari
- ✅ Firefox
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Experience

The interface is optimized for:
- Touch interactions
- Gesture controls
- Mobile keyboards
- Portrait orientation

## 🎨 Customization

### Change Theme Colors
Edit `styles.css`:
```css
/* Primary color (Send button, etc.) */
.send-btn {
    background: #007aff; /* Change this */
}
```

### Add More Restaurants
Edit `app.js` in the `restaurants` array:
```javascript
{
    id: 11,
    name: "Your Restaurant",
    menu: [
        { id: 1, name: "Dish Name", price: 10.00 }
    ]
}
```

### Modify USSD Code
Change the validation in `app.js`:
```javascript
if (input === '*0101#') { // Change this code
    // ...
}
```

## 🔄 Integration with C++ Backend

The JavaScript app currently simulates the C++ backend. To integrate with the actual backend:

1. **Create a REST API** wrapper for the C++ code
2. **Replace simulation** with HTTP requests in `app.js`
3. **Use WebSockets** for real-time order updates

Example integration:
```javascript
async processInput(input) {
    const response = await fetch('/api/ussd', {
        method: 'POST',
        body: JSON.stringify({ input, state: this.state })
    });
    return await response.json();
}
```

## 🐛 Troubleshooting

### Input not responding?
- Click the input field to activate it
- On mobile, tap to show keyboard

### Dial pad not working?
- Ensure JavaScript is enabled
- Check browser console for errors

### Styling issues?
- Clear browser cache
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

## 🚀 Deployment

### GitHub Pages
```bash
# Already in your repo!
# Enable GitHub Pages in repo settings
# Access at: https://ctg7987.github.io/food-delivery-system/
```

### Netlify
```bash
# Drag and drop your folder to netlify.com
# Or connect your GitHub repo
```

### Vercel
```bash
vercel deploy
```

## 📊 Performance

- **Load Time**: < 1 second
- **File Size**: ~50KB total
- **No Dependencies**: Pure vanilla JavaScript
- **Offline Ready**: Can be cached for offline use

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS Grid and Flexbox
- JavaScript State Management
- Event-Driven Programming
- Responsive Web Design
- Mobile-First Development

## 📝 Future Enhancements

- [ ] Add SMS notification simulation
- [ ] Implement order tracking animation
- [ ] Add delivery location selection
- [ ] Include order history
- [ ] Add restaurant ratings
- [ ] Multi-language support
- [ ] Voice input for accessibility
- [ ] PWA (Progressive Web App) support

## 🤝 Contributing

To add features:
1. Modify the HTML structure in `index.html`
2. Update styles in `styles.css`
3. Add logic in `app.js`
4. Test on both desktop and mobile

## 📄 License

This web interface is part of the USSD Food Delivery System project by Calvin Gutsa.

---

**Enjoy your mobile USSD food delivery experience!** 🍕📱✨

