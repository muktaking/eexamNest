"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs = require("fs");
const _ = require("lodash");
const utils_1 = require("../utils/utils");
const XLSX = require("xlsx");
const question_entity_1 = require("./question.entity");
const question_repository_1 = require("./question.repository");
const stem_entity_1 = require("./stem.entity");
let QuestionsService = class QuestionsService {
    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }
    async findAllQuestions() {
        const [err, questions] = await utils_1.to(this.questionRepository.find());
        console.log(err);
        if (err)
            throw new common_1.InternalServerErrorException();
        return questions;
    }
    async findQuestionByFilter(filterName, filterValue) {
        const [err, result] = await utils_1.to(this.questionRepository.find({ where: { [filterName]: +filterValue } }));
        if (err)
            throw new common_1.InternalServerErrorException();
        return result;
    }
    async createQuestion(createQuestionDto, stem, creator) {
        const { title, category, qType, qText, generalFeedback, tags, } = createQuestionDto;
        const stems = [];
        stem.stem.forEach((element) => {
            const stem = new stem_entity_1.Stem();
            stem.qStem = element.qStem;
            stem.aStem = element.aStem;
            stem.fbStem = element.fbStem;
            stems.push(stem);
        });
        const question = new question_entity_1.Question();
        question.title = title;
        question.categoryId = +category;
        question.qType = qType;
        question.qText = qText;
        question.generalFeedback = generalFeedback ? generalFeedback : null;
        question.tags = tags ? tags.join(",") : null;
        question.creatorId = +creator;
        question.stems = stems;
        const [err, result] = await utils_1.to(question.save());
        if (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException();
        }
        return { result, message: stem.error };
    }
    async createQuestionByUpload(creator, category, file) {
        let excel = "";
        let data = [];
        try {
            excel = file.path;
            const workbook = XLSX.readFile(excel);
            data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                header: 1,
                raw: false,
                defval: "",
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
        fs.unlink(excel, (err) => {
            if (err) {
                console.log(err);
            }
        });
        try {
            data.shift();
            const result = this.toCollection(data, category, creator);
            if (result.allData.length > 1) {
                const isSaved = await this.questionRepository.save(result.allData);
                return isSaved;
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateQuestionById(createQuestionDto, stem, creator) {
        const { id, title, category, qType, qText, generalFeedback, tags, } = createQuestionDto;
        const stems = [];
        stem.stem.forEach((element) => {
            const stem = new stem_entity_1.Stem();
            stem.qStem = element.qStem;
            stem.aStem = element.aStem;
            stem.fbStem = element.fbStem;
            stems.push(stem);
        });
        let [error, updatedQuestion] = await utils_1.to(this.questionRepository.update(id, {
            title,
            categoryId: +category,
            qType,
            qText,
            stems: stems,
            generalFeedback,
            tags: tags ? tags.join(",") : null,
            modifiedDate: Date.now(),
            modifiedById: +creator,
        }));
        if (error)
            throw new common_1.InternalServerErrorException();
        return updatedQuestion;
    }
    toCollection(data, category, user) {
        const allData = [];
        const errorIndex = [];
        const errorMessage = [];
        data.forEach((element, index) => {
            const stems = [];
            if (element[0] === "") {
                errorIndex.push(index + 1);
                errorMessage.push("A question Title can not be Empty");
                return;
            }
            if (element[1] === "") {
                errorIndex.push(index + 1);
                errorMessage.push("A question Type can not be Empty");
                return;
            }
            if (element[2] === "") {
                errorIndex.push(index + 1);
                errorMessage.push("A question Text can not be Empty");
                return;
            }
            if (element[3] === "") {
                errorIndex.push(index + 1);
                errorMessage.push("First stem can not be empty.");
                return;
            }
            for (let i = 3; i < 8; i++) {
                if (element[i] === "" && element[i + 10] !== "") {
                    errorIndex.push(index + 1);
                    errorMessage.push("Feedback Can not be on empty stems.");
                    return;
                }
            }
            if (element[1] === "matrix") {
                for (let i = 3; i < 8; i++) {
                    if ((element[i] !== "" && element[i + 5] === "") ||
                        (element[i + 5] !== "" && element[i] === "")) {
                        errorIndex.push(index + 1);
                        errorMessage.push("Stem should have corresponding answer and vice versa.");
                        return;
                    }
                }
            }
            for (let i = 3; i < 8; i++) {
                let stem = {
                    qStem: "",
                    aStem: "",
                    fbStem: "",
                };
                stem.qStem = element[i] !== "" ? element[i] : null;
                stem.aStem = element[i + 5] !== "" ? element[i + 5] : null;
                stem.fbStem = element[i + 10] !== "" ? element[i + 10] : null;
                if (stem.qStem && stem.aStem)
                    stems.push(stem);
            }
            allData.push({
                title: element[0],
                categoryId: category,
                creatorId: +user,
                qType: element[1],
                qText: element[2],
                stems: stems,
                generalFeedback: element[18],
                tags: _.words(element[19]).toString(),
            });
        });
        return {
            allData,
            errorIndex,
            errorMessage,
        };
    }
};
QuestionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(question_repository_1.QuestionRepository)),
    __metadata("design:paramtypes", [question_repository_1.QuestionRepository])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map