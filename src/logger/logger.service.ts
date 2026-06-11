import { Injectable } from '@nestjs/common';
import { Trade } from 'src/trade/entities/trade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
    async saveLog(trade :Trade){

    }
}
