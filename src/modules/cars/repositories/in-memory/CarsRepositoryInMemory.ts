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
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign("car", {
      name,
      brand,
      category_id,
      fine_amount,
      daily_rate,
      description,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => {
      return car.license_plate === license_plate;
    });
  }
}

export { CarsRepositoryInMemory };
