import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async addAddress(data: any) {
    return data;
  }

  async getAddress() {
    return [];
  }
}
