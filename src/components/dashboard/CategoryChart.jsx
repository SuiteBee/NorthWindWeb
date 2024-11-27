import React from "react";
import { PieChart, pieArcLabelClasses  } from "@mui/x-charts/PieChart";

const chartColors = ["lightgreen", "magenta", "lightblue", "lightyellow", "lightcoral", "violet", "gold", "cyan"];

const CategoryChart = (props) => {
    if(props.categories){

        //Pie Slice Hover Display value
        const valueFormatter = (item) => `${item.value}%`

        //Map API data to format that PieChart can process
        const catData =  props.categories?.map(
            (item, index) => (
                {
                    id: index,
                    label: item.category,
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
                        arcLabelMinAngle: 25,
                        arcLabelRadius: "60%",
                        //Pie X position
                        cx: 200,
                        data: catData,
                        valueFormatter
                    }
                ]}
                height={400}
                sx={{
                    m: 4,
                    //Slice labels
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: "bold",
                        fontSize: "24px"
                    },
                    //Slices
                    "& .MuiPieArc-root": {
                        stroke: "black",
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
                      labelStyle: {
                        fontSize: 14,
                        fill: "white",
                      }
                    }
                }}
            />
        );
    } else{
        return( 
            <>
                <div class="d-flex justify-content-center">
                    <div className="spinner-border m-5" role="status" style={{width:"100px", height: "100px"}} />
                </div>
            </>
        );
    }
}
export default CategoryChart;