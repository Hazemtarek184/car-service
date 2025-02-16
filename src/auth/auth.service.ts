import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Role } from './enums/roles.enum';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/entities/users.entity';
import { DriversService } from 'src/driver/driver.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private mailService: MailService,
    private driversService: DriversService,
  ) {}

  private generateJwtToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async signup(signupDto: SignupDto): Promise<any> {
    const existingUser = await this.userModel.findOne({
      email: signupDto.email,
    });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = new this.userModel({
      ...signupDto,
      password: hashedPassword,
    });
    await user.save();

    // Create role-specific profile
    if (user.role === Role.DRIVER) {
      if (!signupDto.driverInfo) {
        throw new BadRequestException('Driver information is required');
      }
      await this.driversService.createDriverProfile(
        user._id as Types.ObjectId,
        signupDto.driverInfo,
      );
    }

    return this.generateJwtToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    return this.generateJwtToken(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({
      email: forgotPasswordDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    const resetCodeExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordCode = resetCode;
    user.resetPasswordCodeExpiresAt = resetCodeExpiresAt;
    await user.save();

    await this.sendResetPasswordEmail(user.email, resetCode);

    return { message: 'Reset code sent to email' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userModel.findOne({
      resetPasswordCode: resetPasswordDto.code,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset code');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpiresAt = null;
    await user.save();

    return { message: 'Password reset successfully' };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  private async sendResetPasswordEmail(email: string, code: string) {
    await this.mailService.sendResetCode(email, code);
  }
}
