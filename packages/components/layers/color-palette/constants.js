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
    exports.COLOR_LIST = exports.WHITE_CODE = exports.BLACK_CODE = void 0;
    exports.BLACK_CODE = '#000000';
    exports.WHITE_CODE = '#FFFFFF';
    exports.COLOR_LIST = [
        exports.BLACK_CODE,
        '#262626',
        '#363636',
        '#555555',
        '#737373',
        '#999999',
        '#B2B2B2',
        '#C7C7C7',
        '#DBDBDB',
        '#EFEFEF',
        exports.WHITE_CODE,
        '#EF848C',
        '#FFDEDE',
        '#FFE3C7',
        '#FFC47B',
        '#CEF3FB',
        '#A3DED0',
        '#EE4753',
        '#FF8C1C',
        '#FFCC51',
        '#70C050',
        '#174A28',
        '#3897F0',
        '#1AA39C',
        '#89C4F4',
        '#1C8BC3',
        '#004E82',
        '#684172',
        '#9B6336',
        '#003960',
        '#1E3993',
        '#5300D2',
        '#740060',
        '#4F0041',
        '#432223',
    ];
});
//# sourceMappingURL=constants.js.map