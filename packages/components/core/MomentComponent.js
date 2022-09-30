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
    class MomentComponent extends PureComponent_1.default {
        constructor({ data, removeDelay, defaultClassName, momentDelay = 2000, }) {
            super({ data, removeDelay, defaultClassName });
            this.momentDelay = momentDelay;
            this.momentTimeout = null;
        }
        setMomentTimeout(momentTimeout) {
            this.momentTimeout = momentTimeout;
            return this;
        }
        mount(target) {
            const _super = Object.create(null, {
                mount: { get: () => super.mount }
            });
            return __awaiter(this, void 0, void 0, function* () {
                return _super.mount.call(this, target)
                    .then(() => this.setMomentTimeout(window.setTimeout(() => this.unmount(), this.momentDelay)));
            });
        }
        unmount() {
            if (this.momentTimeout) {
                clearTimeout(this.momentTimeout);
                this.setMomentTimeout(null);
            }
            return super.unmount();
        }
    }
    exports.default = MomentComponent;
});
//# sourceMappingURL=MomentComponent.js.map