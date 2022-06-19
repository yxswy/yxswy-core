import { Controller, Get, Param, Post } from '@nestjs/common';
import { CodeService } from './code.service';

@Controller('code')
export class CodeController {

    constructor(private readonly userService: CodeService) {}

    @Get('/list')
    async getCodeList() {
        return await this.userService.findAll()
    }

    @Post('/detail/:id')
    async getCodeDetail(@Param() params) {
        return 
    }

    @Post("/create")
    async createCode() {
        return this.userService.create()
    }
}
