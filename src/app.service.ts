import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisCacheService } from './module/redis/redisCache.service';
import { HISTORY_KEY } from './config';
import { IAddress } from './@types/address';
import * as _ from 'lodash';

@Injectable()
export class AppService {
  constructor(private readonly cacheService: RedisCacheService) {}

  getHello() {
    return {
      status: 'Success',
      message: 'OpenStreetMap MVP Backend Project Running Successfully~!',
    };
  }

  async getAddressFromMemory(): Promise<IAddress[]> {
    let result: IAddress[] = [];
    const pureData = await this.cacheService.get(HISTORY_KEY);
    if (pureData) {
      result = JSON.parse(pureData) || [];
    }
    return _.orderBy(result, 'timestamp', 'desc');
  }

  async addAddress(data: IAddress) {
    let newData: IAddress[] = await this.getAddressFromMemory();
    const isExist = newData.find(
      (item) => item.lat === data.lat && item.long === data.long,
    );
    if (isExist) {
      throw new BadRequestException('Address already exists');
    }
    newData.push(data);
    await this.cacheService.set(HISTORY_KEY, JSON.stringify(newData));
    return data;
  }

  async getAddress(page: number, pageSize: number) {
    const result = await this.getAddressFromMemory();
    return {
      data: result.slice((page - 1) * pageSize, page * pageSize),
      total: Math.ceil(result.length / pageSize),
    };
  }
}
