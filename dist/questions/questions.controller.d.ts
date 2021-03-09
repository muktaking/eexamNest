import { CreateQuestionDto } from "./create-question.dto";
import { QuestionsService } from "./questions.service";
import { Stem } from "./stem.entity";
export declare class QuestionsController {
    private readonly questionService;
    constructor(questionService: QuestionsService);
    getAllQuestions(): Promise<any>;
    getQuestionsByCategory(categoryId: any): Promise<any>;
    createQuestion(createQuestionDto: CreateQuestionDto, stem: {
        stem: Stem[];
        error: string;
    }, req: any): Promise<{
        result: any;
        message: string;
    }>;
    createQuestionByUpload(req: any, category: string, file: string): Promise<any[]>;
}
