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
    class SelectModalComponent extends OverlayComponent_1.default {
        constructor({ children, buttons, modalWidth, data = {}, onClick = () => { }, onClose = () => { }, }) {
            super({ data, modalWidth, defaultClassName: "select-modal" });
            this.children = children;
            this.buttons = buttons;
            this.onClick = (item, id, label) => {
                onClick(item, id, label);
                return this;
            };
            this.onClose = () => onClose(this);
        }
        click(id) {
            const _super = Object.create(null, {
                unmount: { get: () => super.unmount }
            });
            return __awaiter(this, void 0, void 0, function* () {
                yield _super.unmount.call(this);
                this.onClick(this, id, this.buttons[id]);
            });
        }
        mount(target) {
            const element = this.getElement();
            const bodyEl = this.createElement("div");
            bodyEl.append(this.children);
            bodyEl.classList.add("body");
            element.style.width = `${this.getWidth()}px`;
            element.appendChild(bodyEl);
            const closeEl = this.createElement("span");
            /** TODO : 닫기 아이콘으로 변경 예정 */
            closeEl.innerText = "닫기";
            closeEl.classList.add("close");
            closeEl.onclick = () => {
                closeEl.onclick = () => { };
                this.unmount().then(this.onClose);
            };
            element.appendChild(closeEl);
            const btnsEl = this.createElement("div");
            btnsEl.classList.add("btns");
            element.appendChild(btnsEl);
            Object.keys(this.buttons).map((id) => {
                const btn = this.createElement("button");
                btn.classList.add(id);
                btn.classList.add("btn");
                btn.innerText = this.buttons[id];
                btn.onclick = () => this.click(id);
                btnsEl.append(btn);
            });
            return super.mount(target);
        }
    }
    exports.default = SelectModalComponent;
});
//# sourceMappingURL=SelectModal.js.map