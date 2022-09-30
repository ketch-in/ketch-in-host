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
    class ColorPaletteLayer extends PureComponent_1.default {
        constructor({ removeDelay, onColorSelect = () => { }, }) {
            super({ removeDelay, defaultClassName: 'toolbar__color-palette' });
            this.onColorSelect = onColorSelect;
        }
        mount(target) {
            var _a;
            const targetEl = this.getElement();
            const wrapperList = this.createElement('ul');
            constants_1.COLOR_LIST.map(color => {
                const item = this.createElement('li');
                const colorBtn = this.createElement('label');
                // TODO: 추후 css 처리
                colorBtn.style.width = '27px';
                colorBtn.style.height = '27px';
                colorBtn.style.display = 'inline-block';
                colorBtn.classList.add('color-unit');
                colorBtn.dataset.color = color;
                colorBtn.style.backgroundColor = color;
                item.classList.add(`btn-${color}`);
                item.appendChild(colorBtn);
                wrapperList.appendChild(item);
            });
            wrapperList.classList.add('wrapper');
            targetEl.appendChild(wrapperList);
            wrapperList.onclick = (event) => {
                const eTarget = event.target;
                if (eTarget.closest('li')) {
                    const curColor = eTarget.dataset.color;
                    if (curColor)
                        this.onColorSelect(curColor);
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
        unMount() {
            this.unmount();
        }
        onClose() {
            document.body.onclick = null;
        }
    }
    exports.default = ColorPaletteLayer;
});
//# sourceMappingURL=ColorPalette.js.map