declare type State = "mount" | "unmount" | "unmounting";
export interface PureComponentProps {
    data?: unknown;
    modalWidth?: number;
    removeDelay?: number;
    defaultClassName?: string;
}
export default class PureComponent {
    private data?;
    private state;
    private element;
    private defaultClassName;
    private modalWidth;
    constructor({ data, defaultClassName, modalWidth, }: PureComponentProps);
    protected createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
    protected createSVGElement(width: number, height: number): SVGSVGElement;
    getData(): unknown;
    private setState;
    protected getState(): State;
    protected getElement(): HTMLElement;
    protected getWidth(): number;
    protected isMount(): boolean;
    protected isUnmount(): boolean;
    protected isUnmounting(): boolean;
    protected clear(): Promise<this>;
    protected mount(target: HTMLElement): Promise<this>;
    protected unmounting(): void;
    protected unmount(): Promise<this>;
}
export {};
