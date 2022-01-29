import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateSpecificatIonDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({
        name,
        description,
    }: ICreateSpecificatIonDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository };
