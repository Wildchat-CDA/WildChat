"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
var redis_1 = require("redis");
var common_1 = require("@nestjs/common");
var RedisService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RedisService = _classThis = /** @class */ (function () {
        function RedisService_1() {
            var _this = this;
            (0, redis_1.createClient)()
                .on('error', function (err) {
                console.error('Redis connection error:', err);
                throw new common_1.InternalServerErrorException('Failed to connect to Redis');
            })
                .connect()
                .then(function (client) {
                _this._client = client;
                console.log('Redis connection initialized');
            })
                .catch(function (err) {
                console.error('Redis connection failed:', err);
                throw new common_1.InternalServerErrorException('Failed to initialize Redis connection');
            });
        }
        Object.defineProperty(RedisService_1.prototype, "client", {
            get: function () {
                return this._client;
            },
            enumerable: false,
            configurable: true
        });
        RedisService_1.prototype.getMessages = function (roomId) {
            return __awaiter(this, void 0, void 0, function () {
                var messages, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._client.lRange("room:".concat(roomId), 0, -1)];
                        case 1:
                            messages = _a.sent();
                            return [2 /*return*/, messages.map(function (msg) {
                                    var _a = msg.split(' : '), name = _a[0], message = _a[1];
                                    return { name: name, message: message, roomId: parseInt(roomId, 10) };
                                })];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Failed to get messages:', error_1);
                            throw new common_1.InternalServerErrorException('Failed to retrieve messages from Redis');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.postMessage = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (data.message.length === 0) {
                                throw new Error('The message cannot be empty. Please enter some text before submitting.');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.rPush("room:".concat(data.roomId), "".concat(data.name, " : ").concat(data.message))];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Failed to post message:', error_2);
                            throw new common_1.InternalServerErrorException('Failed to post message to Redis');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.updateMessage = function (data, roomId) {
            return __awaiter(this, void 0, void 0, function () {
                var currentMessages, updatedMessage, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this._client.lRange("room:".concat(roomId), 0, -1)];
                        case 1:
                            currentMessages = _a.sent();
                            if (data.index < 0 || data.index >= currentMessages.length) {
                                throw new Error('Index out of range');
                            }
                            if (data.message.length === 0) {
                                throw new Error('The message cannot be empty. Please enter some text before submitting.');
                            }
                            updatedMessage = "".concat(data.name, " : ").concat(data.message);
                            return [4 /*yield*/, this._client.lSet("room:".concat(roomId), data.index, updatedMessage)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            console.error('Failed to update message:', error_3);
                            throw new common_1.InternalServerErrorException('Failed to update message in Redis');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.deleteMessage = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var currentMessages, uniqueValue, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this._client.lRange("room:".concat(data.roomId), 0, -1)];
                        case 1:
                            currentMessages = _a.sent();
                            if (data.index < 0 || data.index >= currentMessages.length) {
                                throw new Error('Index out of range');
                            }
                            uniqueValue = '__DELETE__';
                            return [4 /*yield*/, this._client.lSet("room:".concat(data.roomId), data.index, uniqueValue)];
                        case 2:
                            _a.sent();
                            // Remove the unique value from the list
                            return [4 /*yield*/, this._client.lRem("room:".concat(data.roomId), 1, uniqueValue)];
                        case 3:
                            // Remove the unique value from the list
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_4 = _a.sent();
                            console.error('Failed to delete message:', error_4);
                            throw new common_1.InternalServerErrorException('Failed to delete message from Redis');
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.raiseHand = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = "raisedHands:".concat(data.type);
                            return [4 /*yield*/, this._client.hSet(key, data.userId.toString(), JSON.stringify({
                                    userName: data.userName,
                                    table: data.table,
                                    timestamp: Date.now(),
                                }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.lowerHand = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = "raisedHands:".concat(data.type);
                            return [4 /*yield*/, this._client.hDel(key, data.userId.toString())];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.getRaisedHands = function () {
            return __awaiter(this, void 0, void 0, function () {
                var selfHands, tableHands, formatHands;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._client.hGetAll('raisedHands:self')];
                        case 1:
                            selfHands = _a.sent();
                            return [4 /*yield*/, this._client.hGetAll('raisedHands:table')];
                        case 2:
                            tableHands = _a.sent();
                            formatHands = function (hands, type) {
                                return Object.entries(hands).map(function (_a) {
                                    var userId = _a[0], data = _a[1];
                                    return (__assign({ userId: parseInt(userId), type: type }, JSON.parse(data)));
                                });
                            };
                            return [2 /*return*/, __spreadArray(__spreadArray([], formatHands(selfHands, 'self'), true), formatHands(tableHands, 'table'), true)];
                    }
                });
            });
        };
        return RedisService_1;
    }());
    __setFunctionName(_classThis, "RedisService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RedisService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RedisService = _classThis;
}();
exports.RedisService = RedisService;
