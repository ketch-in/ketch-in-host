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
        define(["require", "exports", "../../core/OverlayComponent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const OverlayComponent_1 = __importDefault(require("../../core/OverlayComponent"));
    class ModalComponent extends OverlayComponent_1.default {
        constructor({ children, modalWidth, data = {}, onClose = () => { }, }) {
            super({ data, modalWidth, defaultClassName: "modal" });
            this.children = children;
            this.onClose = () => onClose(this);
        }
        mount(target) {
            const element = this.getElement();
            const bodyEl = this.createElement("div");
            bodyEl.append(this.children);
            bodyEl.classList.add("body");
            element.appendChild(bodyEl);
            const closeEl = this.createElement("span");
            /** TODO : 닫기 아이콘으로 변경 예정 */
            closeEl.innerText = "닫기";
            closeEl.classList.add("close");
            closeEl.onclick = () => __awaiter(this, void 0, void 0, function* () {
                yield this.unmount();
                this.onClose();
            });
            element.appendChild(closeEl);
            return super.mount(target);
        }
    }
    exports.default = ModalComponent;
});
//# sourceMappingURL=Modal.js.map