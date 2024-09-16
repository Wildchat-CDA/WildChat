"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
var typeorm_1 = require("typeorm");
var section_entity_1 = require("./section.entity");
var config_entity_1 = require("./config.entity");
var Channel = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _uuid_decorators;
    var _uuid_initializers = [];
    var _uuid_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _slot_decorators;
    var _slot_initializers = [];
    var _slot_extraInitializers = [];
    var _config_decorators;
    var _config_initializers = [];
    var _config_extraInitializers = [];
    var _sections_decorators;
    var _sections_initializers = [];
    var _sections_extraInitializers = [];
    var Channel = _classThis = /** @class */ (function () {
        function Channel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.uuid = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _uuid_initializers, void 0));
            this.title = (__runInitializers(this, _uuid_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.slot = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _slot_initializers, void 0));
            this.config = (__runInitializers(this, _slot_extraInitializers), __runInitializers(this, _config_initializers, void 0));
            this.sections = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _sections_initializers, void 0));
            __runInitializers(this, _sections_extraInitializers);
        }
        return Channel_1;
    }());
    __setFunctionName(_classThis, "Channel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _uuid_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _title_decorators = [(0, typeorm_1.Column)({ length: 150 })];
        _slot_decorators = [(0, typeorm_1.Column)()];
        _config_decorators = [(0, typeorm_1.OneToOne)(function () { return config_entity_1.Config; }), (0, typeorm_1.JoinColumn)()];
        _sections_decorators = [(0, typeorm_1.ManyToMany)(function () { return section_entity_1.Section; }, function (section) { return section.channels; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _uuid_decorators, { kind: "field", name: "uuid", static: false, private: false, access: { has: function (obj) { return "uuid" in obj; }, get: function (obj) { return obj.uuid; }, set: function (obj, value) { obj.uuid = value; } }, metadata: _metadata }, _uuid_initializers, _uuid_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _slot_decorators, { kind: "field", name: "slot", static: false, private: false, access: { has: function (obj) { return "slot" in obj; }, get: function (obj) { return obj.slot; }, set: function (obj, value) { obj.slot = value; } }, metadata: _metadata }, _slot_initializers, _slot_extraInitializers);
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: function (obj) { return "config" in obj; }, get: function (obj) { return obj.config; }, set: function (obj, value) { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _sections_decorators, { kind: "field", name: "sections", static: false, private: false, access: { has: function (obj) { return "sections" in obj; }, get: function (obj) { return obj.sections; }, set: function (obj, value) { obj.sections = value; } }, metadata: _metadata }, _sections_initializers, _sections_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Channel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Channel = _classThis;
}();
exports.Channel = Channel;
