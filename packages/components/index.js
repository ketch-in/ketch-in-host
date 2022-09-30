// import "./assets/styles/index.css";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./components/Modal", "./components/SelectModal", "./components/Toast", "./components/Toolbar"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToolbarController = exports.ToastController = exports.SelectModalController = exports.ModalController = void 0;
    var Modal_1 = require("./components/Modal");
    Object.defineProperty(exports, "ModalController", { enumerable: true, get: function () { return __importDefault(Modal_1).default; } });
    var SelectModal_1 = require("./components/SelectModal");
    Object.defineProperty(exports, "SelectModalController", { enumerable: true, get: function () { return __importDefault(SelectModal_1).default; } });
    var Toast_1 = require("./components/Toast");
    Object.defineProperty(exports, "ToastController", { enumerable: true, get: function () { return __importDefault(Toast_1).default; } });
    var Toolbar_1 = require("./components/Toolbar");
    Object.defineProperty(exports, "ToolbarController", { enumerable: true, get: function () { return __importDefault(Toolbar_1).default; } });
});
//# sourceMappingURL=index.js.map