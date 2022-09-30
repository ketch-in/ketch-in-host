import PureController, { PureControllerOptions } from "../../core/PureController";
import ModalComponent, { ModalComponentProps } from "./Modal";
export default class ModalController extends PureController {
    constructor(targetEl: Element, options: PureControllerOptions);
    add(props: ModalComponentProps): Promise<ModalComponent>;
}
