import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto, AddProductDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('Merchants')
@Controller('merchants')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  // @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create merchant profile' })
  create(@Body() createMerchantDto: CreateMerchantDto, @Request() req) {
    return this.merchantService.createMerchantProfile(
      req.user._id,
      createMerchantDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all merchants' })
  findAll() {
    return this.merchantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get merchant by id' })
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.MERCHANT, Role.ADMIN)
  @ApiOperation({ summary: 'Update merchant' })
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete merchant' })
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }

  @Post(':id/products')
  @Roles(Role.MERCHANT)
  @ApiOperation({ summary: 'Add product to merchant' })
  addProduct(@Param('id') id: string, @Body() productDto: AddProductDto) {
    return this.merchantService.addProduct(
      id as unknown as Types.ObjectId,
      productDto,
    );
  }
}
