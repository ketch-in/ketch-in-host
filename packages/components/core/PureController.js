(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DEFAULT_PURE_CONTROLLER_OPTIONS = {
        removeDelay: 2000,
        modalWidth: 200,
    };
    class PureController {
        constructor(targetEl, options, keepContent = false) {
            this.target = targetEl;
            this.options = options || {};
            !keepContent && this.clear();
        }
        getOption(key) {
            return this.options[key] || DEFAULT_PURE_CONTROLLER_OPTIONS[key];
        }
        clear() {
            this.target.innerText = "";
        }
    }
    exports.default = PureController;
});
//# sourceMappingURL=PureController.js.map