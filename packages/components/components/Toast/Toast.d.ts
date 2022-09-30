import MomentComponent, { MomentComponentProps } from "../../core/MomentComponent";
export interface ToastComponentProps extends MomentComponentProps {
    children: HTMLElement;
    onClick?: (item: ToastComponent) => void;
    onClose?: (item: ToastComponent, action: boolean) => number | void;
}
export default class ToastComponent extends MomentComponent {
    private children;
    private removeDelay;
    private onClick;
    private onClose;
    constructor({ children, data, removeDelay, momentDelay, onClick, onClose, }: ToastComponentProps);
    protected setRemoveDelay(removeDelay: number): this;
    protected getRemoveDelay(): number;
    mount(target: HTMLElement): Promise<this>;
    unmount(action?: boolean): Promise<this>;
}
