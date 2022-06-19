import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    getUserInfo(): string {
        return '2'
    }
}
