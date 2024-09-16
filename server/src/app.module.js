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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var typeorm_1 = require("@nestjs/typeorm");
var role_entity_1 = require("./entity/role.entity");
var user_entity_1 = require("./entity/user.entity");
var section_entity_1 = require("./entity/section.entity");
var channel_entity_1 = require("./entity/channel.entity");
var type_entity_1 = require("./entity/type.entity");
var config_entity_1 = require("./entity/config.entity");
var config_1 = require("@nestjs/config");
var section_controller_1 = require("./controller/section.controller");
var channel_controller_1 = require("./controller/channel.controller");
var section_service_1 = require("./service/section.service");
var channel_service_1 = require("./service/channel.service");
var type_controller_1 = require("./controller/type.controller");
var type_service_1 = require("./service/type.service");
var config_controller_1 = require("./controller/config.controller");
var config_service_1 = require("./service/config.service");
var ChatGateway_1 = require("./service/ChatGateway");
var redis_service_1 = require("./service/redis.service");
var redis_controller_1 = require("./controller/redis.controller");
var RaisedHands_controller_1 = require("./controller/RaisedHands.controller");
var room_controller_1 = require("./controller/room.controller");
var room_service_1 = require("./service/room.service");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT, 10),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    entities: [role_entity_1.Role, user_entity_1.User, section_entity_1.Section, channel_entity_1.Channel, type_entity_1.Type, config_entity_1.Config],
                    synchronize: true,
                }),
                typeorm_1.TypeOrmModule.forFeature([section_entity_1.Section, channel_entity_1.Channel, type_entity_1.Type, config_entity_1.Config]),
            ],
            controllers: [
                app_controller_1.AppController,
                redis_controller_1.RedisController,
                section_controller_1.SectionController,
                channel_controller_1.ChannelController,
                type_controller_1.TypeController,
                config_controller_1.ConfigController,
                redis_controller_1.RedisController,
                RaisedHands_controller_1.RaisedHandsController,
                room_controller_1.RoomController,
            ],
            providers: [
                app_service_1.AppService,
                ChatGateway_1.ChatGateway,
                redis_service_1.RedisService,
                section_service_1.SectionService,
                channel_service_1.ChannelService,
                type_service_1.TypeService,
                config_service_1.ConfigService,
                ChatGateway_1.ChatGateway,
                redis_service_1.RedisService,
                room_service_1.RoomService
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
