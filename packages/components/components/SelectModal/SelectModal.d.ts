import { PureComponentProps } from "../../core/PureComponent";
import OverlayComponent from "../../core/OverlayComponent";
interface SelectModalButtonsInterface {
    [id: string]: string;
}
export interface SelectModalComponentProps extends PureComponentProps {
    children: HTMLElement;
    buttons: SelectModalButtonsInterface;
    onClick?: (item: SelectModalComponent, id: string, label: string) => void;
    onClose?: (item: SelectModalComponent) => number | void;
}
export default class SelectModalComponent extends OverlayComponent {
    private children;
    private buttons;
    private onClose;
    private onClick;
    constructor({ children, buttons, modalWidth, data, onClick, onClose, }: SelectModalComponentProps);
    private click;
    mount(target: HTMLElement): Promise<this>;
}
export {};
