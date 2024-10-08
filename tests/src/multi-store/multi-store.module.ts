import { Module } from '@nestjs/common';
import { CacheModule } from '../../../lib';
import { MultiStoreController } from './multi-store.controller';
import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';

@Module({
  imports: [
    CacheModule.register({
      stores: [
        new Keyv({ store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }) }),
        new KeyvRedis('redis://localhost:6379'),
      ],
    }),
  ],
  controllers: [MultiStoreController],
})
export class MultiStoreModule {}
