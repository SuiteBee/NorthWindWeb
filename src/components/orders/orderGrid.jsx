import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";

const orderGridCols = [
    { field: "id", headerName: "Order ID", headerClassName: "orderHeader"},
    { field: "orderDate", headerName: "Date Ordered", headerClassName: "orderHeader" },
    { field: "companyName", headerName: "Company", headerClassName: "orderHeader" },
    { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader" },
    { field: "carrierName", headerName: "Carrier", headerClassName: "orderHeader" },
    { field: "isCompleted", headerName: "Completed", headerClassName: "orderHeader",
        renderCell: renderCompleted
            
    }
];

const orderGridRows = [
    { id: 1, orderDate: "2024-01-01", companyName: "Suite Bee Software", orderTotal: 99.99, carrierName: "USPS", isCompleted: true },
    { id: 2, orderDate: "2024-01-01", companyName: "Suite Bee Software", orderTotal: 99.99, carrierName: "USPS", isCompleted: false },
    { id: 3, orderDate: "2024-01-01", companyName: "Suite Bee Software", orderTotal: 99.99, carrierName: "USPS", isCompleted: true },
    { id: 4, orderDate: "2024-01-01", companyName: "Suite Bee Software", orderTotal: 99.99, carrierName: "USPS", isCompleted: true },
    { id: 5, orderDate: "2024-01-01", companyName: "Suite Bee Software", orderTotal: 99.99, carrierName: "USPS", isCompleted: false }
]

function renderCompleted(props){
    const { value } = props;

    return(
        <input
            id={`${props.id}_chk`}
            type="checkbox"
            defaultChecked={value}   
            disabled
            readonly     
        />
    )
}

const OrderGrid = () => {
    return (
        <>
            <div className="orderGrid">
                <DataGrid rows={orderGridRows} columns={orderGridCols} 
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: false
                            }
                        }
                    }}
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