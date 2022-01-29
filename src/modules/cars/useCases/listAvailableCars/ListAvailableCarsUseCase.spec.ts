import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carr 1",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-1224",
            fine_amount: 300,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carr 1",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-1224",
            fine_amount: 300,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 100,
            license_plate: "DSA-1224",
            fine_amount: 300,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 100,
            license_plate: "DSA-1224",
            fine_amount: 300,
            brand: "Car_brand_test",
            category_id: "432",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "432",
        });

        expect(cars).toEqual([car]);
    });
});
