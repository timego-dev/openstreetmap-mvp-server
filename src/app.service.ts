import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './module/redis/redisCache.service';
import { HISTORY_KEY } from './config';
import { IAddress } from './@types/address';
import * as _ from 'lodash';

@Injectable()
export class AppService {
  constructor(private readonly cacheService: RedisCacheService) {}

  async addAddress(data: IAddress) {
    let newData: IAddress[] = [];
    const pureData = await this.cacheService.get(HISTORY_KEY);
    if (pureData) {
      const convertedData = JSON.parse(pureData) || [];
      newData = convertedData;
    }
    newData.push(data);
    await this.cacheService.set(HISTORY_KEY, JSON.stringify(newData));
    return data;
  }

  async getAddress() {
    return this.cacheService.get(HISTORY_KEY);
  }
}
