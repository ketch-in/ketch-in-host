var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../core/PureComponent", "./constants"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const PureComponent_1 = __importDefault(require("../../core/PureComponent"));
    const constants_1 = require("./constants");
    class ShapeListLayer extends PureComponent_1.default {
        constructor({ removeDelay, onShapeSelect = () => { }, }) {
            super({ removeDelay, defaultClassName: 'toolbar__shape-list' });
            this.onShapeSelect = onShapeSelect;
        }
        mount(target) {
            var _a;
            const targetEl = this.getElement();
            const wrapperList = this.createElement('ul');
            Object.entries(constants_1.SHAPE_SVG_CODES).map(([type, svg]) => {
                const item = this.createElement('li');
                const shapeBtn = this.createSVGElement(40, 40);
                // shapeBtn.style.backgroundColor = '#EEE';
                shapeBtn.style.borderRadius = '4px';
                shapeBtn.innerHTML = svg;
                shapeBtn.dataset.shape = type;
                item.classList.add(`btn-${type}`);
                item.appendChild(shapeBtn);
                wrapperList.appendChild(item);
            });
            wrapperList.classList.add('wrapper');
            targetEl.appendChild(wrapperList);
            wrapperList.onclick = (event) => {
                event.stopPropagation();
                const eTarget = event.target;
                if (eTarget.closest('li')) {
                    const curShape = eTarget.dataset.shape;
                    if (curShape)
                        this.onShapeSelect({ type: curShape, svg: constants_1.SHAPE_SVG_CODES[curShape] });
                    this.unmount();
                }
            };
            (_a = document.querySelector('.toolbar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', e => {
                const eTarget = e.target;
                if (!eTarget.contains(targetEl)) {
                    this.unmount().then(this.onClose);
                }
            });
            return super.mount(target);
        }
        unmount() {
            return super.unmount();
        }
        onClose() {
        }
    }
    exports.default = ShapeListLayer;
});
//# sourceMappingURL=ShapeList.js.map