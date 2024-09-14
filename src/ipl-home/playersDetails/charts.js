import React from 'react';
import { Chart } from 'react-google-charts';

const GooglePieChart = (props) => {
    let spincount = 0
    let pacecount = 0
    Object.entries(props.data).forEach(element => {
        if(element[1]['out or not'] == "Out"){            
            if(element[1]['bowlingType'] == "Spin"){
                spincount += 1
            }
            if(element[1]['bowlingType'] == "Pace"){
                pacecount += 1
            }
        }
    });    
    
  const data = [
    ['Task', 'Wicket loss Against'],
    ['Pace', pacecount],
    ['Spin', spincount],
  ];

  const options = {
    title: 'Wickets loss Against bowling action',
  };

  return (
    <div>
      <h2>My Performance</h2>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={'400px'}
        height={'300px'}
        legendToggle
      />
    </div>
  );
};

export default GooglePieChart;
