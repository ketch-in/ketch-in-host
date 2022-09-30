import PureComponent, { PureComponentProps } from "./PureComponent";
export interface MomentComponentProps extends PureComponentProps {
    momentDelay?: number;
}
export default class MomentComponent extends PureComponent {
    private momentDelay;
    private momentTimeout;
    constructor({ data, removeDelay, defaultClassName, momentDelay, }: MomentComponentProps);
    private setMomentTimeout;
    mount(target: HTMLElement): Promise<this>;
    protected unmount(): Promise<this>;
}
