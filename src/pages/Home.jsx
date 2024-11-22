import { NorthWindClient } from "../components/client/NorthWindClient";
import React, { useState, useEffect } from "react";

import RevenueChart from "../components/dashboard/RevenueChart";


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
            <div className="display-1 p-5">
                Dashboard
                <hr className="w-50"/>
            </div>

            <div className="text-white">
                <RevenueChart revenue={dashTotals?.revenue}/>
            </div>

        </>
    );
};

export default Home;