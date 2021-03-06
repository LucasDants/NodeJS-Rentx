import { getRepository, Repository } from "typeorm";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ description, name }) {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = this.repository.find();
        return categories;
    }

    findByName(name: string): Promise<Category> {
        const category = this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
