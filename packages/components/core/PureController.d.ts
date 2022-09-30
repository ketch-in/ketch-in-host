export interface PureControllerOptions {
    removeDelay?: number;
    modalWidth?: number;
}
export default class PureController {
    protected target: HTMLElement;
    private options;
    constructor(targetEl: Element, options?: PureControllerOptions, keepContent?: boolean);
    protected getOption(key: keyof PureControllerOptions): number | undefined;
    clear(): void;
}
