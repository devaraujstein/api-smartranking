import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PlayerDTO } from './dtos/player.dto';

import { Player } from './interfaces/player.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player> ) {}

    async create(playerDTO: PlayerDTO): Promise<Player> {
        const { email } = playerDTO;

        const playerFinded = await this.playerModel.findOne({email}).exec();

        if(playerFinded != null){
            return ;
        }else{
            const playerCreated = new this.playerModel(playerDTO);
            return await playerCreated.save();
        }
        
        
    }

    async update(playerDTO: PlayerDTO): Promise<Player> {
        return  await this.playerModel.findOneAndUpdate({ 
            email: playerDTO.email
        }, {$set: playerDTO}).exec();
    }

    async findAll(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async findByEmail(email: string): Promise<Player> {
        const player = await this.playerModel.findOne({email}).exec();

        if(!player){
            throw new NotFoundException(`Email (${email}) doesn't exist`);
        } else {
            return player;
        }
    }

    async delete(email: string): Promise<any> {
        return await this.playerModel.deleteOne({email}).exec();
    }

}
