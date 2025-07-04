# Product Listing Website
## About <a name="about"></a>
An e-commerce web application for site owners to manage products, categories and orders. The customer can create an account to buy the listed products.

## Key Features
The application is split into two user experiences: the Admin ( Store owner ) and the Customer.

### General Features <a name="general-features"></a>
- **Secure login and registration**.
- **Profile management**: Users can update their personal information and password or delete their account.
- **Product showcasing**: The users can view the listed products in a clean grid-based layout.
- **Advanced search and filtering**:
  * Search products by name.
  * Filter products by one or more categories.
- **Detailed product view**: View product details with a gallery of images, description, price, contact info etc..

### Site Owner
- **Product management**: Full CRUD ( Create, Read, Update, Delete ) functionality.
  * Add products with names, descriprions, prices and categories.
  * Upload multiple images per product.
  * Easily edit and manage products.
- **Category management**:
  * Full CRUD functionality.
  * Filter products with custom categories.
- **Order management**: View and manage all orders placed by customers.

### Customer
- **Shopping Bag**: Add and remove items from a persistent shopping bag.
- **Ordering**:
  * Users can easily order by providing a number and email address.
  * Customers can view a list of their orders.

## Technology Stack
- **Backend**: Laravel
- **Frontend**: React
- **Backend/Frontend bridge**: Inertia
- **Database**: PostgreSQL
- **Styling**: TailwindCSS

## Getting Started
### Prerequisites
- PHP
- Composer
- NPM
- NodeJS
- PostgreSQL

### How to run

1. **Clone the repo** ```git clone https://github.com/MehedAbel/product-listing-app.git```

2. **Create an sql database for the project**

3. **Set database name, username, and password in the project**
- Open the project in the root folder
- Create a .env file and copy the contents from .env.example inside
- Change DB_DATABASE, DB_USERNAME, and DB_PASSWORD values to match your values

4. **Php.ini config**
- Go to your php install location and open the Php.ini file
- Make sure the following extensions are enabled:
 * extension=openssl
 * extension=mbstring
 * extension=fileinfo
 * extension=pdo_pgsql

5. **Open a terminal in the root folder of the project and run these commands in order**
- ```composer install```
- ```npm install```
- ```php artisan storage:link```
- ```php artisan key:generate```
- ```php artisan migrate:fresh --seed```

6. **Run the application**: Run the following commands in 2 separate terminals
- ```php artisan serve```
- ```npm run dev```

**Default Admin Account:**
- Email: products_owner@prod.com
- Password: pass

**Default Client Account:**
- Email: guest@prod.com
- Password: pass

## Screenshots
1. **User Authentication & Profile**
   
![login](https://github.com/user-attachments/assets/68d76e56-0e8d-48f4-90a5-cf228688feb5)
![register](https://github.com/user-attachments/assets/833b0fdd-e7ec-4c9d-aead-33a485622b58)
![profile](https://github.com/user-attachments/assets/5d570234-c9b1-4e76-bb67-612edf6d5c4f)

2. **Home Page & Product Page**

![products_list](https://github.com/user-attachments/assets/d528d17b-125f-438c-a40b-663dcc375c40)
![products_pagination](https://github.com/user-attachments/assets/24fbc705-6778-4c1b-971c-498c6380da9e)
![product_page](https://github.com/user-attachments/assets/c3eab1fa-a2cc-41e6-a58b-2c8306ae6b2f)

3. **Category Filter**

![category_filter](https://github.com/user-attachments/assets/84e4ad96-f530-4776-87ca-71d693a9bc3a)

4. **Shopping Bag**

![shopping_bag](https://github.com/user-attachments/assets/fb271fa9-427b-4de2-9283-0ca64eb3eb33)

5. **Client Orders**

![orders_client](https://github.com/user-attachments/assets/4f119beb-8542-4a9f-83c4-7b8e5669b462)

6. **Admin View Products & Categories**

![products_owner](https://github.com/user-attachments/assets/1d8e24e5-4a79-4617-ae3c-ad3cc62a1358)
![categories_owner](https://github.com/user-attachments/assets/05beb016-01ed-41d2-97e8-5cc84e40d456)

7. **Admin Create & Edit Product**

![create_product](https://github.com/user-attachments/assets/03eec671-9cf2-45a2-bdb8-f93fc588c0af)
![edit_product](https://github.com/user-attachments/assets/893561b8-80ea-4435-861e-cf033f719351)

8. **Admin Create & Edit Category**

![create_category](https://github.com/user-attachments/assets/9a3d62de-b53e-4781-9cfa-f8b8c885dd71)
![edit_category](https://github.com/user-attachments/assets/4fb46054-7494-4c3b-bb26-0883f1b33d55)

9. **Admin Order Management**

![orders_owner](https://github.com/user-attachments/assets/0df66217-40b5-46d1-8bab-e15679bdfcda)
