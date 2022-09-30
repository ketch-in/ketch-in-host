import PureController, { PureControllerOptions } from "../../core/PureController";
import ColorPaletteLayer, { ColorPaletteLayerProps } from "./ColorPalette";
export default class ColorPaletteController extends PureController {
    private layer;
    constructor(targetEl: Element, options: PureControllerOptions);
    open(props: ColorPaletteLayerProps): Promise<ColorPaletteLayer> | undefined;
    close(): void;
}
