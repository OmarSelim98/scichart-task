import { useEffect } from 'react';
import { SciChartSurface, NumericAxis, XyDataSeries, FastLineRenderableSeries, ZoomPanModifier, XyScatterRenderableSeries, EllipsePointMarker, LineAnnotation, ECoordinateMode } from 'scichart';
import { TangentModifier } from '../Modifiers/TangentModifier';
import { XyDataType } from '../Utils/types';

export default function CustomChart({scatterValues, lineValues}:{scatterValues:XyDataType, lineValues:XyDataType}) {
    async function initSciChart() {
        const { sciChartSurface, wasmContext } = await SciChartSurface.create("custom-chart");
        const xAxis = new NumericAxis(wasmContext);
        const yAxis = new NumericAxis(wasmContext);
        sciChartSurface.xAxes.add(xAxis);
        sciChartSurface.yAxes.add(yAxis);
        //Scatter Series config
        const ellipseMarker = new EllipsePointMarker(wasmContext, {
            width: 7,
            height: 7,
            strokeThickness: 1,
            fill: "red",
            stroke: "DarkRed",
        });
        const scatterSeries = new XyScatterRenderableSeries(wasmContext,
            {
                dataSeries: new XyDataSeries(wasmContext, scatterValues),
                pointMarker: ellipseMarker
            }
        );
        console.log(lineValues);
        const lineSeries = new FastLineRenderableSeries(wasmContext,{
            dataSeries: new XyDataSeries(wasmContext,lineValues),
            stroke: "rgba(255,255,255,1)",
            strokeThickness: 3,
        });
        
        sciChartSurface.renderableSeries.add(lineSeries);
        sciChartSurface.renderableSeries.add(scatterSeries);
        sciChartSurface.chartModifiers.add(new TangentModifier());
    }

    useEffect(() => {
        initSciChart();
    })

    return (<div id="custom-chart" style={{ width: 600, margin: "auto" }}></div>)
}