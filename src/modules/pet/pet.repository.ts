import { Repository, EntityRepository } from "typeorm";
import { Pet } from "./pet.entity";

@EntityRepository(Pet)
export class PetRepository extends Repository<Pet> {}