import { NorthWindClient } from "../components/client/NorthWindClient";
import React, { useState, useEffect } from "react";

import RevenueChart from "../components/dashboard/RevenueChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import CategoryRevenueChart from "../components/dashboard/CategoryRevenueChart";
import PendingShipGauge from "../components/dashboard/PendingShipGauge";

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
                <div className="col-5 border rounded mx-2">
                    <h1 className="mt-3 text-center text-decoration-underline">
                        Revenue
                    </h1>
                    <RevenueChart revenue={dashTotals?.revenue}/>
                </div>
                <div className="col-6 border rounded mx-2">
                    <h1 className="mt-3 text-center text-decoration-underline">
                        Product Categories
                    </h1>
                    <CategoryChart categories={dashTotals?.categories}/>
                </div>
            </div>
            <div className="d-flex mt-3 mb-3">
                <div className="col-6 border rounded mx-2">
                    <h1 className="mt-3 text-center text-decoration-underline">
                        Category Revenue
                    </h1>
                    <CategoryRevenueChart categoryRevenue={dashTotals?.categoryRevenue} />
                </div>
                <div className="col-5 border rounded mx-2" style={{height: "500px"}}>
                    <h1 className="mt-3 text-center text-decoration-underline">
                        Pending Shipments
                    </h1>
                    <PendingShipGauge shipments={dashTotals?.pendingShipments} />
                </div>
            </div>
        </>
    );
};

export default Home;