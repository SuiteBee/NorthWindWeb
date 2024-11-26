import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const labels = {
    beverages: 'Beverages ($)',
    condiments: 'Condiments ($)',
    confections: 'Confections ($)',
    dairy: 'Dairy Products ($)',
    grains: 'Grains/Cereals ($)',
    meat: 'Meat/Poultry ($)',
    produce: 'Produce ($)',
    seafood: 'Seafood ($)'
  };

 const colors = {
    beverages: 'lightgreen',
    condiments: 'magenta',
    confections: 'lightblue',
    dairy: 'lightyellow',
    grains: 'lightcoral',
    meat: 'violet',
    produce: 'gold',
    seafood: 'cyan'
  };

const CategoryRevenueChart = (props) => {
    if(props.categoryRevenue){

        //Line point Hover Display value
        const valueFormatter = (item) => `${item.value}%`

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
                        valueFormatter: (value) => value.toString()
                    }
                ]}
                series={Object.keys(labels).map((key) => ({
                    dataKey: key,
                    label: labels[key],
                    color: colors[key],
                    showMark: false,
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
                        transform: "translate(-60px, 0)",
                        fill:"white"
                    },
                    //X-Axis label
                    [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                        transform: "translate(0, 5px)",
                        fill:"white",
                        fontSize:"12px !important"
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
                    }
                }}
            />
        )
    } else{
        return(
            <>
            </>
        )
    }
}

export default CategoryRevenueChart;