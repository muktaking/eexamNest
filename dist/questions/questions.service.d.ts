import { CreateQuestionDto } from "./create-question.dto";
import { QuestionRepository } from "./question.repository";
import { Stem } from "./stem.entity";
export declare class QuestionsService {
    private questionRepository;
    constructor(questionRepository: QuestionRepository);
    findAllQuestions(): Promise<any>;
    findQuestionByFilter(filterName: any, filterValue: any): Promise<any>;
    createQuestion(createQuestionDto: CreateQuestionDto, stem: {
        stem: Stem[];
        error: string;
    }, creator: string): Promise<{
        result: any;
        message: string;
    }>;
    createQuestionByUpload(creator: any, category: any, file: any): Promise<any[]>;
    updateQuestionById(createQuestionDto: CreateQuestionDto, stem: {
        stem: Stem[];
        error: string;
    }, creator: string): Promise<any>;
    private toCollection;
}
