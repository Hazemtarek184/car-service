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
import { DriversService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('drivers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DriverController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a driver profile' })
  @ApiResponse({
    status: 201,
    description: 'Driver profile created successfully',
  })
  create(@Body() createDriverDto: CreateDriverDto, @Request() req) {
    return this.driversService.createDriverProfile(
      req.user._id,
      createDriverDto,
    );
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({ status: 200, description: 'Return all drivers' })
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver by ID' })
  @ApiResponse({ status: 200, description: 'Return driver by ID' })
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get driver by user ID' })
  @ApiResponse({ status: 200, description: 'Return driver by user ID' })
  findByUserId(@Param('userId') userId: string) {
    return this.driversService.findByUserId(userId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.DRIVER)
  @ApiOperation({ summary: 'Update driver profile' })
  @ApiResponse({
    status: 200,
    description: 'Driver profile updated successfully',
  })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete driver profile' })
  @ApiResponse({
    status: 200,
    description: 'Driver profile deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }

  @Patch(':id/availability')
  @Roles(Role.ADMIN, Role.DRIVER)
  @ApiOperation({ summary: 'Update driver availability' })
  @ApiResponse({
    status: 200,
    description: 'Driver availability updated successfully',
  })
  updateAvailability(
    @Param('id') id: string,
    @Body('isAvailable') isAvailable: boolean,
  ) {
    return this.driversService.updateAvailability(id, isAvailable);
  }
}
