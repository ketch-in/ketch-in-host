var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const utils_1 = require("../utils");
    class PureComponent {
        constructor({ data, defaultClassName, modalWidth = 200, }) {
            this.data = data;
            this.state = "unmount";
            this.defaultClassName = defaultClassName || "";
            this.modalWidth = modalWidth;
            this.element = this.createElement("div");
            this.element.classList.add("container");
        }
        createElement(tagName, options) {
            const el = (0, utils_1.createElement)(tagName, options);
            el.classList.add(this.defaultClassName);
            return el;
        }
        createSVGElement(width, height) {
            const xmlns = "http://www.w3.org/2000/svg";
            const el = document.createElementNS(xmlns, 'svg');
            el.setAttribute('width', width.toString());
            el.setAttribute('height', height.toString());
            el.classList.add(this.defaultClassName);
            return el;
        }
        getData() {
            return this.data;
        }
        setState(state) {
            this.state = state;
            if (this.isUnmounting()) {
                this.element.classList.add("unmount");
            }
            else {
                this.element.classList.remove("unmount");
            }
            return this;
        }
        getState() {
            return this.state;
        }
        getElement() {
            return this.element;
        }
        getWidth() {
            return this.modalWidth;
        }
        isMount() {
            return this.getState() === "mount";
        }
        isUnmount() {
            return this.getState() === "unmount";
        }
        isUnmounting() {
            return this.getState() === "unmounting";
        }
        clear() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.isUnmount()) {
                    yield this.unmount();
                }
                return this;
            });
        }
        mount(target) {
            return __awaiter(this, void 0, void 0, function* () {
                target.append(this.element);
                return this.setState("mount");
            });
        }
        unmounting() {
            this.setState("unmounting");
        }
        unmount() {
            return __awaiter(this, void 0, void 0, function* () {
                this.element.remove();
                this.setState("unmount");
                return yield this.clear();
            });
        }
    }
    exports.default = PureComponent;
});
//# sourceMappingURL=PureComponent.js.map