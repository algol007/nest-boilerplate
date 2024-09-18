import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  // Find a user by email
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // OTP generation and verification
  async generateOtp(userId: number): Promise<string> {
    const otp = randomBytes(3).toString('hex');
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // OTP expires in 10 minutes

    await this.usersRepository.update(userId, { otp, otpExpires });
    return otp;
  }

  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (user && user.otp === otp && user.otpExpires > new Date()) {
      return true;
    }
    return false;
  }

  // Update user password
  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { password: hashedPassword });
  }

  async findOneById(userId: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }
}
