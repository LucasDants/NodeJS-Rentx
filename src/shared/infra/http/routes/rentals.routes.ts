import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalControler = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalControler.handle);

export { rentalsRoutes };
