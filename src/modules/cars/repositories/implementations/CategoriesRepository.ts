import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

// DTO => DATA TRANSFER OBJECT:
// CRIAR UM OBJETO QUE VAI SER RESPONSÁVEL POR FAZER A TRANSFERENCIA DE DADOS ENTRE UMA CAMADA/CLASSE E OUTRA.

// singleton pattern: O padrão Singleton desabilita todos os outros meios de criar objetos de uma classe exceto pelo método especial de criação.

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // Select * from categories where name = "name" limit 1
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
