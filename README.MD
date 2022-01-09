#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. imports mongoose in index.js and connect to database
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value for database

#### Routers

-auth.js    //for creating and athentication users.
-user.js    //for updating, deleting and reading users
-order.js   //for creating, updating ,deleting and reading
-product.js //creating, updating ,deleting and reading product
-cart.js    //creating, updating ,deleting and reading cart
-verifyToken.js //athenticating token

#### User Model
-User.js
-Product.js
-Order.js
-Cart.js



#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with crypto-js) in User.js using pre method
- Save User


#### Login User

- Validate - email, password - in atuh route
- If email or password is missing, throw error
- Find User
- Compare Passwords
- If no user or password does not match, throw error
- If correct, generate token
- Send user information with token

### Users
-validate token - and user id
-if token does not match-throw error
_if user id does not match -throw
-both match- user can update,delete and get their own information
-if user has validated token and user is admin too then user get all users information



### create,update and delete Product
-validate token-and admin
-If token is not valid throw error
-IF user is not admin-throw error
-user validate successfully
-user can create,update,delete the product

### get products and order
-validate token- in verify token
-anyone with valid token can get all products and they can order

### cart
-user with token can cart the order
-user can update,delete and get their own cart
