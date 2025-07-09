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
        if (categories.length <= 0) {
            return { statusCode: 200, messages: messages.CATEGORIES_LIST_EMPTY }
        }
        return { statusCode: 200, data: categories }
    }

    // Get Category by Id
    async getCategoryById(id: string) {
        const parseIntId = parseInt(id);
        if (!parseIntId) {
            return { statusCode: 400, messages: messages.CATEGORIES_ID_NOT_PROVIDED };
        }
        const category = await this.prisma.categories.findUnique({ where: { id: parseIntId } })
        if (!category) {
            return { statusCode: 404, messages: messages.CATEGORY_NOT_FOUND };
        }
        return { statusCode: 200, data: category };
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
            return { statusCode: 404, messages: messages.CATEGORY_NOT_FOUND };
        }
        return { statusCode: 200, data: category };
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
            return { statusCode: 400, messages: messages };
        }

        // Insert data to DB
        try {
            await this.prisma.categories.create({ data: dto })
        }
        catch (error) {

            return { statusCode: 500, messages: messages.CATEGORY_CREATION_FAILED }
        }
        return { statusCode: 201, messages: messages.CATEGORY_CREATED }
    }

    // update category
    async updateCategory(@Body() category: UpdateCategoryDto) {
        // Mapping data to DTO
        const dto = plainToInstance(UpdateCategoryDto, category, { excludeExtraneousValues: true })
        // Validate DTO
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error =>
                Object.values(error.constraints || {})
            )
            return { statusCode: 400, messages: messages };
        }
        // remove id from dto to avoid updating
        const { id, ...updateData } = dto;
        // update menu to db
        try {
            await this.prisma.categories.update({ where: { id }, data: updateData })
        }
        catch (error) {
            return { statusCode: 500, messages: messages.CATEGORY_UPDATE_FAILED }
        }
        return { statusCode: 201, messages: messages.CATEGORY_UPDATED }
    }
}