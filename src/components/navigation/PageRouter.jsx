import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom";


//////////////////////////////////////////
//Pages
//////////////////////////////////////////
import Home from "@root/pages/Home.jsx";
import Orders from "@root/pages/Orders.jsx";
import NewOrder from "@root/pages/NewOrder.jsx";
import Customers from "@root/pages/Customers.jsx";
import NewClient from "@root/pages/NewClient.jsx";
import Products from "@root/pages/Products.jsx";
import About from "@root/pages/About.jsx";
import Login from "@root/pages/Login.jsx";
import Logout from "@root/pages/Logout.jsx";
import Layout from "@root/pages/Layout.jsx";

export const PageRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/new" element={<NewOrder />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/customers/new" element={<NewClient />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </Router>
    );
};
