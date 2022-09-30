var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../core/PureController", "./Toolbar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PureController_1 = __importDefault(require("../../core/PureController"));
    const Toolbar_1 = __importDefault(require("./Toolbar"));
    class ToolbarController extends PureController_1.default {
        constructor(targetEl, options) {
            super(targetEl, options);
        }
        add(props) {
            return new Toolbar_1.default(props).mount(this.target);
        }
    }
    exports.default = ToolbarController;
});
//# sourceMappingURL=index.js.map