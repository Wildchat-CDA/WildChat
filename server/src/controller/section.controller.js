"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionController = void 0;
var common_1 = require("@nestjs/common");
var SectionController = function () {
    var _classDecorators = [(0, common_1.Controller)('/section')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _addSection_decorators;
    var _createSectionWithChannels_decorators;
    var _createChannelInTopic_decorators;
    var _editChannelInSection_decorators;
    var _createClassRoomWithChannels_decorators;
    var _findAllTopicAndSection_decorators;
    var SectionController = _classThis = /** @class */ (function () {
        function SectionController_1(sectionService) {
            this.sectionService = (__runInitializers(this, _instanceExtraInitializers), sectionService);
        }
        SectionController_1.prototype.create = function (section) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sectionService.create(section)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        SectionController_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sectionService.findAll()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        SectionController_1.prototype.addSection = function (channelId, sectionId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.sectionService.addSection(channelId, sectionId)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_1 = _a.sent();
                            throw new common_1.NotFoundException(error_1.message);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        SectionController_1.prototype.createSectionWithChannels = function (section) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sectionService.createSectionWithChannels(section)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        SectionController_1.prototype.createChannelInTopic = function (sectionId, channel) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.sectionService.createChannelIntopic(sectionId, channel)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_2 = _a.sent();
                            throw new common_1.NotFoundException(error_2.message);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        SectionController_1.prototype.editChannelInSection = function (sectionId, channelId, newTitle, newSlot) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.sectionService.editChannelInSection(sectionId, channelId, newTitle, newSlot)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_3 = _a.sent();
                            throw new common_1.NotFoundException(error_3.message);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        SectionController_1.prototype.createClassRoomWithChannels = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sectionService.createClassRoomWithChannels()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        SectionController_1.prototype.findAllTopicAndSection = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sectionService.findAllTopicAndSection()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return SectionController_1;
    }());
    __setFunctionName(_classThis, "SectionController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('/')];
        _findAll_decorators = [(0, common_1.Get)('/')];
        _addSection_decorators = [(0, common_1.Put)('/:sectionId/channel/:channelId')];
        _createSectionWithChannels_decorators = [(0, common_1.Post)('/topic')];
        _createChannelInTopic_decorators = [(0, common_1.Post)('/:sectionId/topic/channel')];
        _editChannelInSection_decorators = [(0, common_1.Put)('/:sectionId/topic/channel/:channelId')];
        _createClassRoomWithChannels_decorators = [(0, common_1.Post)('/classRoom')];
        _findAllTopicAndSection_decorators = [(0, common_1.Get)('/topic')];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addSection_decorators, { kind: "method", name: "addSection", static: false, private: false, access: { has: function (obj) { return "addSection" in obj; }, get: function (obj) { return obj.addSection; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createSectionWithChannels_decorators, { kind: "method", name: "createSectionWithChannels", static: false, private: false, access: { has: function (obj) { return "createSectionWithChannels" in obj; }, get: function (obj) { return obj.createSectionWithChannels; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createChannelInTopic_decorators, { kind: "method", name: "createChannelInTopic", static: false, private: false, access: { has: function (obj) { return "createChannelInTopic" in obj; }, get: function (obj) { return obj.createChannelInTopic; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _editChannelInSection_decorators, { kind: "method", name: "editChannelInSection", static: false, private: false, access: { has: function (obj) { return "editChannelInSection" in obj; }, get: function (obj) { return obj.editChannelInSection; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createClassRoomWithChannels_decorators, { kind: "method", name: "createClassRoomWithChannels", static: false, private: false, access: { has: function (obj) { return "createClassRoomWithChannels" in obj; }, get: function (obj) { return obj.createClassRoomWithChannels; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllTopicAndSection_decorators, { kind: "method", name: "findAllTopicAndSection", static: false, private: false, access: { has: function (obj) { return "findAllTopicAndSection" in obj; }, get: function (obj) { return obj.findAllTopicAndSection; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SectionController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SectionController = _classThis;
}();
exports.SectionController = SectionController;
