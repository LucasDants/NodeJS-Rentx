import { Specification } from "../model/Specification";

interface ICreateSpecificatIonDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ name, description }: ICreateSpecificatIonDTO);
    findByName(name: string): Specification;
}

export { ISpecificationRepository };
