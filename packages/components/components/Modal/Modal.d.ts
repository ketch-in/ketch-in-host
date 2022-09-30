import { PureComponentProps } from "../../core/PureComponent";
import OverlayComponent from "../../core/OverlayComponent";
export interface ModalComponentProps extends PureComponentProps {
    children: HTMLElement;
    onClose?: (item: OverlayComponent) => number | void;
}
export default class ModalComponent extends OverlayComponent {
    private children;
    private onClose;
    constructor({ children, modalWidth, data, onClose, }: ModalComponentProps);
    mount(target: HTMLElement): Promise<this>;
}
