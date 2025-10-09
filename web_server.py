#!/usr/bin/env python3
"""
USSD Food Delivery System - Web Server
Bridges the web interface with C++ backend logic
"""

import http.server
import socketserver
import json
import subprocess
import os
import sys
from urllib.parse import urlparse, parse_qs
import threading
import queue

class FoodDeliveryHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.cpp_backend = None
        super().__init__(*args, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/ussd':
            self.handle_ussd_api()
        else:
            self.send_error(404)

    def handle_ussd_api(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            session_id = data.get('sessionId', 'default')
            input_text = data.get('input', '')
            
            # Process through C++ backend
            response = self.process_with_cpp_backend(input_text)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            response_json = json.dumps({
                'message': response['message'],
                'prompt': response['prompt'],
                'state': response.get('state', 'unknown')
            })
            
            self.wfile.write(response_json.encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, f"Error processing request: {str(e)}")

    def process_with_cpp_backend(self, input_text):
        """Process input using the C++ backend logic"""
        
        # Simulate C++ backend processing
        if input_text == "*0101#":
            return {
                'message': "USSD code validated. Proceeding...\n\nAvailable Restaurants:\n\n1. Victoria 22\n2. Organikks Ndizvo\n3. Amanzi Restaurant\n4. Paula's Place\n5. Mozambik Honeybear Greystone Park\n6. Coimbra\n7. China Garden Zw\n8. Queen of Hearts Cafe\n9. Gava's\n10. Sabai Thai\n\nEnter restaurant number:",
                'prompt': True,
                'state': 'restaurant_select'
            }
        
        # Restaurant selection
        if input_text.isdigit() and 1 <= int(input_text) <= 10:
            restaurants = [
                "Victoria 22", "Organikks Ndizvo", "Amanzi Restaurant", 
                "Paula's Place", "Mozambik Honeybear Greystone Park", 
                "Coimbra", "China Garden Zw", "Queen of Hearts Cafe", 
                "Gava's", "Sabai Thai"
            ]
            
            restaurant_id = int(input_text) - 1
            restaurant_name = restaurants[restaurant_id]
            
            # Get menu for selected restaurant
            menu = self.get_restaurant_menu(restaurant_id)
            menu_text = f"Menu for {restaurant_name}:\n\n"
            for i, item in enumerate(menu, 1):
                menu_text += f"{i}. {item['name']} - ${item['price']:.2f}\n"
            menu_text += "\nEnter menu item number (0 to finish):"
            
            return {
                'message': menu_text,
                'prompt': True,
                'state': 'menu_select'
            }
        
        # Menu item selection
        if input_text.isdigit():
            item_num = int(input_text)
            if item_num == 0:
                # Finish ordering, show payment options
                return {
                    'message': "Order Summary:\n\n• Sample item added ($15.00)\n\nTotal: $15.00\n\nSelect payment method:\n1. Visa Card\n2. EcoCash\n3. Payment on Delivery\n\nEnter your choice:",
                    'prompt': True,
                    'state': 'payment_select'
                }
            else:
                # Add item to order
                return {
                    'message': "✅ Item added to order.\n\nContinue selecting items or enter 0 to finish:",
                    'prompt': True,
                    'state': 'menu_select'
                }
        
        # Payment selection
        if input_text in ['1', '2', '3']:
            payment_methods = {
                '1': 'Visa Card',
                '2': 'EcoCash',
                '3': 'Payment on Delivery'
            }
            
            method = payment_methods[input_text]
            
            if input_text == '2':  # EcoCash
                return {
                    'message': f"Payment Method: {method}\n\nEnter EcoCash PIN:\n(This is a demo - any input accepted)\n\nEnter to continue:",
                    'prompt': True,
                    'state': 'payment_process'
                }
            else:
                return {
                    'message': f"Payment Method: {method}\n\nPayment processing...\n\nEnter to continue:",
                    'prompt': True,
                    'state': 'payment_process'
                }
        
        # Complete order
        return {
            'message': "✅ Payment successful!\n✅ Order confirmed and being prepared\n🚚 Order dispatched and on the way\n🏠 Order delivered successfully!\n\nTotal Paid: $15.00\n\nThank you for using USSD Food Delivery!\n\nPress Cancel to close or dial *0101# to order again.",
            'prompt': False,
            'state': 'complete'
        }

    def get_restaurant_menu(self, restaurant_id):
        """Get menu items for a restaurant"""
        menus = {
            0: [  # Victoria 22
                {"name": "Prawn and hake madras curry with turmeric rice", "price": 20.00},
                {"name": "Seafood linguine with roasted tomato and basil sauce", "price": 17.50},
                {"name": "Red wine braised oxtail with parmesan mash", "price": 17.50},
                {"name": "De-boned stuffed quails with a bone marrow jus", "price": 20.00},
                {"name": "Sweet chili pork fillet wrapped in bacon", "price": 17.50},
                {"name": "Eggplant tower, tomato passata, and lentil ragù", "price": 12.50},
                {"name": "4 Cheese Penne", "price": 17.50}
            ],
            1: [  # Organikks Ndizvo
                {"name": "Coconut Tilapia Curry (S)", "price": 12.00},
                {"name": "Thai Green Curry (prawn, chicken, or veg) (V)", "price": 18.00},
                {"name": "Braised Oxtail", "price": 16.00},
                {"name": "Chicken Schnitzel", "price": 16.00},
                {"name": "Lemon Butter Tilapia", "price": 12.00},
                {"name": "Beef Fillet Medallions", "price": 12.00},
                {"name": "Lasagne (beef or veg) (V)", "price": 12.00},
                {"name": "Asian Stir Fry Noodles (prawn, chicken, or veg) (V)", "price": 14.00},
                {"name": "Carbonara Pasta", "price": 16.00},
                {"name": "Arrabiata or Napolitano Pasta (prawn, chicken, or mushroom) (V)", "price": 12.00}
            ],
            2: [  # Amanzi Restaurant
                {"name": "West African Chicken Groundnut Stew", "price": 25.00},
                {"name": "Confit Duck Leg with Beetroot, Red Onion Pickle & Cranberry Sauce", "price": 28.00},
                {"name": "Miso Vegetables with Dashi Rice & Sesame Peanut Dressing", "price": 20.00},
                {"name": "Seared Sole with Lentil Rice & Ginger Browned Butter", "price": 28.00},
                {"name": "Chicken Kiev with Kimchi & Garlic Butter", "price": 25.00},
                {"name": "Sticky Pork Belly with Soy & Chilli Pak Choi", "price": 25.00},
                {"name": "Slow Cooked Lamb Shoulder with Harissa & Mint Yogurt", "price": 28.00},
                {"name": "Five Spice Oxtail with Creamed Spinach", "price": 25.00},
                {"name": "Maple & Fennel Cured Salmon with Pickled Cucumber", "price": 30.00},
                {"name": "Prime Dry-Aged Beef with a Choice of Sauces", "price": 28.00}
            ]
        }
        
        # Default menu for restaurants not in the list
        return menus.get(restaurant_id, [
            {"name": "Special Dish 1", "price": 15.00},
            {"name": "Special Dish 2", "price": 12.00},
            {"name": "Special Dish 3", "price": 18.00}
        ])

def run_server(port=8080):
    """Start the web server"""
    handler = FoodDeliveryHandler
    
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"🍽️ USSD Food Delivery Web Server")
        print(f"📱 Server running at: http://localhost:{port}")
        print(f"🔗 API endpoint: http://localhost:{port}/api/ussd")
        print(f"📂 Serving files from: {os.getcwd()}")
        print(f"🚀 Open http://localhost:{port}/index.html in your browser")
        print(f"⏹️  Press Ctrl+C to stop server")
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            httpd.shutdown()

if __name__ == "__main__":
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8080.")
    
    run_server(port)
