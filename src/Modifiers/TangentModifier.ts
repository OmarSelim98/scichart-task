import { ChartModifierBase2D, EChart2DModifierType, IRenderableSeries, LineAnnotation, ModifierMouseArgs, DpiHelper, ECoordinateMode } from "scichart";

export class TangentModifier extends ChartModifierBase2D{
    readonly type: EChart2DModifierType = EChart2DModifierType.Custom;
    private tangentAnnotation:LineAnnotation | undefined;
    private lSeries:IRenderableSeries | undefined;
    override modifierMouseDown(args: ModifierMouseArgs) {
        super.modifierMouseDown(args);
        if(this.tangentAnnotation != undefined){
            this.parentSurface.annotations.remove(this.tangentAnnotation);
        }
        this.lSeries = this.parentSurface?.renderableSeries.asArray()[0];
        let hitX = args.mousePoint.x * DpiHelper.PIXEL_RATIO;
        let hitY = args.mousePoint.y * DpiHelper.PIXEL_RATIO;
        let hitTest = this.lSeries.hitTestProvider.hitTest(hitX, hitY);
        //console.log(this.lSeries.dataSeries.);
        
        this.tangentAnnotation = new LineAnnotation( { x1: hitTest.point2xValue, x2: hitTest.point2xValue, y1: hitTest.point2yValue, y2: 0, stroke: "blue"});
        this.parentSurface.annotations.add(this.tangentAnnotation);
    }
    override modifierMouseLeave(args: ModifierMouseArgs) {
        super.modifierMouseLeave(args);

        
    }
}