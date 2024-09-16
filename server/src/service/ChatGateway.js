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
exports.ChatGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var ChatGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: true,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleMessage_decorators;
    var _handleRaiseHand_decorators;
    var _handleLowerHand_decorators;
    var _joinChannel_decorators;
    var _leaveChannel_decorators;
    var _requestChannelInfo_decorators;
    var _updatePeerID_decorators;
    var ChatGateway = _classThis = /** @class */ (function () {
        function ChatGateway_1(redisService, roomService) {
            this.redisService = (__runInitializers(this, _instanceExtraInitializers), redisService);
            this.roomService = roomService;
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.socketToPeerMap = (__runInitializers(this, _server_extraInitializers), new Map());
        }
        ChatGateway_1.prototype.afterInit = function () {
            console.log('WebSocket server initialized');
        };
        ChatGateway_1.prototype.handleConnection = function (client) {
            console.log("Client connected: ".concat(client.id));
        };
        ChatGateway_1.prototype.handleDisconnect = function (client) {
            console.log("Client disconnected: ".concat(client.id));
            var peerID = this.socketToPeerMap.get(client.id);
            if (peerID) {
                this.leaveChannel({ peerID: peerID }, client);
                this.socketToPeerMap.delete(client.id);
            }
        };
        ChatGateway_1.prototype.handleMessage = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(data, 'Message received');
                            return [4 /*yield*/, this.redisService.postMessage(data)];
                        case 1:
                            _a.sent();
                            this.server.emit('message', data);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleRaiseHand = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var handRaiseData, raisedHands;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handRaiseData = __assign(__assign({}, data), { timestamp: Date.now() });
                            return [4 /*yield*/, this.redisService.raiseHand(handRaiseData)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.getRaisedHands()];
                        case 2:
                            raisedHands = _a.sent();
                            this.server.emit('raisedHandsUpdate', raisedHands);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleLowerHand = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var raisedHands;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redisService.lowerHand(data)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.getRaisedHands()];
                        case 2:
                            raisedHands = _a.sent();
                            this.server.emit('raisedHandsUpdate', raisedHands);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.joinChannel = function (data, client) {
            console.log("New user joined: PeerID ".concat(data.peerID));
            var userUUID = this.roomService.addUser(data.peerID);
            client.join(this.roomService.channelUUID);
            this.socketToPeerMap.set(client.id, data.peerID);
            this.server.to(this.roomService.channelUUID).emit('user-joined', {
                peerID: data.peerID,
                uuid: userUUID,
                channelUUID: this.roomService.channelUUID,
                users: this.roomService.users,
            });
            return { uuid: userUUID, channelUUID: this.roomService.channelUUID };
        };
        ChatGateway_1.prototype.leaveChannel = function (data, client) {
            console.log("User left: PeerID ".concat(data.peerID));
            var user = this.roomService.getUserByPeerID(data.peerID);
            if (user) {
                this.roomService.removeUser(data.peerID);
                client.leave(this.roomService.channelUUID);
                this.server.to(this.roomService.channelUUID).emit('user-disconnected', {
                    peerID: data.peerID,
                    uuid: user.uuid,
                    users: this.roomService.users,
                });
                this.socketToPeerMap.delete(client.id);
            }
        };
        ChatGateway_1.prototype.requestChannelInfo = function () {
            return {
                channelUUID: this.roomService.channelUUID,
                users: this.roomService.users,
            };
        };
        ChatGateway_1.prototype.updatePeerID = function (data) {
            var user = this.roomService.getUserByPeerID(data.oldPeerID);
            if (user) {
                this.roomService.updateUserPeerID(user.uuid, data.newPeerID);
                this.server.to(this.roomService.channelUUID).emit('peer-id-updated', {
                    oldPeerID: data.oldPeerID,
                    newPeerID: data.newPeerID,
                    uuid: user.uuid,
                });
            }
        };
        return ChatGateway_1;
    }());
    __setFunctionName(_classThis, "ChatGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleMessage_decorators = [(0, websockets_1.SubscribeMessage)('message')];
        _handleRaiseHand_decorators = [(0, websockets_1.SubscribeMessage)('raiseHand')];
        _handleLowerHand_decorators = [(0, websockets_1.SubscribeMessage)('lowerHand')];
        _joinChannel_decorators = [(0, websockets_1.SubscribeMessage)('join-channel')];
        _leaveChannel_decorators = [(0, websockets_1.SubscribeMessage)('leave-channel')];
        _requestChannelInfo_decorators = [(0, websockets_1.SubscribeMessage)('request-channel-info')];
        _updatePeerID_decorators = [(0, websockets_1.SubscribeMessage)('update-peer-id')];
        __esDecorate(_classThis, null, _handleMessage_decorators, { kind: "method", name: "handleMessage", static: false, private: false, access: { has: function (obj) { return "handleMessage" in obj; }, get: function (obj) { return obj.handleMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleRaiseHand_decorators, { kind: "method", name: "handleRaiseHand", static: false, private: false, access: { has: function (obj) { return "handleRaiseHand" in obj; }, get: function (obj) { return obj.handleRaiseHand; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLowerHand_decorators, { kind: "method", name: "handleLowerHand", static: false, private: false, access: { has: function (obj) { return "handleLowerHand" in obj; }, get: function (obj) { return obj.handleLowerHand; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _joinChannel_decorators, { kind: "method", name: "joinChannel", static: false, private: false, access: { has: function (obj) { return "joinChannel" in obj; }, get: function (obj) { return obj.joinChannel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _leaveChannel_decorators, { kind: "method", name: "leaveChannel", static: false, private: false, access: { has: function (obj) { return "leaveChannel" in obj; }, get: function (obj) { return obj.leaveChannel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _requestChannelInfo_decorators, { kind: "method", name: "requestChannelInfo", static: false, private: false, access: { has: function (obj) { return "requestChannelInfo" in obj; }, get: function (obj) { return obj.requestChannelInfo; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePeerID_decorators, { kind: "method", name: "updatePeerID", static: false, private: false, access: { has: function (obj) { return "updatePeerID" in obj; }, get: function (obj) { return obj.updatePeerID; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatGateway = _classThis;
}();
exports.ChatGateway = ChatGateway;
