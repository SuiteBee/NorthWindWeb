import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


//////////////////////////////////////////
//Pages
//////////////////////////////////////////
import Home from "@/pages/Home.jsx";
import Orders from "@/pages/Orders.jsx";
import NewOrder from "@/pages/NewOrder.jsx";
import Customers from "@/pages/Customers.jsx";
import NewClient from "@/pages/NewClient.jsx";
import Products from "@/pages/Products.jsx";
import About from "@/pages/About.jsx";
import Login from "@/pages/Login.jsx";
import Logout from "@/pages/Logout.jsx";
import Layout from "@/pages/Layout.jsx";

export const PageRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
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
