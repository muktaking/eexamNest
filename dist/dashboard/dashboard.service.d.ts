import { CategoryRepository } from "src/categories/category.repository";
import { ExamRepository } from "src/exams/exam.repository";
import { ExamsService } from "src/exams/exams.service";
export declare class DashboardService {
    private categoryRepository;
    private examRepository;
    private readonly examService;
    constructor(categoryRepository: CategoryRepository, examRepository: ExamRepository, examService: ExamsService);
    private featuredCategoryId;
    getFeaturedCategoryId(): Promise<any>;
    getStudentDashInfo(email: string): Promise<{
        userExamInfo: any;
        featuredExams: any;
        userExamStat: any;
    }>;
    getFeaturedExams(): Promise<any>;
}
