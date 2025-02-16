import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}

  async createDriverProfile(
    userId: Types.ObjectId,
    createDriverDto: CreateDriverDto,
  ): Promise<Driver> {
    const driver = new this.driverModel({
      userId,
      ...createDriverDto,
    });
    return driver.save();
  }

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async findByUserId(userId: string): Promise<Driver> {
    const driver = await this.driverModel.findOne({ userId }).exec();
    if (!driver) {
      throw new NotFoundException(
        `Driver profile not found for user ${userId}`,
      );
    }
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const updatedDriver = await this.driverModel
      .findByIdAndUpdate(id, updateDriverDto, { new: true })
      .exec();
    if (!updatedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return updatedDriver;
  }

  async remove(id: string): Promise<Driver> {
    const deletedDriver = await this.driverModel.findByIdAndDelete(id).exec();
    if (!deletedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return deletedDriver;
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<Driver> {
    const driver = await this.driverModel
      .findByIdAndUpdate(id, { isAvailable }, { new: true })
      .exec();
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }
}
