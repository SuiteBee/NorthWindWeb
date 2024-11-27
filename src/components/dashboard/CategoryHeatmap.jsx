
import { fontSize, fontWeight } from "@mui/system";
import React from "react";
import { HeatMapGrid } from 'react-grid-heatmap'

const categories = {
    beverages: "Beverages",
    condiments: "Condiments",
    confections: "Confections",
    dairy: "Dairy Products",
    grains: "Grains/Cereals",
    meat: "Meat/Poultry",
    produce: "Produce",
    seafood: "Seafood"
  };

  const months = {
    1: "Jan",
    2: "Feb",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  };

const CategoryHeatmap = (props) => {
    
    if(props.categoryMonths){
        
        const dataSet = props.categoryMonths.map((item) => { 
            return [item.beverages, item.condiments, item.confections, item.dairy, item.grains, item.meat, item.produce, item.seafood] 
        });

        const xData = Object.keys(categories).map((key) => { 
            return categories[key];
        });

        const yData = Object.keys(months).map((key) => { 
            return months[key]
        });

        return (
            <div className="p-3" style={{height:"450px"}}> 
                <HeatMapGrid
                    data={ dataSet }
                    xLabels={ xData }
                    yLabels={ yData }
                    xLabelsStyle={(index) => ({
                        fontSize: "12px"
                    })}
                    yLabelsStyle={(index) => ({
                        fontSize: "14px",
                        margin: "2px"
                    })}
                    cellStyle={(_x, _y, ratio) => ({
                        margin: "2px",
                        background: `rgb(25, 135, 84, ${ratio})`,
                        border: "none",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "`rgb(0, 0, 0, ${ratio / 2 + 0.4})`"
                      })}
                    // Render cell with tooltip
                    cellRender={(x, y, value) => (
                        <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
                    )}
                    cellHeight="30px"
                    xLabelsPos="bottom"
                />
            </div>
         )       
    }else{
        return (
            <>
            <div class="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status" style={{width:"100px", height: "100px"}} />
            </div>
            </>
        )
    }
    
};

export default CategoryHeatmap;