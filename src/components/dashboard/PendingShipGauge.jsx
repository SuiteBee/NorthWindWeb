
import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function fillColor(value) {
    if(value > 15) return "red"
    else if(value > 10) return "yellow"
    else return "green"
}

const PendingShipGauge = (props) => {
    
    if(props.shipments !== null){
        return (
            <Gauge
            value={110 - (props.shipments * 4)}
            startAngle={-110}
            endAngle={110}
            height={300}
            margin={{top: 80}}
            sx={{
                [`& .${gaugeClasses.valueText}`]: {
                fontSize: 60,
                transform: 'translate(0px, 0px)'
                },
                [`& .${gaugeClasses.valueText} text`]: {
                    fill: "white"
                },
                //
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: "gray",
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: fillColor(props.shipments),
                }
            }}
            text={`${props.shipments}`}
            />
         )       
    }else{
        return (
            <>
            </>
        )
    }
    
};

export default PendingShipGauge;