import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PlayerDTO } from './dtos/player.dto';

import { Player } from './interfaces/player.interface';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayerDTO.name);

    async create(playerDTO: PlayerDTO): Promise<void> {
        const { name, phoneNumber, email } = playerDTO;

        const player: Player = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            urlPhotoPlayer: 'http://www.google.com/foto123.png'
        };
        this.logger.log(`PlayerDTO: ${JSON.stringify(player)}`);
        this.players.push(player);
    }

    async update(playerDTO: PlayerDTO): Promise<String> {
        const player = this.players.find(player => player.email === playerDTO.email);

        if(player) {
            const { name } = playerDTO;

            player.name = name;
        } else {
            return JSON.stringify("This email does not exists");
        }
    }

    async findAll(): Promise<Player[]> {
        return await this.players;
    }

    async findByEmail(email: string): Promise<Player> {
        const player = this.players.find(player => player.email === email);

        if(!player){
            throw new NotFoundException(`Email (${email}) doesn't exist`);
        } else {
            return player;
        }
    }

    async delete(email: String): Promise<void> {
        const playerFinded = this.players.find(player => player.email === email);
        this.players = this.players.filter(player => player.email !== playerFinded.email);     
    }

}
