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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionService = void 0;
var uuid_1 = require("uuid");
var SectionService = /** @class */ (function () {
    function SectionService(sectionRepository, channelRepository, configRepository, typeRepository) {
        this.sectionRepository = sectionRepository;
        this.channelRepository = channelRepository;
        this.configRepository = configRepository;
        this.typeRepository = typeRepository;
    }
    SectionService.prototype.create = function (section) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sectionRepository.save(section)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SectionService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sectionRepository.find({ relations: ['channels'] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SectionService.prototype.addSection = function (channelId, sectionId) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, section;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.channelRepository.findOneBy({ id: channelId })];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, this.sectionRepository.findOneBy({
                                id: sectionId,
                            })];
                    case 2:
                        section = _a.sent();
                        section.channels = [channel];
                        return [4 /*yield*/, this.sectionRepository.save(section)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SectionService.prototype.createSectionWithChannels = function (sectionData) {
        return __awaiter(this, void 0, void 0, function () {
            var section, channels, newChannels, i, newChannel, newConfig, _a, _b, savedChannel;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.sectionRepository.save(sectionData)];
                    case 1:
                        section = _d.sent();
                        channels = [
                            'Cours',
                            'Exercices',
                            'Ressources formateur',
                            'Ressources élèves',
                        ];
                        newChannels = [];
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < channels.length)) return [3 /*break*/, 7];
                        newChannel = this.channelRepository.create({
                            uuid: (0, uuid_1.v4)(),
                            title: channels[i],
                            slot: 1,
                        });
                        _b = (_a = this.configRepository).create;
                        _c = {
                            maxSlot: 1
                        };
                        return [4 /*yield*/, this.typeRepository.findOneBy({ id: 1 })];
                    case 3:
                        newConfig = _b.apply(_a, [(_c.type = _d.sent(),
                                _c)]);
                        console.log(newConfig, 'nouvelle config');
                        newChannel.config = newConfig;
                        // console.log(newChannel, 'nouveau channel');
                        return [4 /*yield*/, this.configRepository.save(newConfig)];
                    case 4:
                        // console.log(newChannel, 'nouveau channel');
                        _d.sent();
                        return [4 /*yield*/, this.channelRepository.save(newChannel)];
                    case 5:
                        savedChannel = _d.sent();
                        // console.log(savedChannel, 'channel saved');
                        newChannels.push(savedChannel);
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 2];
                    case 7:
                        section.channels = newChannels;
                        return [4 /*yield*/, this.sectionRepository.save(section)];
                    case 8: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    SectionService.prototype.createClassRoomWithChannels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sections, channelsPerSection, allSections, _i, sections_1, sectionData, section, channels, newChannels, _a, channels_1, channelTitle, newChannel, newConfig, _b, _c, savedChannel;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        sections = [
                            { title: 'Tableau des annonces', order: 1 },
                            { title: 'Bureaux', order: 2 },
                            { title: 'Tables', order: 3 },
                        ];
                        channelsPerSection = {
                            'Tableau des annonces': [
                                'Annonces Générales',
                                'Annonces Administratives',
                            ],
                            Bureaux: ['Bureau du professeur', "Bureau de l'assistant"],
                            Tables: ['Table principale', 'Table des dailys'],
                        };
                        allSections = [];
                        _i = 0, sections_1 = sections;
                        _e.label = 1;
                    case 1:
                        if (!(_i < sections_1.length)) return [3 /*break*/, 10];
                        sectionData = sections_1[_i];
                        return [4 /*yield*/, this.sectionRepository.save({
                                title: sectionData.title,
                                order: sectionData.order,
                                relations: ['channels'],
                            })];
                    case 2:
                        section = _e.sent();
                        channels = channelsPerSection[sectionData.title];
                        console.log(channels, 'channels');
                        newChannels = [];
                        _a = 0, channels_1 = channels;
                        _e.label = 3;
                    case 3:
                        if (!(_a < channels_1.length)) return [3 /*break*/, 8];
                        channelTitle = channels_1[_a];
                        newChannel = this.channelRepository.create({
                            uuid: (0, uuid_1.v4)(),
                            title: channelTitle,
                            slot: 1,
                        });
                        _c = (_b = this.configRepository).create;
                        _d = {
                            maxSlot: 1
                        };
                        return [4 /*yield*/, this.typeRepository.findOneBy({ id: 1 })];
                    case 4:
                        newConfig = _c.apply(_b, [(_d.type = _e.sent(),
                                _d)]);
                        newChannel.config = newConfig;
                        return [4 /*yield*/, this.configRepository.save(newConfig)];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, this.channelRepository.save(newChannel)];
                    case 6:
                        savedChannel = _e.sent();
                        newChannels.push(savedChannel);
                        _e.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 3];
                    case 8:
                        section.channels = newChannels;
                        allSections.push(section);
                        _e.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 1];
                    case 10: return [4 /*yield*/, this.sectionRepository.save(allSections)];
                    case 11: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    SectionService.prototype.findAllTopicAndSection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sectionRepository.find({
                            relations: ['channels'],
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SectionService.prototype.createChannelIntopic = function (sectionId, channelData) {
        return __awaiter(this, void 0, void 0, function () {
            var section, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sectionRepository.findOneBy({ id: sectionId })];
                    case 1:
                        section = _a.sent();
                        if (!section) {
                            throw new Error('Topic not found');
                        }
                        else {
                            channel = this.channelRepository.create(__assign(__assign({}, channelData), { uuid: (0, uuid_1.v4)() }));
                            channel.sections = [section];
                            return [2 /*return*/, this.channelRepository.save(channel)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SectionService.prototype.editChannelInSection = function (sectionId, channelId, newtTitle, newSlot) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, section, updatedChannel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.channelRepository.findOneBy({ id: channelId })];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, this.sectionRepository.findOneBy({ id: sectionId })];
                    case 2:
                        section = _a.sent();
                        console.log(channel, 'channel');
                        console.log(section, 'section');
                        if (!section)
                            throw new Error('channel not found');
                        if (!channel)
                            throw new Error('channel not found');
                        return [4 /*yield*/, this.channelRepository.update(channelId, {
                                title: newtTitle,
                                slot: newSlot,
                            })];
                    case 3:
                        updatedChannel = _a.sent();
                        console.log(updatedChannel, 'nouveau channel');
                        return [2 /*return*/, updatedChannel];
                }
            });
        });
    };
    return SectionService;
}());
exports.SectionService = SectionService;
