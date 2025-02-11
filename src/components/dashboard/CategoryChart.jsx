import React from "react";
import { PieChart, pieArcLabelClasses  } from "@mui/x-charts/PieChart";

const chartColors = ["lightgreen", "magenta", "lightblue", "lightyellow", "lightcoral", "violet", "gold", "cyan"];

const categories = [
        { display: "Beverages", value: "Beverages" },
        { display: "Condiments", value: "Condiments" },
        { display: "Confections", value: "Confections" },
        { display: "Dairy", value: "Dairy Products" },
        { display: "Grains", value: "Grains/Cereals" },
        { display: "Meat", value: "Meat/Poultry" },
        { display: "Produce", value: "Produce" },
        { display: "Seafood", value: "Seafood" }
    ];

const CategoryChart = (props) => {
    if(props.categories){

        //Pie Slice Hover Display value
        const valueFormatter = (item) => `${item.value}%`

        //Map API data to format that PieChart can process
        const catData =  props.categories?.map(
            (item, index) => (
                {
                    id: index,
                    label: categories.find(c => c.value === item.category).display,
                    value: item.percentage
                }
            )
        );

        return (
            <PieChart
                series={[
                    {
                        arcLabel: (item) => `${item.value}%`,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                        arcLabelMinAngle: 30,
                        arcLabelRadius: "60%",
                        //Pie Y position
                        cy: 190,
                        data: catData,
                        valueFormatter
                    }
                ]}
                height={400}
                margin={{ right: 0, bottom: 50 }}
                sx={{
                    //Slice labels
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: "bold",
                        fontSize: "24px"
                    },
                    //Slices
                    "& .MuiPieArc-root": {
                        stroke: "#212529",
                        strokeWidth: 2,
                    }
                }}
                //More Styling
                colors={chartColors}
                slotProps={{
                    //Hover tooltip style
                    popper: {
                        sx: {
                            border: "2px solid white",
                            backgroundColor:"black",
                            "& .MuiChartsTooltip-paper": {
                                backgroundColor: "black",
                                "& .MuiTypography-h1": {
                                    color: "white",
                                    fontSize: "14px"
                                }
                            },
                            "& .MuiChartsTooltip-cell": {
                                color: "white",
                                fontSize: "14px"
                            }
                        }
                    },
                    //Overhead legend
                    legend: {
                      hidden: true,
                      padding: { top: 20, left: 20, bottom: 20, right: 20 },
                      direction: "row",
                      position: { vertical: "bottom", horizontal: "middle" },
                      labelStyle: {
                        fontSize: 14,
                        fill: "white",
                        width: 75
                      }
                    }
                }}
            />
        );
    } else{
        return( 
            <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border m-5" role="status" style={{width:"100px", height: "100px"}} />
                </div>
            </>
        );
    }
}
export default CategoryChart;