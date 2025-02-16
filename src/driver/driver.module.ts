import { Module } from '@nestjs/common';
import { DriversService } from './driver.service';
import { DriverController } from './driver.controller';
import { DriverSchema } from './entities/driver.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  providers: [DriversService],
  controllers: [DriverController],
  exports: [DriversService],
})
export class DriverModule {}
