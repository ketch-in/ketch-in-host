import PureController, { PureControllerOptions } from "../../core/PureController";
import ToastComponent, { ToastComponentProps } from "./Toast";
export default class ToastController extends PureController {
    constructor(targetEl: Element, options: PureControllerOptions);
    add(props: ToastComponentProps): Promise<ToastComponent>;
}
