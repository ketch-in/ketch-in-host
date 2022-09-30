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
    exports.SHAPE_SVG_CODES = exports.SHAPE_LABEL = void 0;
    var SHAPE_LABEL;
    (function (SHAPE_LABEL) {
        SHAPE_LABEL["RECT"] = "rect";
        SHAPE_LABEL["ROUNDED_RECT"] = "rounded-rect";
        SHAPE_LABEL["CIRCLE"] = "circle";
        SHAPE_LABEL["ELLIPSE"] = "triangle";
    })(SHAPE_LABEL = exports.SHAPE_LABEL || (exports.SHAPE_LABEL = {}));
    exports.SHAPE_SVG_CODES = {
        [SHAPE_LABEL.RECT]: `<rect x='5' y='5' width='20' height='20' fill='none' stroke='grey' />`,
        [SHAPE_LABEL.ROUNDED_RECT]: `<rect x='5' y='5' rx='4' width='20' height='20' fill='none' stroke='grey' />`,
        [SHAPE_LABEL.CIRCLE]: `<circle cx='15' cy='15' r='10' fill='none' stroke='grey' />`,
        [SHAPE_LABEL.ELLIPSE]: `<ellipse cx='15' cy='16' rx='12' ry='8' fill='none' stroke='grey' />`,
    };
});
//# sourceMappingURL=constants.js.map