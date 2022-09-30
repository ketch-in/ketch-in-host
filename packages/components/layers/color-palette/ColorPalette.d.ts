import PureComponent, { PureComponentProps } from "../../core/PureComponent";
export interface ColorPaletteLayerProps extends PureComponentProps {
    onColorSelect: (selectedColor: string) => void;
}
export default class ColorPaletteLayer extends PureComponent {
    private onColorSelect;
    constructor({ removeDelay, onColorSelect, }: ColorPaletteLayerProps);
    mount(target: HTMLElement): Promise<this>;
    unMount(): void;
    onClose(): void;
}
