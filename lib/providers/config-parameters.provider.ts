import { FactoryProvider } from '@nestjs/common';
import { PSConfigOptions, PSConfigParameters } from '../interfaces';
import { ParameterStoreService } from '../services';
import { PS_CONFIG_OPTIONS, PS_CONFIG_PARAMETERS } from '../constants';

export const configParametersProvider: FactoryProvider<PSConfigParameters> = {
  provide: PS_CONFIG_PARAMETERS,
  useFactory: (
    configOptions: PSConfigOptions,
    psService: ParameterStoreService,
  ): Promise<PSConfigParameters> => {
    return psService.getParametersByPath(configOptions.ssmParamStorePath);
  },
  inject: [PS_CONFIG_OPTIONS, ParameterStoreService],
};
