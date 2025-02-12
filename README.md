# Northwind Web

> [!TIP]
> See usage section in release README for login credentials

## Purpose
<details open>
<summary><h3>What is it?</h3></summary>

This repo contains the front-end of a web app for a fictional global food distributor **Northwind** utilizing primarily JavaScript via React.
The whole project is based upon a legacy sample database from Microsoft of the same name. 
The **Northwind** database provided a source for customers, inventory, orders, suppliers, shipping info and employees to build a real-world applicable site around. 

</details>
<details>
<summary><h3>Why make it?</h3></summary>

The reason for creating this site was to gain a functional knowledge of the JavaScript library React as well as to improve upon my own frontend development in general. 
The project started as a simple task manager tutorial to learn the basics of how React was structured and the component lifecycle.
Once that was complete, I made the jump to designing an entire front-end for a fictional distribution company.

This being a fictional use case, the project will be feature rich, but not feature complete. 
There will be some obvious opportunities left for improvement. 
As a learning experience it only needs to go so far in its reach.

</details>
<details>
<summary><h3>Who made it?</h3></summary>

A developer trying to ever expand his skills and knowledge of IT. 
I have a lengthy history of full-stack development for a large enterprise company where I had to manage a wide variety of web based applications 
across many repos that implemented varying dependencies and tech.

I spent much of my time there
+ Maintaining legacy projects
+ Migrating business logic to API's
+ Implementing new site functionality
+ Testing new code and writing unit tests
+ Overhauling existing logical systems
+ Inserting mass table data
+ Restructuring tables
+ Auditing legacy data and resolving issues
+ Investigating long standing complex bugs
+ Reviewing pull requests
                        
The nature of the business depended on the immutability of bound contracts. Data integrity was priority 
number one so all theses tasks were performed with calculated regard to maintain that integrity.

While working for the enterprise above I simultaneously spent a large portion of my free time working with an indie game
studio as the sole developer to create mobile games in Unity 3D. 
The team consisted of a studio head that ran scrum 
meetings, one or two artists, a marketing and web designer, a sound designer and myself.

Many of my tasks with this group involved handling logic for
+ UI
+ Game State
+ Events
+ Player Movement
+ Player Interactions
+ Animation Transitions
+ Enemy AI

As well as 
+ Importing assets to the game engine
+ Placing assets, building levels and setting collision bounds
+ Utilizing ad frameworks for monetization
+ Submitting builds for both Android and iOS

</details>

## Features

<details>
<summary><h3>Login</h3></summary>

### Login Page

The landing page for the site is a login screen or alternatively if a URL is accessed without a valid token, users will be redirected here.

![login](https://github.com/user-attachments/assets/4a4ae5fc-fd9d-456b-b388-8fe7d8447a29)

</details>

<details>
<summary><h3>Dashboard</h3></summary>

After login users are greeted with the dashboard, displaying various charts and data points pertaining to the business.

![dashboard_header](https://github.com/user-attachments/assets/94514ca1-9fa9-4770-a801-e53ceb6c4bef)

The first four charts leverage components from MUI-X and the first three offer some hover interaction for a more detailed view.

![dashboard_charts](https://github.com/user-attachments/assets/099eb786-f9fd-40f1-8c9d-7d60c0009296)
![dashboard_revenue_hover](https://github.com/user-attachments/assets/990f661f-ded3-4fd7-908a-47338f98d788)
![dashboard_categories_hover](https://github.com/user-attachments/assets/d40141af-efb7-40de-a67c-6028fbbbdc02)
![dashboard_category_revenue_hover](https://github.com/user-attachments/assets/c969608a-21d8-49aa-82c3-b2b0cedb21b8)

The last chart taking up two columns is the order heatmap which leverages an open source npm package react-grid-heatmap.

![dashboard_heatmap](https://github.com/user-attachments/assets/aba012da-4efe-4ff1-93f5-3f05b428b9d9)

</details>

<details>
<summary><h3>Orders</h3></summary>

### Orders Page

The orders page allows users to create new orders as well as display all the orders made in a datagrid with shipping status and an option for a more detailed view.
The datagrid can be ordered by any of the listed columns. 
The number of columns shown will depend on the size of the browser window, some columns are hidden as the window shrink to keep the datagrid in view.

![orders](https://github.com/user-attachments/assets/2489598e-31e0-4e62-b686-02cc1b3fbc06)

### Detail View

Clicking the view button within an order record will display the following page to see the order breakdown. 
User has options to ship or delete the order from here. Once marked as shipped, the order can no longer be deleted. 

![order_details](https://github.com/user-attachments/assets/38372e09-ad75-48e9-bef7-f48f506a31b5)

### New Order Process

The following GIF illustrates the new order process. 

+ Steps
  - You must have a registered customer account to reference the new order
  - Select as many products as you like
  - Adjust quantity and markup in the pop-up modal
  - Review the order in the cart and remove items as necessary
  - Determine the shipping cost, carrier used and destination
  - The steps listed at the top will act as breadcrumbs to navigate
  - Review the full order and submit when ready

![order_new](https://github.com/user-attachments/assets/0dee3d92-1921-4676-83a5-468d309942b7)

</details>

<details>
<summary><h3>Clients</h3></summary>

### Clients Page

On the clients page users can add or modify existing customers. The top of the page also has options to filter by client region and search by the business or owner name. 

![clients](https://github.com/user-attachments/assets/6c254c29-f874-46f2-acdf-0ee54f5ca8b3)

The region and search bar filters are not mutually exclusive and can be applied together. 
The search term applies to the full string and return entries that contain the substring as seen below.

![clients_filtered](https://github.com/user-attachments/assets/4cf14115-8af3-4dbb-b004-69029301cb11)

By clicking on any of the client entries, the user is presented with a modal to modify the street address of the business or the contact info.

![clients_modal](https://github.com/user-attachments/assets/f6a27e95-c684-4f42-b921-1a8c05dd4ee1)


</details>

## Technology

+ REACT
+ native fetch (api calls)
+ Vite (for enhanced development)
+ Node.js (required by Vite)
+ SASS
+ Bootstrap
+ react-bootstrap (for JS dependent components)
+ MUI X (Dashboard Charts)

## Credits

<details>
<summary><h3>Components</h3></summary>

Dashboard charts and order grid from [MUI-X](https://mui.com/x/)
under [MIT License](https://www.tldrlegal.com/license/mit-license)

Dashboard heatmap from [arunghosh](https://github.com/arunghosh/react-grid-heatmap)
under [MIT License](https://www.tldrlegal.com/license/mit-license)

</details>

<details>
<summary><h3>Assets</h3></summary>

Following vectors and icons from [SVG Repo](https://www.svgrepo.com)
under [Creative Commons by Attribution License](https://creativecommons.org/licenses/by/4.0/)

Product Catalog Icons by [Yu Chun Chou](https://www.behance.net/james_chou)

<div>
    <img src="/src/assets/products/apple.svg" width="25" height="25">
    <img src="/src/assets/products/bread.svg" width="25" height="25">
    <img src="/src/assets/products/donut.svg" width="25" height="25">
    <img src="/src/assets/products/drink.svg" width="25" height="25">
    <img src="/src/assets/products/jar.svg" width="25" height="25">
    <img src="/src/assets/products/lobster.svg" width="25" height="25">
    <img src="/src/assets/products/meat.svg" width="25" height="25">
    <img src="/src/assets/products/milk.svg" width="25" height="25">
</div>

Following vectors and icons from [Google](https://fonts.google.com/icons)
under [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

Navigation Icons

<div>
    <img src="/src/assets/icon/homeIcon.svg" width="25" height="25">
    <img src="/src/assets/icon/taskIcon.svg" width="25" height="25">
    <img src="/src/assets/icon/orderIcon.svg" width="25" height="25">
    <img src="/src/assets/icon/clientsIcon.svg" width="25" height="25">
    <img src="/src/assets/icon/productIcon.svg" width="25" height="25">
    <img src="/src/assets/icon/aboutIcon.svg" width="25" height="25">
    <img src="/src/assets/icon/logoutIcon.svg" width="25" height="25">
</div>

Client Profile Icon

<img src="/src/assets/icon/profileIcon.svg" width="25" height="25">

</details>
<details>
<summary><h3>Fonts</h3></summary>

Following fonts from [Google](https://fonts.google.com/)
under [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

[Lora](https://fonts.google.com/specimen/Lora)

[Merriweather](https://fonts.google.com/specimen/Merriweather)

[Poppins](https://fonts.google.com/specimen/Poppins)

</details>
