import { Controller, Post, Body, Get, Put, Query, Param, Delete } from '@nestjs/common';

import { PlayerDTO } from './dtos/player.dto';
import { Player } from './interfaces/player.interface';

import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService){}

    @Post()
    async createPlayer(
        @Body() playerDTO: PlayerDTO
    ) {
        return await this.playersService.create(playerDTO);
    }

    @Put()
    async updatePlayer(
        @Body() playerDTO: PlayerDTO
    ) {
        return await this.playersService.update(playerDTO);
    }

    @Get()
    async findAll(): Promise<Player[]> {

        return await this.playersService.findAll();
    
    }

    @Get('email/:email')
    async findByEmail(
        @Param('email') email: string
    ): Promise<Player> {
        return await this.playersService.findByEmail(email);
    }

    @Delete('email/:email')
    async delete(
        @Param('email') email: string
    ): Promise<void> {
        this.playersService.delete(email);
    }
}
