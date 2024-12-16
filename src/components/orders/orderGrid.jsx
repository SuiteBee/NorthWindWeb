import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { moneyString } from "@/components/utility/DisplayHelpers"

const OrderGrid = (props) => {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const orderGridCols_xsm = [
        { field: "id", headerName: "ID", headerClassName: "orderHeader", width: 75 },
        { field: "orderDate", headerName: "Date", headerClassName: "orderHeader", width: 115 },
        { field: "isCompleted", headerName: "", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    const orderGridCols_sm = [
        { field: "id", headerName: "ID", headerClassName: "orderHeader", width: 75 },
        { field: "orderDate", headerName: "Date", headerClassName: "orderHeader", width: 115 },
        { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "isCompleted", headerName: "", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    const orderGridCols_md = [
        { field: "id", headerName: "ID", headerClassName: "orderHeader", width: 75},
        { field: "orderDate", headerName: "Date", headerClassName: "orderHeader", width: 115 },
        { field: "companyName", headerName: "Company", headerClassName: "orderHeader", width: 225 },
        { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "isCompleted", headerName: "", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    const orderGridCols_lg = [
        { field: "id", headerName: "ID", headerClassName: "orderHeader", width: 75},
        { field: "orderDate", headerName: "Date", headerClassName: "orderHeader", width: 115 },
        { field: "companyName", headerName: "Company", headerClassName: "orderHeader", width: 225 },
        { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "carrierName", headerName: "Carrier", headerClassName: "orderHeader", width: 150 },
        { field: "isCompleted", headerName: "", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    const orderGridCols_xlg = [
        { field: "id", headerName: "ID", headerClassName: "orderHeader", width: 75},
        { field: "orderDate", headerName: "Date", headerClassName: "orderHeader", width: 115 },
        { field: "companyName", headerName: "Company", headerClassName: "orderHeader", width: 225 },
        { field: "orderSubtotal", headerName: "Subtotal", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "orderShipping", headerName: "Shipping", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "carrierName", headerName: "Carrier", headerClassName: "orderHeader", width: 150 },
        { field: "isCompleted", headerName: "", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    const orderGridCols_xxlg = [
        { field: "id", headerName: "ID", headerClassName: "orderHeader", width: 75},
        { field: "orderDate", headerName: "Date", headerClassName: "orderHeader", width: 115 },
        { field: "companyName", headerName: "Company", headerClassName: "orderHeader", width: 300 },
        { field: "orderSubtotal", headerName: "Subtotal", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "orderShipping", headerName: "Shipping", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "orderTotal", headerName: "Order Total", headerClassName: "orderHeader", width: 125, align: "right" },
        { field: "carrierName", headerName: "Carrier", headerClassName: "orderHeader", width: 150 },
        { field: "region", headerName: "Region", headerClassName: "orderHeader", width: 150 },
        { field: "country", headerName: "Country", headerClassName: "orderHeader", width: 150 },
        { field: "isCompleted", headerName: "", headerClassName: "orderHeader", width: 100, align: "center", renderCell: renderCompleted },
        { field: "viewOrder", headerName: "", renderCell: renderView, align: "center", width:75 }
    ];

    //Utilize bootstrap breakpoints to determine what grid displays
    function gridByViewSize(){
        //Extra Small
        if(width < 576){
            return orderGridCols_xsm;
        }
        //Small
        else if(width < 768){
            return orderGridCols_sm;
        }
        //Medium
        else if(width < 992){
            return orderGridCols_md;
        }
        //Large
        else if(width < 1200){
            return orderGridCols_lg;
        }
        //Extra Large
        else if(width < 1400){
            return orderGridCols_xlg;
        }
        //Extra Extra Large
        else {
            return orderGridCols_xxlg;
        }

    }

    const orderGridRows = props.allOrders?.map(
        (order) => (
            { 
                id: order.orderId, 
                orderDate: order.orderDate, 
                companyName: order.orderedBy.companyName, 
                //Display cost format x,xxx.xx
                orderSubtotal: "$" + moneyString(order.orderSubtotal),
                orderShipping: "$" + moneyString(order.sendTo.shipCost),
                orderTotal: "$" + moneyString(order.orderTotal), 
                carrierName: order.sendTo.shipCarrier, 
                region: order.sendTo.address.region,
                country: order.sendTo.address.country,
                //Mark order complete when shipped
                isCompleted: order.fulfilled,
                viewOrder: order
            }
        )
    );

    return (
        <>
            {/*Sum of column widths*/}
            <div className="col">
                <DataGrid 
                    disableRowSelectionOnClick 
                    rows={orderGridRows} 
                    columns={gridByViewSize()} 
                    pageSizeOptions={[10,15,20]}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: true
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