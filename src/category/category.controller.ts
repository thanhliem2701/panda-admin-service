import { Controller, Body } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    // Get all categories
    @MessagePattern('get_all_categories')
    async getAllCategories() {
        return await this.categoryService.getAllCategories();
    }

    // Get category by Id
    @MessagePattern('get_category_by_id')
    async getCategoryById(@Payload() data: { id: string }) {
        return await this.categoryService.getCategoryById(data.id);
    }

    // Get category by name
    @MessagePattern('get_category_by_name')
    async getCategoryByName(@Payload() data: { name: string }) {
        return await this.categoryService.getCategoryByName(data.name);
    }

    // Create new category
    @MessagePattern('create_new_category')
    async createCategory(@Body() category_info: any) {
        return await this.categoryService.createCategory(category_info);
    }

    // Update category
    @MessagePattern('update_category')
    async updateCategory(@Body() category_info: any) {
        return await this.categoryService.updateCategory(category_info);
    }
}