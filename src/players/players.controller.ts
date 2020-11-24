import { Controller, Post, Body } from '@nestjs/common';

import { CreatePlayerDTO } from './dtos/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {

    @Post()
    async createPlayer(
        @Body() createPlayerDTO: CreatePlayerDTO
    ) {
        const { phoneNumber, email, name } = createPlayerDTO;

        return {
            name,
            email,
            phoneNumber
        };
    }
}
