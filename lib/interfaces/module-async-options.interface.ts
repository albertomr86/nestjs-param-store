import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { PSConfigOptionsFactory } from './options-factory.interface';
import { PSConfigOptions } from './config-options.interface';

export interface PSConfigModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<PSConfigOptionsFactory>;
  useClass?: Type<PSConfigOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PSConfigOptions> | PSConfigOptions;
}
