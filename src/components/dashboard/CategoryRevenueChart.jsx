import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { moneyString } from "@root/components/utility/DisplayHelpers"

const labels = {
    beverages: "Beverages (USD)",
    condiments: "Condiments (USD)",
    confections: "Confections (USD)",
    dairy: "Dairy Products (USD)",
    grains: "Grains/Cereals (USD)",
    meat: "Meat/Poultry (USD)",
    produce: "Produce (USD)",
    seafood: "Seafood (USD)"
  };

 const colors = {
    beverages: "lightgreen",
    condiments: "magenta",
    confections: "lightblue",
    dairy: "lightyellow",
    grains: "lightcoral",
    meat: "violet",
    produce: "gold",
    seafood: "cyan"
  };

const CategoryRevenueChart = (props) => {
    if(props.categoryRevenue){

        const stackStrategy = {
            stack: "total",
            area: true,
            stackOffset: "none"
        }

        const chartSettings = {
            height: 400,
            legend: { hidden: true },
            margin: { top: 5 },
            yAxis: [
                {
                    label: "Dollars $ (USD)"
                }
            ],
          };

        return(
            <LineChart
                xAxis={[
                    {
                        dataKey:"year",
                        valueFormatter: (value) => value.toString(),
                        tickMinStep:1
                    }
                ]}
                series={Object.keys(labels).map((key) => ({
                    dataKey: key,
                    label: labels[key],
                    color: colors[key],
                    showMark: false,
                    valueFormatter: (v) => `$ ${moneyString(v)}`,
                    ...stackStrategy
                }))}
                dataset={props.categoryRevenue}
                {...chartSettings}
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
                        transform: "translate(-65px, 0)",
                        fill:"white"
                    },
                    //X-Axis label
                    [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                        transform: "translate(0, 5px)",
                        fill:"white",
                        fontSize:"12px !important"
                    },
                    //Area Borders
                    "& .MuiLineElement-root": {
                        strokeWidth: 2,
                        stroke:"#212529"
                    }
                }}
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
                    area: (ownerState) => ({
                        style: { fill: ownerState.color }
                    })
                }}
            />
        )
    } else{
        return(
            <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border m-5" role="status" style={{width:"100px", height: "100px"}} />
                </div>
            </>
        )
    }
}

export default CategoryRevenueChart;