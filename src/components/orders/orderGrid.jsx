import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { moneyString } from "@/components/utility/DisplayHelpers"

const OrderGrid = (props) => {

    //Render view button on grid to display order details
    function renderView(orderToView){
        return(
            <button 
                type="button" 
                className="btn btn-primary" 
                style={{width: "50px", height: "30px"}}
                onClick={() => props.viewOrder(orderToView)}>
                View
            </button>
        )
    }

    //Render a disabled input checkbox to the cell (checkbox)
    function renderCompleted(item){
        let shipped = item.row.isCompleted;
        return(
            <span className={`badge bg-${shipped ? "success" : "warning"} mx-2`}>
                {shipped ? "Shipped" : "Incomplete"}
            </span>

            
        )
    }

    const orderGridCols = [
        { field: "id", headerName: "Order ID", headerClassName: "orderHeader"},
        { field: "orderDate", headerName: "Date Ordered", headerClassName: "orderHeader", width: 125 },
        { field: "companyName", headerName: "Company", headerClassName: "orderHeader", width: 225 },
        { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "carrierName", headerName: "Carrier", headerClassName: "orderHeader", width: 150 },
        { field: "isCompleted", headerName: "", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    const orderGridRows = props.allOrders?.map(
        (order) => (
            { 
                id: order.orderId, 
                orderDate: order.orderDate, 
                companyName: order.orderedBy.companyName, 
                //Display cost format x,xxx.xx
                orderTotal: "$" + moneyString(order.orderTotal), 
                carrierName: order.sendTo.shipCarrier, 
                //Mark order complete when shipped
                isCompleted: order.fulfilled,
                viewOrder: order
            }
        )
    );

    return (
        <>
            {/*Sum of column widths*/}
            <div style={{width: "850px"}}>
                <DataGrid 
                    disableRowSelectionOnClick 
                    rows={orderGridRows} 
                    columns={orderGridCols} 
                    pageSizeOptions={[10,15,20]}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: false
                            }
                        },
                        //10 results per page
                        pagination: {
                            paginationModel: {
                                pageSize: 10
                            }
                        },
                        sorting: {
                            sortModel: [{ field: "orderDate", sort: "desc" }]
                        }
                    }}
                    //Styling
                    sx={{
                        m: 2,
                        color: "white",
                        background: "black",
                        fontSize: "16px",
                        ".MuiTablePagination-root": {
                            background: "white"
                        },
                        ".MuiTablePagination-displayedRows": {
                            font: "1.6rem/1.25 Arial, sans-serif"
                        }
                    }}
                />
            </div>
        </>
    );
};

export default OrderGrid;