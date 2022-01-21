import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }) {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
}

export { SpecificationsRepository };
