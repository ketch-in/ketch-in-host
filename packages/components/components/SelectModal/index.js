var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../core/PureController", "./SelectModal"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PureController_1 = __importDefault(require("../../core/PureController"));
    const SelectModal_1 = __importDefault(require("./SelectModal"));
    class SelectModalController extends PureController_1.default {
        constructor(targetEl, options) {
            super(targetEl, options);
        }
        add(props) {
            return new SelectModal_1.default(Object.assign(Object.assign({}, props), { modalWidth: this.getOption("modalWidth"), removeDelay: this.getOption("removeDelay") })).mount(this.target);
        }
    }
    exports.default = SelectModalController;
});
//# sourceMappingURL=index.js.map