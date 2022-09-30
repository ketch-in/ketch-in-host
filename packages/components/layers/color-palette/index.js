var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../core/PureController", "./ColorPalette"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PureController_1 = __importDefault(require("../../core/PureController"));
    const ColorPalette_1 = __importDefault(require("./ColorPalette"));
    class ColorPaletteController extends PureController_1.default {
        constructor(targetEl, options) {
            super(targetEl, options, true);
        }
        open(props) {
            this.layer = new ColorPalette_1.default(Object.assign(Object.assign({}, props), { removeDelay: 0 }));
            if (this.layer instanceof ColorPalette_1.default) {
                return this.layer.mount(this.target);
            }
            return;
        }
        close() {
            if (this.layer instanceof ColorPalette_1.default) {
                return this.layer.unMount();
            }
        }
    }
    exports.default = ColorPaletteController;
});
//# sourceMappingURL=index.js.map