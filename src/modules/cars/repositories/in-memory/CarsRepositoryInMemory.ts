import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    brand,
    category_id,
    fine_amount,
    daily_rate,
    description,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      category_id,
      fine_amount,
      daily_rate,
      description,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => {
      return car.license_plate === license_plate;
    });
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsAvailable = this.cars.filter(car => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });
    return carsAvailable;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
