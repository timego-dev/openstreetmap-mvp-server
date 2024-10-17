import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('/history')
  saveAddress(@Body() body) {
    return this.appService.addAddress(body);
  }

  @Get('/history')
  getAddress(@Query() query) {
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    return this.appService.getAddress(page, pageSize);
  }
}
