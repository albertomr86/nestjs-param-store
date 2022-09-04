import { ValueProvider } from '@nestjs/common';
import { PSConfigOptions } from '../interfaces';
import { PS_CONFIG_OPTIONS } from '../constants';

export const createOptionsProvider = (
  options: PSConfigOptions,
): ValueProvider<PSConfigOptions> => {
  return {
    provide: PS_CONFIG_OPTIONS,
    useValue: options,
  };
};
