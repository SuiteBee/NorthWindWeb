
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

import { moneyString } from "@root/components/utility/DisplayHelpers"

const chartColors = ["lightgreen", "lightblue", "lightyellow", "lightcoral"];

const chartSetting = {
    yAxis: [
        {
            label: "Dollars $ (USD)"
        }
    ],
    height: 400
}

const RevenueChart = (props) => {
    if(props.revenue){
        return (
            <BarChart
                dataset={props.revenue}
                xAxis={[{ scaleType: "band", dataKey: "year" }]}
                series={[
                    { dataKey: "quarterOne", label: "Q1", id: "q1", valueFormatter: (v) => `$ ${moneyString(v)}` },
                    { dataKey: "quarterTwo", label: "Q2", id: "q2", valueFormatter: (v) => `$ ${moneyString(v)}` },
                    { dataKey: "quarterThree", label: "Q3", id: "q3", valueFormatter: (v) => `$ ${moneyString(v)}` },
                    { dataKey: "quarterFour", label: "Q4", id: "q4", valueFormatter: (v) => `$ ${moneyString(v)}` }
                ]}
                {...chartSetting}
                margin={{left: 120 }}
                //Styling
                sx={{
                    [`.${axisClasses.root}`]: {
                        //Axis lines and ticks
                        [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                            stroke:"white",
                            strokeWidth:1.5
                        },
                        //Axis labels
                        [`.${axisClasses.tickLabel}`]: {
                            fill:"white",
                            fontSize:"16px !important"
                        }
                    },
                    //Y-Axis label
                    [`.${axisClasses.left} .${axisClasses.label}`]: {
                        transform: "translate(-60px, 0)",
                        fill:"white",
                        fontSize:"32px !important"
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
                                "& .MuiTypography-root": {
                                    color: "white",
                                    fontSize: "14px"
                                }
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
         )       
    }else{
        return (
            <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border m-5" role="status" style={{width:"100px", height: "100px"}} />
                </div>
            </>
        )
    }
    
};

export default RevenueChart;