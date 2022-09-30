var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../core/MomentComponent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const MomentComponent_1 = __importDefault(require("../../core/MomentComponent"));
    class ToastComponent extends MomentComponent_1.default {
        constructor({ children, data = {}, removeDelay = 2000, momentDelay = 2000, onClick = () => { }, onClose = () => { }, }) {
            super({ momentDelay, data, defaultClassName: "toast" });
            this.children = children;
            this.removeDelay = removeDelay;
            this.onClick = onClick;
            this.onClose = (action) => onClose(this, action);
        }
        setRemoveDelay(removeDelay) {
            this.removeDelay = removeDelay;
            return this;
        }
        getRemoveDelay() {
            return this.removeDelay;
        }
        mount(target) {
            const element = this.getElement();
            const bodyEl = this.createElement("div");
            const closeEl = this.createElement("span");
            bodyEl.append(this.children);
            /** TODO : 닫기 아이콘으로 변경 예정 */
            closeEl.innerText = "닫기";
            bodyEl.classList.add("text");
            closeEl.classList.add("close");
            element.appendChild(bodyEl);
            element.appendChild(closeEl);
            element.onclick = (e) => {
                element.onclick = () => { };
                if (e.composedPath().some((target) => target === closeEl)) {
                    return;
                }
                this.unmount(true).then(this.onClick);
            };
            closeEl.onclick = () => {
                closeEl.onclick = () => { };
                this.unmount(true);
            };
            return super.mount(target);
        }
        unmount(action = false) {
            return new Promise((resolve) => {
                if (this.isMount()) {
                    const customDelay = this.onClose(action);
                    const delay = (!!customDelay || customDelay === 0 ? customDelay : this.getRemoveDelay());
                    this.setRemoveDelay(delay);
                }
                else {
                    const interval = setInterval(() => {
                        if (this.isUnmount()) {
                            clearInterval(interval);
                            return resolve(this);
                        }
                    }, 1000);
                }
                this.unmounting();
                setTimeout(() => super.unmount(), this.getRemoveDelay());
            });
        }
    }
    exports.default = ToastComponent;
});
//# sourceMappingURL=Toast.js.map