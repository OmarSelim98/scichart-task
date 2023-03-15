import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InitialChart from './Components/initial-chart';
import CustomChart from './Components/custom-chart';
import { XyDataType } from './Utils/types';

function App() {
  const xValues: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15];
  const yValues: number[] = [
    0,
    0.8414709848078965,
    0.9092974268256817,
    0.1411200080598672,
    -0.7568024953079282,
    -0.9589242746631385,
    -0.27941549819892586,
    0.6569865987187891,
    0.9893582466233818,
    0.4121184852417566,
    -0.5440211108893699,
    -0.9999902065507035,
    -0.5365729180004349,
    0.4201670368266409,
    0.9906073556948704,
    0.6502878401571169
  ];
  const [interpolated, setInterpolated] = useState(false);
  const [lineValues, setLineValues] = useState({ xValues: xValues, yValues: yValues });
  const [scatterValues, setScatterValues] = useState({ xValues: xValues, yValues: yValues });
  //assuming that the xValues array are sorted.
  const interpolate: (xVal: number) => number = (xVal: number) => {
    let lowIndex: number = xValues[0];
    let highIndex: number = xValues[xValues.length - 1];
    //check if xVal is in the range of xValues
    if (xVal < xValues[0] || xVal > xValues[xValues.length - 1]) {
      return 0;
    }
    //if xValue is already a value in the array, return its corresponding y value.
    if (xValues.indexOf(xVal) != -1) {
      return yValues[xValues.indexOf(xVal)];
    }
    //if xVal is within the range of the xValues array,
    //loop throught the array and find the two points around it.
    for (let i = 0; i < xValues.length; i++) {
      if (xVal < xValues[i]) {
        lowIndex = i - 1;
        highIndex = i;
        break;
      }
    }
    let x1: number = xValues[lowIndex];
    let x2: number = xValues[highIndex];
    let y1: number = yValues[lowIndex];
    let y2: number = yValues[highIndex];
    //interpolate between the two points.
    let interpolatedY: number = y1 + (((xVal - x1) * (y2 - y1)) / (x2 - x1));

    return interpolatedY;
  };
  const prepareLineInterpolation = () => {
    let step = 10;
    let tempXvalues: number[] = [];
    let tempYvalues: number[] = [];
    for (let i = 0; i < lineValues.xValues.length - 1; i++) {
      // interpolate with a step between each two points
      let x1 = lineValues.xValues[i];
      let x2 = lineValues.xValues[i + 1];
      let factor = (x2 - x1) / step;

      tempXvalues.push(x1);
      tempYvalues.push(lineValues.yValues[i]);

      for (let j = 0; j < step - 1; j++) {
        let newXVal = x1 + factor * (j + 1);
        tempXvalues.push(newXVal);
        tempYvalues.push(interpolate(newXVal));
      }
    }
    setInterpolated(true);
    tempXvalues.push(lineValues.xValues[lineValues.xValues.length - 1]);
    tempYvalues.push(lineValues.yValues[lineValues.yValues.length - 1]);
    
    setLineValues({xValues:tempXvalues,yValues:tempYvalues});
    
  };
  useEffect(() => {
    if(!interpolated){
      prepareLineInterpolation();
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <CustomChart scatterValues={scatterValues} lineValues={lineValues} />
      </header>
    </div>
  );
}

export default App;
