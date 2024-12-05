import React from "react";
import { moneyString } from "@/components/utility/DisplayHelpers";

const DashboardTotals = (props) => {

    if(props.totals){
        return (
            <>
                <div className="row justify-content-between pb-4">
                    <div className="col-6">
                        <div className="dashboardTotal" style={{backgroundColor: "lightblue"}}>
                            Total Orders
                            <br />
                            {props.totals.numOrders}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="dashboardTotal" style={{backgroundColor: "lightgreen"}}>
                            Revenue Total
                            <br />
                            ${moneyString(props.totals.revenueTotal)}
                        </div>
                    </div>        
                    <div className="col-6">
                        <div className="dashboardTotal" style={{backgroundColor: "gold"}}>
                            Total Clients
                            <br />
                            {props.totals.numClients}
                        </div>
                    </div>  
                    <div className="col-6">
                        <div className="dashboardTotal" style={{backgroundColor: "lightcoral"}}>
                            Products
                            <br />
                            {props.totals.numProducts}
                        </div>
                    </div>      
                    <div className="col-6">
                        <div className="dashboardTotal" style={{backgroundColor: "cyan"}}>
                            Products Sold
                            <br />
                            {props.totals.productsSold}
                        </div>
                    </div>   
                    <div className="col-6">
                        <div className="dashboardTotal" style={{backgroundColor: "violet"}}>
                            Countries
                            <br />
                            {props.totals.countries}
                        </div>
                    </div>         
                </div>
            </>
        );
    } 
    else {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border m-5" role="status" style={{width:"100px", height: "100px"}} />
                </div>
            </>
        )
    }
};

export default DashboardTotals;