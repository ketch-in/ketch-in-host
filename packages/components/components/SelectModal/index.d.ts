import PureController, { PureControllerOptions } from "../../core/PureController";
import SelectModalComponent, { SelectModalComponentProps } from "./SelectModal";
export default class SelectModalController extends PureController {
    constructor(targetEl: Element, options: PureControllerOptions);
    add(props: SelectModalComponentProps): Promise<SelectModalComponent>;
}
