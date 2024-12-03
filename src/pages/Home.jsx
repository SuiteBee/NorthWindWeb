import { NorthWindClient } from "../components/api/NorthWindClient";
import React, { useState, useEffect } from "react";

import RevenueChart from "../components/dashboard/RevenueChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import CategoryRevenueChart from "../components/dashboard/CategoryRevenueChart";
import PendingShipGauge from "../components/dashboard/PendingShipGauge";
import CategoryHeatmap from "../components/dashboard/CategoryHeatmap";

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
            <div className="container-fluid p-4">
                <div className="row row-gap-4 justify-content-center">

                    <div className="col-md-12 col-lg-6">
                        <div className="border rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge bg-primary mx-2 my-2 fs-2">
                                Revenue
                                </span>
                            </div>
                            <RevenueChart revenue={dashTotals?.revenue}/>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-6">
                        <div className="border rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge bg-primary mx-2 my-2 fs-2">
                                Product Categories
                                </span>
                            </div>
                            <CategoryChart categories={dashTotals?.categories}/>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-6">
                        <div className="border rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge bg-primary mx-2 my-2 fs-2">
                                Category Revenue
                                </span>
                            </div>
                            <CategoryRevenueChart categoryRevenue={dashTotals?.categoryRevenue} />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-6">
                        <div className="border rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge bg-primary mx-2 my-2 fs-2">
                                    Pending Shipments
                                </span>
                            </div>
                            <PendingShipGauge shipments={dashTotals?.pendingShipments} />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-12">
                        <div className="border rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge bg-primary mx-2 my-2 fs-2">
                                Orders by Month
                                </span>
                            </div>
                            <CategoryHeatmap categoryMonths={dashTotals?.categoryHeatmap} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;