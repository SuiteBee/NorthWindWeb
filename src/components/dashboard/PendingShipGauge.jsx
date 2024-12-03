
import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function fillColor(value) {
    if(value > 15) return "red"
    else if(value > 10) return "yellow"
    else return "green"
}

const PendingShipGauge = (props) => {
    
    if(props.shipments || props.shipments === 0){
        return (
            <Gauge
            value={110 - (props.shipments * 4)}
            startAngle={-110}
            endAngle={110}
            height={400}
            margin={{bottom: 20, top: 20}}
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
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status" style={{width:"100px", height: "100px"}} />
            </div>
            </>
        )
    }
    
};

export default PendingShipGauge;