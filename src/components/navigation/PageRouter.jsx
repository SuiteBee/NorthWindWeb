import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


//////////////////////////////////////////
//Pages
//////////////////////////////////////////
import Home from "../../pages/Home.jsx";
import Tasks from "../../pages/Tasks.jsx";
import Orders from "../../pages/Orders.jsx";
import Customers from "../../pages/Customers.jsx";
import Products from "../../pages/Products.jsx";
import About from "../../pages/About.jsx";
import Logout from "../../pages/Logout.jsx";
import Layout from "../../pages/Layout.jsx";

export const PageRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element ={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </Router>
    );
};
