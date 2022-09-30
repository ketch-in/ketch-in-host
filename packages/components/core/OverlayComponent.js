var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./PureComponent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PureComponent_1 = __importDefault(require("./PureComponent"));
    class OverlayComponent extends PureComponent_1.default {
        constructor({ data, defaultClassName, }) {
            super({ data, defaultClassName, removeDelay: 0 });
            const overlay = this.getOverlay();
            this.overlay = overlay;
        }
        getOverlay() {
            const overlay = document.body.querySelector(".ketch-in-overlay");
            return overlay;
        }
        existModal() {
            const modal = document.body.querySelector(".ketch-in-components.select-modal,.ketch-in-components.modal");
            return !!modal;
        }
        createOverlay() {
            const overlayEl = document.createElement("div");
            overlayEl.classList.add("ketch-in-overlay");
            return overlayEl;
        }
        mount(target) {
            const _super = Object.create(null, {
                mount: { get: () => super.mount }
            });
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.overlay) {
                    this.overlay = this.createOverlay();
                    document.body.appendChild(this.overlay);
                }
                const element = this.getElement();
                element.style.width = `${this.getWidth()}px`;
                return _super.mount.call(this, target);
            });
        }
        unmount() {
            const _super = Object.create(null, {
                unmount: { get: () => super.unmount }
            });
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield _super.unmount.call(this);
                if (!this.existModal()) {
                    this.overlay.remove();
                }
                return res;
            });
        }
    }
    exports.default = OverlayComponent;
});
//# sourceMappingURL=OverlayComponent.js.map