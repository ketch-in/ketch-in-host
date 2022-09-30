import PureComponent, { PureComponentProps } from "./PureComponent";
export default class OverlayComponent extends PureComponent {
    private overlay;
    constructor({ data, defaultClassName, }: PureComponentProps);
    protected getOverlay(): HTMLDivElement;
    protected existModal(): boolean;
    protected createOverlay(): HTMLDivElement;
    mount(target: HTMLElement): Promise<this>;
    protected unmount(): Promise<this>;
}
