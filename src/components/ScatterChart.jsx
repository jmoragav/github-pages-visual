import React from 'react';
import {
  Chart as ChartJS,
   LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
 

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


export const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

export default function ScatterChart(props){
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
                    
                    

                        className={"mx-2 my-2 flex justify-center"}
                        
                    >
                        
                        <Scatter
                            
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
                            datasets: [
                                {
                                  label: 'A dataset',
                                  data: Array.from({ length: 100 }, () => ({
                                    x: getRandomArbitrary(-100,100),
                                    y: getRandomArbitrary(-100,100)
                                  })),
                                  backgroundColor: 'rgba(255, 99, 132, 1)',
                                },
                              ],

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

 