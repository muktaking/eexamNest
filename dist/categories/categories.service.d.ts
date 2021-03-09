import { Category } from "./category.entity";
import { CategoryRepository } from "./category.repository";
import { createCategoryDto } from "./dto/category.dto";
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    findAllCategories(): Promise<{
        categories: any;
        catHierarchy: any[];
    }>;
    findCategoryBySlug(slug: string): Promise<any>;
    createCategory(categoryDto: createCategoryDto, image: any): Promise<Category>;
    updateCategory(id: string, categoryDto: createCategoryDto, image: any): Promise<{
        msg: string;
    }>;
    deleteCategoryById(id: string): Promise<void>;
    getFreeCategoryId(): Promise<any>;
}
