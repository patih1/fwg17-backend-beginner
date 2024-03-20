# Coffee Shop Backend

Welcome to the Coffee Shop Backend Web Project! This repository contains the back-end source code for the Online Coffee Shop web application. With Express.js and NodeJs structure.

Find a wide range of selected coffee, from coffee beans, ground coffee, to quality coffee equipment here. Order your favorite coffee easily and enjoy the best coffee experience at home.


## Features

 - Explore a wide range of coffee products from various local and international roasters.
 - Read complete product descriptions to help you choose the right coffee.
 - Order coffee easily and safely through a trusted online payment system.
- Get exciting promos and special offers.
- Easily monitor your order status.

Built using

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)


## 📌 Getting Started

To run the project locally, follow these simple steps:

1. Clone this repository
```sh
  git clone https://github.com/patih1/fwg17-backend-beginner
  cd fwg17-backend-beginner
```

2. Open in VSCode
```sh
  code .
```

3. install all the dependencies
```sh
  npm install
```

4. run the project
```sh
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

`APP_SECRET`


## API Reference

#### Login

```http
  POST auth/login
```
#### Register

```http
  POST auth/register
```

### Admin Endpoint
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `admin/users` | `GET` | Get a list of users data |
| `admin/users/:id` | `GET` | Get a detailed users data |
| `admin/users` | `POST` | Insert a users data |
| `admin/users/:id` | `PATCH` | Update a users data |
| `admin/users/:id` | `DELETE` | Delete a users data |
| `admin/products` | `GET` | Get a list of products data |
| `admin/products/:id` | `GET` | Get a detailed products data |
| `admin/products` | `POST` | Insert a products data |
| `admin/products/:id` | `PATCH` | Update a products data |
| `admin/products/:id` | `DELETE` | Delete a products data |
| `admin/promo` | `GET` | Get a list of promo data |
| `admin/promo/:id` | `GET` | Get a detailed promo data |
| `admin/promo` | `POST` | Insert a promo data |
| `admin/promo/:id` | `PATCH` | Update a promo data |
| `admin/promo/:id` | `DELETE` | Delete a promo data |
| `admin/product-size` | `GET` | Get a list of product size data |
| `admin/product-size/:id` | `GET` | Get a detailed product size data |
| `admin/product-size/:id` | `PATCH` | Update a product size data |
| `admin/product-variant` | `GET` | Get a list of product variant data |
| `admin/product-variant/:id` | `GET` | Get a detailed product variant data |
| `admin/product-variant` | `POST` | Insert a product variant data |
| `admin/product-variant/:id` | `PATCH` | Update a product variant data |
| `admin/product-variant/:id` | `DELETE` | Delete a product variant data |
| `admin/categories` | `GET` | Get a list of categories data |
| `admin/categories/:id` | `GET` | Get a detailed categories data |
| `admin/categories` | `POST` | Insert a categories data |
| `admin/categories/:id` | `PATCH` | Update a categories data |
| `admin/categories/:id` | `DELETE` | Delete a categories data |
| `admin/tags` | `GET` | Get a list of tags data |
| `admin/tags/:id` | `GET` | Get a detailed tags data |
| `admin/tags` | `POST` | Insert a tags data |
| `admin/tags/:id` | `PATCH` | Update a tags data |
| `admin/tags/:id` | `DELETE` | Delete a tags data |
| `admin/product-tags` | `GET` | Get a list of product tags data |
| `admin/product-tags/:id` | `GET` | Get a detailed product tags data |
| `admin/product-tags` | `POST` | Insert a product tags data |
| `admin/product-tags/:id` | `PATCH` | Update a product tags data |
| `admin/product-tags/:id` | `DELETE` | Delete a product tags data |
| `admin/product-categories` | `GET` | Get a list of product categories data |
| `admin/product-categories/:id` | `GET` | Get a detailed product categories data |
| `admin/product-categories` | `POST` | Insert a product categories data |
| `admin/product-categories/:id` | `PATCH` | Update a product categories data |
| `admin/product-categories/:id` | `DELETE` | Delete a product categories data |
| `admin/product-ratings` | `GET` | Get a list of product ratings data |
| `admin/product-ratings/:id` | `GET` | Get a detailed product ratings data |
| `admin/product-ratings` | `POST` | Insert a product ratings data |
| `admin/product-ratings/:id` | `PATCH` | Update a product ratings data |
| `admin/product-ratings/:id` | `DELETE` | Delete a product ratings data |
| `admin/orders` | `GET` | Get a list of orders data |
| `admin/orders/:id` | `GET` | Get a detailed orders data |
| `admin/orders` | `POST` | Insert a orders data |
| `admin/orders/:id` | `PATCH` | Update a orders data |
| `admin/orders/:id` | `DELETE` | Delete a orders data |
| `admin/order-details` | `GET` | Get a list of order details data |
| `admin/order-details/:id` | `GET` | Get a detailed order details data |
| `admin/order-details` | `POST` | Insert a order details data |
| `admin/order-details/:id` | `PATCH` | Update a order details data |
| `admin/order-details/:id` | `DELETE` | Delete a order details data |

### Customer Endpoint
| `customer/users` | `GET` | Get loged user data |
| `customer/users` | `PATCH` | Update loged user data |
| `customer/orders` | `POST` | Create orders |

### Global Endpoint
| `/products` | `GET` | Get all products |
| `/products/:id` | `GET` | Get detail products |

## Technologies Used

**ExpressJs:** a swift and minimalist web framework for Node.js, this endeavor is dedicated to crafting resilient and scalable server-side applications.

**NodeJs:** Node.js serves as the foundation for this project, capitalizing on its non-blocking, event-driven architecture to ensure the development of server-side applications that are both scalable and high-performing.

## ✍️ Coffee Shop - Frontend Repository
https://github.com/patih1/fwg17-beginner-frontend

## Technologies Used

The project structure is organized as follows: 
- src/: contains the source code of the project.
- asset/: image and icon media.
- components/: Reusable component used throughout the project.
- pages/: Individual pages of the application.


## Contributing

Contributions are always welcome!

## Authors

- [@patih1](https://github.com/patih1)

## Feedback

If you have any feedback, please reach out to us at contactme@haidar.xyz
