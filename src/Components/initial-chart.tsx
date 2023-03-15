import { useEffect } from 'react';
import{SciChartSurface, NumericAxis, XyDataSeries, FastLineRenderableSeries, ZoomPanModifier} from 'scichart';

export default function InitialChart ({xValues,yValues}:{xValues:number[], yValues:number[]}){
    async function initSciChart() {
        SciChartSurface.setRuntimeLicenseKey("Ujj4V4EhNpGd/JfVwF0n7McnxxelK7BqbuU987JY9QBxzA8z6zLhQi2MxTUmKnVRgywLzoGgGinxyjuz4Ps/UvSpK+dFRyszarloJISDiQp1lhYzLlNXRtjuu7Rk1G774gFSycnu+hlH5iyNo8MemWWD1W8jcDn5t2bfMvKV+5DhoHamg/94jteUDZ4HH/OZaxtb1rJqyCke0nzuSiEpQ/ytfAb9/1i5cfynFb4lS/cubD+xLIf1D6iKHOkTu5VRDYjX1rXb/gyZQTNBQuNFI+8XltCyRyHALkCjFP/Jq9REqWCS1nwG0ejVPDX05UkOXzw5N9cAMwiol5gOOKJj9FJaYblLW+KXG1EON5YgPjHU5ON3Uo93QXU+zA5+wDSI0pIuITbBrVvIuMkKYAxmHuSlRiupHQeDNS66uQoWRZjgHmhP+bBv+kgDav9WpTQYcuQVCOmRr5qxEE9Mbp4KLIpvytGWMGPi8+DBa7Ayylq0tCXln3jTfgtZ/7lEUw6QOejdq8gp+MrosZbIdOGwYWCCKq5gN3eGud/kcOrxQAVi8v4NzaO9Vj+aFjJZGc2O");
        const {sciChartSurface, wasmContext} = await SciChartSurface.create("scichart-root");
        const xAxis = new NumericAxis(wasmContext);
        const yAxis = new NumericAxis(wasmContext);
        sciChartSurface.xAxes.add(xAxis);
        sciChartSurface.yAxes.add(yAxis);
        const data = {
            xValues:xValues,
            yValues:yValues
        }
        const lineSeries = new FastLineRenderableSeries(wasmContext);
        lineSeries.strokeThickness = 3;
        lineSeries.stroke = "rgba(255,0,0,1)";
        lineSeries.dataSeries = new XyDataSeries(wasmContext, data);
        sciChartSurface.renderableSeries.add(lineSeries);

        sciChartSurface.chartModifiers.add(new ZoomPanModifier());
    }
    
    useEffect(()=>{
        initSciChart();
    },[])
    
    return (<div id="scichart-root" style={{ width: 600, margin: "auto" }}></div>)
}