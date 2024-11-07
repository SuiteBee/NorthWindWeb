import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const OrderGrid = (props) => {

    function renderView(orderToView){
        return(
            <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => props.viewOrder(orderToView)}>
                View
            </button>
        )
    }

    //Render an input to the cell (checkbox)
    function renderCompleted(isComplete){
        return(
            <input
                id={`${props.id}_chk`}
                type="checkbox"
                defaultChecked={isComplete}   
                disabled
                readOnly     
            />
        )
    }

    const orderGridCols = [
        { field: "id", headerName: "Order ID", headerClassName: "orderHeader"},
        { field: "orderDate", headerName: "Date Ordered", headerClassName: "orderHeader", width: 125 },
        { field: "companyName", headerName: "Company", headerClassName: "orderHeader", width: 225 },
        { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "carrierName", headerName: "Carrier", headerClassName: "orderHeader", width: 150 },
        { field: "isCompleted", headerName: "Completed", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    const orderGridRows = props.allOrders?.map(
        (order) => (
            { 
                id: order.orderId, 
                orderDate: order.orderDate, 
                companyName: order.orderedBy.companyName, 
                //Display cost format x,xxx.xx
                orderTotal: order.orderTotal.toLocaleString('en-US', {minimumFractionDigits: 2}), 
                carrierName: order.sendTo.shipCarrier, 
                isCompleted: order.sendTo.shippedDate ? "true" : "false",
                viewOrder: order
            }
        )
    );

    return (
        <>
            <div style={{width: "850px"}}>
                <DataGrid rows={orderGridRows} columns={orderGridCols} 
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: false
                            }
                        },
                        pagination: {
                            paginationModel: {
                                pageSize: 10
                            }
                        }
                    }}
                    //Styling
                    sx={{
                        m: 2,
                        color: "white",
                        background: "black",
                        fontSize: "16px"
                    }}
                />
            </div>
        </>
    );
};

export default OrderGrid;