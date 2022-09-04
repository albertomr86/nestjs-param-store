import { PSConfigOptions } from './config-options.interface';

export interface PSConfigOptionsFactory {
  createOptions(): Promise<PSConfigOptions> | PSConfigOptions;
}
