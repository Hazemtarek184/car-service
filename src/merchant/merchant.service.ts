import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Merchant } from './entities/merchant.entity';
import { CreateMerchantDto, AddProductDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
  ) {}

  async createMerchantProfile(
    userId: Types.ObjectId,
    createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    const merchant = new this.merchantModel({
      userId,
      ...createMerchantDto,
    });
    return merchant.save();
  }

  async findAll(): Promise<Merchant[]> {
    return this.merchantModel.find().exec();
  }

  async findOne(id: string): Promise<Merchant> {
    const merchant = await this.merchantModel.findById(id).exec();
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
    return merchant;
  }

  async update(
    id: string,
    updateMerchantDto: UpdateMerchantDto,
  ): Promise<Merchant> {
    const merchant = await this.merchantModel
      .findByIdAndUpdate(id, updateMerchantDto, { new: true })
      .exec();
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
    return merchant;
  }

  async remove(id: string): Promise<Merchant> {
    const merchant = await this.merchantModel.findByIdAndDelete(id).exec();
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
    return merchant;
  }

  async addProduct(
    id: Types.ObjectId,
    productDto: AddProductDto,
  ): Promise<Merchant> {
    const merchant = await this.merchantModel.findById(id);
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
    merchant.products.push(productDto);
    return merchant.save();
  }
}
