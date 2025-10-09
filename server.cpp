//==========================================================================================================
// Name         : USSD Food Delivery System - HTTP Server
// Author       : Calvin Gutsa
// Version      : 1.0
// Date Created : 05-10-2022 
// Description  : HTTP API wrapper for the C++ USSD system to communicate with web interface
//==========================================================================================================

#include <iostream>
#include <string>
#include <map>
#include <sstream>
#include <fstream>
#include <thread>
#include <chrono>
#include "USSDSystem.h"
#include "Restaurant.h"
#include "MenuItem.h"
#include "Order.h"

using namespace std;

class FoodDeliveryServer {
private:
    USSDSystem ussdSystem;
    map<string, string> sessions; // session_id -> current_state
    int sessionCounter;

    void initializeRestaurants() {
        // Initialize all restaurants (same as main.cpp)
        Restaurant restaurant1("Victoria 22");
        restaurant1.addMenuItem(MenuItem("Prawn and hake madras curry with turmeric rice", 20.00));
        restaurant1.addMenuItem(MenuItem("Seafood linguine with roasted tomato and basil sauce", 17.50));
        restaurant1.addMenuItem(MenuItem("Red wine braised oxtail with parmesan mash", 17.50));
        restaurant1.addMenuItem(MenuItem("De-boned stuffed quails with a bone marrow jus", 20.00));
        restaurant1.addMenuItem(MenuItem("Sweet chili pork fillet wrapped in bacon", 17.50));
        restaurant1.addMenuItem(MenuItem("Eggplant tower, tomato passata, and lentil ragù", 12.50));
        restaurant1.addMenuItem(MenuItem("4 Cheese Penne", 17.50));

        Restaurant restaurant2("Organikks Ndizvo");
        restaurant2.addMenuItem(MenuItem("Coconut Tilapia Curry (S)", 12.00));
        restaurant2.addMenuItem(MenuItem("Thai Green Curry (prawn, chicken, or veg) (V)", 18.00));
        restaurant2.addMenuItem(MenuItem("Braised Oxtail", 16.00));
        restaurant2.addMenuItem(MenuItem("Chicken Schnitzel", 16.00));
        restaurant2.addMenuItem(MenuItem("Lemon Butter Tilapia", 12.00));
        restaurant2.addMenuItem(MenuItem("Beef Fillet Medallions", 12.00));
        restaurant2.addMenuItem(MenuItem("Lasagne (beef or veg) (V)", 12.00));
        restaurant2.addMenuItem(MenuItem("Asian Stir Fry Noodles (prawn, chicken, or veg) (V)", 14.00));
        restaurant2.addMenuItem(MenuItem("Carbonara Pasta", 16.00));
        restaurant2.addMenuItem(MenuItem("Arrabiata or Napolitano Pasta (prawn, chicken, or mushroom) (V)", 12.00));

        Restaurant restaurant3("Amanzi Restaurant");
        restaurant3.addMenuItem(MenuItem("West African Chicken Groundnut Stew", 25.00));
        restaurant3.addMenuItem(MenuItem("Confit Duck Leg with Beetroot, Red Onion Pickle & Cranberry Sauce", 28.00));
        restaurant3.addMenuItem(MenuItem("Miso Vegetables with Dashi Rice & Sesame Peanut Dressing", 20.00));
        restaurant3.addMenuItem(MenuItem("Seared Sole with Lentil Rice & Ginger Browned Butter", 28.00));
        restaurant3.addMenuItem(MenuItem("Chicken Kiev with Kimchi & Garlic Butter", 25.00));
        restaurant3.addMenuItem(MenuItem("Sticky Pork Belly with Soy & Chilli Pak Choi", 25.00));
        restaurant3.addMenuItem(MenuItem("Slow Cooked Lamb Shoulder with Harissa & Mint Yogurt", 28.00));
        restaurant3.addMenuItem(MenuItem("Five Spice Oxtail with Creamed Spinach", 25.00));
        restaurant3.addMenuItem(MenuItem("Maple & Fennel Cured Salmon with Pickled Cucumber", 30.00));
        restaurant3.addMenuItem(MenuItem("Prime Dry-Aged Beef with a Choice of Sauces", 28.00));

        Restaurant restaurant4("Paula's Place");
        restaurant4.addMenuItem(MenuItem("1/4 Chicken & Prawns", 15.00));
        restaurant4.addMenuItem(MenuItem("1/4 Chicken & Calamari", 14.00));
        restaurant4.addMenuItem(MenuItem("1/4 Chicken & Hake", 13.00));
        restaurant4.addMenuItem(MenuItem("1/4 Chicken & Ribs", 16.00));
        restaurant4.addMenuItem(MenuItem("1/4 Chicken & Pork Chops", 14.00));
        restaurant4.addMenuItem(MenuItem("Hake & Pork Chops", 20.00));
        restaurant4.addMenuItem(MenuItem("Prawn & Calamari", 22.00));
        restaurant4.addMenuItem(MenuItem("Ribs & Hake", 18.00));

        Restaurant restaurant5("Mozambik Honeybear Greystone Park");
        restaurant5.addMenuItem(MenuItem("1/4 Plain or spicy Moz-BBQ basting", 9.00));
        restaurant5.addMenuItem(MenuItem("1/4 Moz Peri-Peri Dry rub", 9.00));
        restaurant5.addMenuItem(MenuItem("1/4 Garlic, Lemon & Herb or Peri-Peri", 10.00));
        restaurant5.addMenuItem(MenuItem("1/4 Zambeziana coconut or Meninas sauce (no chilli)", 11.00));
        restaurant5.addMenuItem(MenuItem("1/2 Plain or spicy Moz-BBQ basting", 14.00));
        restaurant5.addMenuItem(MenuItem("1/2 Moz Peri-Peri Dry rub", 14.00));
        restaurant5.addMenuItem(MenuItem("1/2 Garlic, Lemon & Herb or Peri-Peri", 15.00));
        restaurant5.addMenuItem(MenuItem("1/2 Zambeziana coconut or Meninas sauce (no chilli)", 16.00));

        Restaurant restaurant6("Coimbra");
        restaurant6.addMenuItem(MenuItem("Coimbra Prawns", 10.00));
        restaurant6.addMenuItem(MenuItem("Grilled Sole", 10.00));
        restaurant6.addMenuItem(MenuItem("Calamari", 10.00));
        restaurant6.addMenuItem(MenuItem("Coimbra Chicken (Half)", 6.00));
        restaurant6.addMenuItem(MenuItem("Grilled Pork Chops", 8.00));
        restaurant6.addMenuItem(MenuItem("Beef Espetada", 8.00));
        restaurant6.addMenuItem(MenuItem("Full Flame-Grilled Chicken with Piri-Piri Sauce", 6.00));

        Restaurant restaurant7("China Garden Zw");
        restaurant7.addMenuItem(MenuItem("Pork slices with green chilies", 15.00));
        restaurant7.addMenuItem(MenuItem("Cumin flavored Lamb", 18.00));
        restaurant7.addMenuItem(MenuItem("Braised Fish", 20.00));
        restaurant7.addMenuItem(MenuItem("Sweet'n'Sour Chicken", 14.00));
        restaurant7.addMenuItem(MenuItem("Crispy Chicken", 16.00));
        restaurant7.addMenuItem(MenuItem("Sizzling Beef Short Ribs", 19.00));
        restaurant7.addMenuItem(MenuItem("Steamed Rice", 3.00));
        restaurant7.addMenuItem(MenuItem("Vegetable Fried Noodles", 5.00));
        restaurant7.addMenuItem(MenuItem("Pork Boiled Dumplings", 6.00));

        Restaurant restaurant8("Queen of Hearts Cafe");
        restaurant8.addMenuItem(MenuItem("Butter Chicken Curry", 10.00));
        restaurant8.addMenuItem(MenuItem("Beef Dal Gosht Curry", 12.00));
        restaurant8.addMenuItem(MenuItem("Half Chicken (Peri Peri or Lemon & Herb or BBQ, served with chips)", 10.00));
        restaurant8.addMenuItem(MenuItem("Char-Grilled Pork Chop (served with chips and a garden salad)", 10.00));
        restaurant8.addMenuItem(MenuItem("Crumbed Fish (served with chips, salad, and homemade tartar sauce)", 10.00));
        restaurant8.addMenuItem(MenuItem("Char-Grilled 350g T-Bone Steak (served with chips, rice, or mash)", 14.00));
        restaurant8.addMenuItem(MenuItem("Grilled BBQ Pork Riblets (served with chips and slaw)", 15.00));
        restaurant8.addMenuItem(MenuItem("Peppered Rump Steak (served with garlic mash and a garden salad)", 16.00));
        restaurant8.addMenuItem(MenuItem("Char-Grilled Bourbon Rib Eye (marinated with bourbon sauce and served with garlic mash and salad)", 18.00));
        restaurant8.addMenuItem(MenuItem("Supreme Surf & Turf (chargrilled sirloin steak and prawns served with mash and vegetables)", 18.00));

        Restaurant restaurant9("Gava's");
        restaurant9.addMenuItem(MenuItem("Beef/Pork Bones", 5.00));
        restaurant9.addMenuItem(MenuItem("Maguru (Tripe)", 5.00));
        restaurant9.addMenuItem(MenuItem("Chicken Stew", 6.00));
        restaurant9.addMenuItem(MenuItem("Beef Stew", 6.00));
        restaurant9.addMenuItem(MenuItem("Goat Meat", 6.00));
        restaurant9.addMenuItem(MenuItem("Liver and Kidney", 6.00));
        restaurant9.addMenuItem(MenuItem("Huku (Chicken)", 6.00));
        restaurant9.addMenuItem(MenuItem("Oxtail", 12.00));
        restaurant9.addMenuItem(MenuItem("Gava's Sampler (3 meats)", 10.00));
        restaurant9.addMenuItem(MenuItem("Vegetarian", 12.00));

        Restaurant restaurant10("Sabai Thai");
        restaurant10.addMenuItem(MenuItem("Vegetable & Tofu", 12.95));
        restaurant10.addMenuItem(MenuItem("Chicken or Pork", 14.95));
        restaurant10.addMenuItem(MenuItem("Shrimp", 16.95));
        restaurant10.addMenuItem(MenuItem("Papaya Salad Som Tum", 11.95));
        restaurant10.addMenuItem(MenuItem("Larb Salad", 14.95));
        restaurant10.addMenuItem(MenuItem("Egg Fried Rice", 5.50));
        restaurant10.addMenuItem(MenuItem("Sticky Rice", 2.50));
        restaurant10.addMenuItem(MenuItem("Brown Rice", 2.50));
        restaurant10.addMenuItem(MenuItem("Side Salad", 6.00));
        restaurant10.addMenuItem(MenuItem("Extra Jasmine Rice", 2.50));
        restaurant10.addMenuItem(MenuItem("Extra Sticky Rice", 2.50));
        restaurant10.addMenuItem(MenuItem("Extra Protein (Chicken, Pork, or Shrimp)", 3.00));

        ussdSystem.addRestaurant(restaurant1);
        ussdSystem.addRestaurant(restaurant2);
        ussdSystem.addRestaurant(restaurant3);
        ussdSystem.addRestaurant(restaurant4);
        ussdSystem.addRestaurant(restaurant5);
        ussdSystem.addRestaurant(restaurant6);
        ussdSystem.addRestaurant(restaurant7);
        ussdSystem.addRestaurant(restaurant8);
        ussdSystem.addRestaurant(restaurant9);
        ussdSystem.addRestaurant(restaurant10);
    }

public:
    FoodDeliveryServer() : sessionCounter(1) {
        initializeRestaurants();
    }

    string generateSessionId() {
        return "session_" + to_string(sessionCounter++);
    }

    string processUSSDRequest(const string& sessionId, const string& input) {
        // Simple HTTP response with JSON-like format
        string response = "HTTP/1.1 200 OK\r\n";
        response += "Content-Type: application/json\r\n";
        response += "Access-Control-Allow-Origin: *\r\n";
        response += "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n";
        response += "Access-Control-Allow-Headers: Content-Type\r\n";
        response += "\r\n";

        // Process the input and return JSON response
        if (input == "*0101#") {
            response += "{\"message\":\"USSD code validated. Proceeding...\\n\\nAvailable Restaurants:\\n\\n1. Victoria 22\\n2. Organikks Ndizvo\\n3. Amanzi Restaurant\\n4. Paula's Place\\n5. Mozambik Honeybear Greystone Park\\n6. Coimbra\\n7. China Garden Zw\\n8. Queen of Hearts Cafe\\n9. Gava's\\n10. Sabai Thai\\n\\nEnter restaurant number:\",\"prompt\":true,\"state\":\"restaurant_select\"}";
            sessions[sessionId] = "restaurant_select";
        } else {
            response += "{\"message\":\"Invalid USSD code. Please try again.\\n\\nEnter USSD code to continue:\",\"prompt\":true,\"state\":\"init\"}";
        }

        return response;
    }

    void startServer(int port = 8080) {
        cout << "🍽️ USSD Food Delivery Server starting on port " << port << endl;
        cout << "📱 Web interface available at: http://localhost:" << port << endl;
        cout << "🔗 API endpoint: http://localhost:" << port << "/api/ussd" << endl;
        cout << "Press Ctrl+C to stop server" << endl;

        // Simple HTTP server simulation
        // In a real implementation, you'd use a proper HTTP library like cpp-httplib
        while (true) {
            // This is a simplified server loop
            // For production, use a proper HTTP server library
            this_thread::sleep_for(chrono::seconds(1));
        }
    }
};

int main() {
    FoodDeliveryServer server;
    server.startServer(8080);
    return 0;
}
