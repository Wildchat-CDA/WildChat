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
exports.RoomService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var RoomService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RoomService = _classThis = /** @class */ (function () {
        function RoomService_1() {
            this._users = [];
            this._channelUUID = (0, uuid_1.v4)(); // UUID fixe pour le canal vocal
        }
        RoomService_1.prototype.addUser = function (peerID) {
            var existingUser = this._users.find(function (user) { return user.peerID === peerID; });
            if (existingUser) {
                return existingUser.uuid;
            }
            var uuid = (0, uuid_1.v4)();
            this._users.push({ uuid: uuid, peerID: peerID });
            return uuid;
        };
        RoomService_1.prototype.removeUser = function (peerID) {
            this._users = this._users.filter(function (user) { return user.peerID !== peerID; });
        };
        Object.defineProperty(RoomService_1.prototype, "users", {
            get: function () {
                return __spreadArray([], this._users, true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RoomService_1.prototype, "channelUUID", {
            get: function () {
                return this._channelUUID;
            },
            enumerable: false,
            configurable: true
        });
        RoomService_1.prototype.getUserByPeerID = function (peerID) {
            return this._users.find(function (user) { return user.peerID === peerID; });
        };
        RoomService_1.prototype.getUserByUUID = function (uuid) {
            return this._users.find(function (user) { return user.uuid === uuid; });
        };
        RoomService_1.prototype.isPeerConnected = function (peerID) {
            return this._users.some(function (user) { return user.peerID === peerID; });
        };
        RoomService_1.prototype.updateUserPeerID = function (uuid, newPeerID) {
            var userIndex = this._users.findIndex(function (user) { return user.uuid === uuid; });
            if (userIndex !== -1) {
                this._users[userIndex].peerID = newPeerID;
                return true;
            }
            return false;
        };
        return RoomService_1;
    }());
    __setFunctionName(_classThis, "RoomService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoomService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoomService = _classThis;
}();
exports.RoomService = RoomService;
