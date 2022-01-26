import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

/**
 * [] - Definir o tipo de retorno
 * [] - Alterar retorno de error
 * [] - Acessar o repositorio
 */
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ description, name }: IRequest) {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category already exists!");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
