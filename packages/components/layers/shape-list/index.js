var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../core/PureController", "./ShapeList"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PureController_1 = __importDefault(require("../../core/PureController"));
    const ShapeList_1 = __importDefault(require("./ShapeList"));
    class ShapeListController extends PureController_1.default {
        constructor(targetEl, options) {
            super(targetEl, options, true);
        }
        open(props) {
            this.layer = new ShapeList_1.default(Object.assign(Object.assign({}, props), { removeDelay: 0 }));
            if (this.layer instanceof ShapeList_1.default) {
                this.layer.mount(this.target);
            }
        }
        close() {
            if (this.layer instanceof ShapeList_1.default) {
                this.layer.unmount();
            }
        }
    }
    exports.default = ShapeListController;
});
//# sourceMappingURL=index.js.map