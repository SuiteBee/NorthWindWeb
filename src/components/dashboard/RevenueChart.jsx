
import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

const RevenueChart = (props) => {
    
    const chartSetting = {
        yAxis: [
            {
                label: "dollars $"
            }
        ],
        width: 600,
        height: 400
    }

    if(props.revenue){
        return (
            <BarChart
                dataset={props.revenue}
                xAxis={[{ scaleType: "band", dataKey: "year" }]}
                series={[
                    { dataKey: "quarterOne", label: "Q1", },
                    { dataKey: "quarterTwo", label: "Q2", },
                    { dataKey: "quarterThree", label: "Q3", },
                    { dataKey: "quarterFour", label: "Q4", }
                ]}
                {...chartSetting}
                //Styling
                sx={{
                    m: 2,
                    //change left yAxis label styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.4",
                        fill:"white"
                    },
                    // change all labels fontFamily shown on both xAxis and yAxis
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                        fontFamily: "Roboto",
                    },
                    // change bottom label styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.5",
                        fill:"white"
                    },
                    // bottomAxis Line Styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                        stroke:"white",
                        strokeWidth:0.4
                    },
                    // leftAxis Line Styles
                    "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                        stroke:"white",
                        strokeWidth:0.4
                    }
                }}
                //More Styling
                slotProps={{
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
            </>
        )
    }
    
};

export default RevenueChart;