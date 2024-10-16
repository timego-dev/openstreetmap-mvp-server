import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/history')
  saveAddress(@Body() body) {
    return this.appService.addAddress(body);
  }

  @Get('/history')
  getAddress() {
    return this.appService.getAddress();
  }
}
