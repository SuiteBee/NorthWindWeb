import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";

const orderGridCols = [
    { field: "id", headerName: "Order ID", headerClassName: "orderHeader"},
    { field: "orderDate", headerName: "Date Ordered", headerClassName: "orderHeader" },
    { field: "companyName", headerName: "Company", headerClassName: "orderHeader" },
    { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader" },
    { field: "carrierName", headerName: "Carrier", headerClassName: "orderHeader" },
    { field: "isCompleted", headerName: "Completed", headerClassName: "orderHeader", renderCell: renderCompleted }
];

//Render an input to the cell (checkbox)
function renderCompleted(props){
    const { value } = props;

    return(
        <input
            id={`${props.id}_chk`}
            type="checkbox"
            defaultChecked={value}   
            disabled
            readOnly     
        />
    )
}

const OrderGrid = (props) => {
    const orderGridRows = props.allOrders?.map(
        (order) => (
            { 
                id: order.orderId, 
                orderDate: order.orderDate, 
                companyName: order.orderedBy.companyName, 
                orderTotal: order.orderTotal, 
                carrierName: order.sendTo.shipCarrier, 
                isCompleted: order.sendTo.shippedDate ? "true" : "false"
            }
        )
    );

    return (
        <>
            <div className="orderGrid">
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
                        color: "white",
                        background: "black"
                    }}
                />
            </div>
        </>
    );
};

export default OrderGrid;