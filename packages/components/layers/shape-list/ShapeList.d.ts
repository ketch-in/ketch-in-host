import PureComponent, { PureComponentProps } from "../../core/PureComponent";
export interface Shape {
    type: string;
    svg: string;
}
export interface ShapeListLayerProps extends PureComponentProps {
    onShapeSelect: (selectedShape: Shape) => void;
}
export default class ShapeListLayer extends PureComponent {
    private onShapeSelect;
    constructor({ removeDelay, onShapeSelect, }: ShapeListLayerProps);
    mount(target: HTMLElement): Promise<this>;
    unmount(): Promise<this>;
    onClose(): void;
}
