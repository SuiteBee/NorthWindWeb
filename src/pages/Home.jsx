//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import React, { useState, useEffect } from "react";
import useAlert from "@/hooks/useAlert";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "../components/api/NorthWindClient";
import DashboardTotals from "../components/dashboard/DashboardTotals";
import RevenueChart from "../components/dashboard/RevenueChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import CategoryRevenueChart from "../components/dashboard/CategoryRevenueChart";
import PendingShipGauge from "../components/dashboard/PendingShipGauge";
import CategoryHeatmap from "../components/dashboard/CategoryHeatmap";

const Home = () => {

    const [dashCharts, setDashCharts] = useState(null);

    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();

    //GET order total stats
    useEffect(() => {
         NorthWindClient.get("dashboard/charts", token)
        .then(data => {
            setDashCharts(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Dashboard Charts", error.message);
            if(error.status === 401) navigate("/logout");
        });
    }, [])

    return (
        <>
            <div className="container-fluid p-4">
                <DashboardTotals totals={dashCharts?.totals} />
                <div className="row row-gap-4 justify-content-center">

                    <div className="col-md-12 col-lg-6">
                        <div className="border border-3 rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge mx-2 my-2 fs-2">
                                Revenue
                                </span>
                            </div>
                            <RevenueChart revenue={dashCharts?.revenue}/>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-6">
                        <div className="border border-3 rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge mx-2 my-2 fs-2">
                                Product Categories
                                </span>
                            </div>
                            <CategoryChart categories={dashCharts?.categories}/>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-6">
                        <div className="border border-3 rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge mx-2 my-2 fs-2">
                                Category Revenue
                                </span>
                            </div>
                            <CategoryRevenueChart categoryRevenue={dashCharts?.categoryRevenue} />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-6">
                        <div className="border border-3 rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge mx-2 my-2 fs-2">
                                    Pending Shipments
                                </span>
                            </div>
                            <PendingShipGauge shipments={dashCharts?.pendingShipments} />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-12">
                        <div className="border border-3 rounded bg-dark">
                            <div className="d-flex justify-content-center mt-3">
                                <span className="badge mx-2 my-2 fs-2">
                                Orders by Month
                                </span>
                            </div>
                            <CategoryHeatmap categoryMonths={dashCharts?.categoryHeatmap} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;