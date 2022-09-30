import PureComponent, { PureComponentProps } from "../../core/PureComponent";
import { Shape } from "../../layers/shape-list/ShapeList";
export interface ToolbarComponentProps extends PureComponentProps {
    status: string;
    handlePen: () => void;
    handleShape: (selectedShape: Shape) => void;
    handleColor: (selectedColor: string) => void;
    onClear: () => void;
}
export default class ToolbarComponent extends PureComponent {
    private status;
    private handlePen;
    private handleShape;
    private handleColor;
    private onClear;
    constructor({ data, status, handlePen, handleShape, handleColor, onClear, }: ToolbarComponentProps);
    createTools(targetEl: HTMLElement): void;
    createHeader(targetEl: HTMLElement): void;
    mount(target: HTMLElement): Promise<this>;
}
