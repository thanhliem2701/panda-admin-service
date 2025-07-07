import { Body, Injectable } from "@nestjs/common";
import { messages } from "src/common/messages";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create_category.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateCategoryDto } from "./dto/update_category.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }
    // Get all categories
    async getAllCategories() {
        const categories = await this.prisma.categories.findMany()
        if (!categories) {
            return { success: false, messages: messages.CATEGORIES_LIST_EMPTY }
        }
        return { success: true, data: categories }
    }

    // Get Category by Id
    async getCategoryById(id: string) {
        const parseIntId = parseInt(id);
        if (!parseIntId) {
            return { success: false, messages: messages.CATEGORIES_ID_NOT_PROVIDED };
        }
        const category = await this.prisma.categories.findUnique({ where: { id: parseIntId } })
        if (!category) {
            return { success: false, messages: messages.CATEGORY_NOT_FOUND };
        }
        return { success: true, data: category };
    }

    // Get category by name
    async getCategoryByName(name: string) {
        const category = await this.prisma.categories.findMany({
            where: {
                category_name: {
                    contains: name,
                    mode: 'insensitive' // ignore upper or lower letter
                }
            }
        })
        if (!category) {
            return { success: false, messages: messages.CATEGORY_NOT_FOUND };
        }
        return { success: true, data: category };
    }

    // Create new category
    async createCategory(@Body() category: CreateCategoryDto) {
        // Mapping data to DTO
        const dto = plainToInstance(CreateCategoryDto, category, { excludeExtraneousValues: true });
        // Validate DTO
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error => 
                Object.values(error.constraints || {})
            )
            return { success: false, messages: messages };
        }
        
        // Insert data to DB
        try {
            await this.prisma.categories.create({ data: dto })
        }
        catch (error) {
            
            return { success: false, messages: messages.CATEGORY_CREATION_FAILED }
        }
        return { success: true, messages: messages.CATEGORY_CREATED}
    }

    // update category
    async updateCategory(@Body() category: UpdateCategoryDto){
        // Mapping data to DTO
        const dto = plainToInstance(UpdateCategoryDto,category,{ excludeExtraneousValues: true })
        // Validate DTO
        const err = await validate(dto);
        if (err.length >0) {
            const messages = err.flatMap(error => 
                Object.values(error.constraints || {})
            )
            return { success: false, messages: messages };
        }
        // remove id from dto to avoid updating
        const { id, ...updateData } = dto;
        // update menu to db
        try {
            await this.prisma.categories.update({ where: { id }, data: updateData })
        }
        catch (error) {
            return { success: false, messages: messages.CATEGORY_UPDATE_FAILED }
        }
        return { success: true, messages: messages.CATEGORY_UPDATED }

    }
}