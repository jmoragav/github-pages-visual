import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);



export default function RadialGraph(props){
    const {value,graph_data} = props
 

    
    const plugin = {
      id: 'custom_canvas_background_color',
      beforeDraw: (chart) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#1C79AF';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

    if(value){

                    return (
                    <div
                        role="graphsec"
                        id={`simple-graphsec`}
                        aria-labelledby={`simple-graphsec`}
                    
                    

                        className={"mx-2 my-2"}
                        
                    >
                        
                        <Radar
                            
                            data={
                            {
                            labels: [
                                'KPI1',
                                'KPI2',
                                'KPI3',
                                'KPI4',
                                'KPI5',
                                'KPI6',
                                'KPI7'
                            ],
                            datasets: [{
                                label: 'My First Dataset',
                                data: graph_data,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            } ]

                            } 


                            }
                            // plugins={[plugin]}
                            
                        />







                    </div>
                    );

        }

        else{
            <></>
        }
  }

 