import PureController, { PureControllerOptions } from "../../core/PureController";
import { ShapeListLayerProps } from "./ShapeList";
export default class ShapeListController extends PureController {
    private layer;
    constructor(targetEl: Element, options: PureControllerOptions);
    open(props: ShapeListLayerProps): void;
    close(): void;
}
