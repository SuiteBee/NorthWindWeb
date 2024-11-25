import { NorthWindClient } from "../components/client/NorthWindClient";
import React, { useState, useEffect } from "react";

import RevenueChart from "../components/dashboard/RevenueChart";
import CategoryChart from "../components/dashboard/CategoryChart";


import useAlert from "@/hooks/useAlert";

const Home = () => {

    const [dashTotals, setDashTotals] = useState(null);

    const { setAlert, clearAlert } = useAlert();

    //GET order total stats
    useEffect(() => {
         NorthWindClient.get("dashboard/totals")
        .then(data => {
            setDashTotals(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Dashboard Totals", error.message);
        });
    }, [])

    return (
        <>
            <div className="d-flex mt-3">
                <div className="col-6 border rounded mx-2">
                    <h1 className="mt-3 text-center text-decoration-underline">
                        Revenue
                    </h1>
                    <RevenueChart revenue={dashTotals?.revenue}/>
                </div>
                <div className="col-6 border rounded mx-2">
                    <h1 className="mt-3 text-center text-decoration-underline">
                        Categories
                    </h1>
                    <CategoryChart categories={dashTotals?.categories}/>
                </div>
            </div>
        </>
    );
};

export default Home;