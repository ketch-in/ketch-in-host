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
    exports.createElement = void 0;
    const BASE_CLASSNAME = "ketch-in-components";
    function createElement(tagName, options) {
        const el = document.createElement(tagName, options);
        el.className = BASE_CLASSNAME;
        return el;
    }
    exports.createElement = createElement;
});
//# sourceMappingURL=index.js.map