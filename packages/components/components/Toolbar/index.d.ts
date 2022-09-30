import PureController, { PureControllerOptions } from "../../core/PureController";
import ToolbarComponent, { ToolbarComponentProps } from "./Toolbar";
export default class ToolbarController extends PureController {
    constructor(targetEl: Element, options: PureControllerOptions);
    add(props: ToolbarComponentProps): Promise<ToolbarComponent>;
}
