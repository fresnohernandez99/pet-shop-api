import { EntityRepository, Repository } from "typeorm";
import { Animal } from "./animal.entity";

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {}