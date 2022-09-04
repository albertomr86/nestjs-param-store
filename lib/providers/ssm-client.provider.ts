import { FactoryProvider } from '@nestjs/common';
import { SSMClient } from '@aws-sdk/client-ssm';
import { PSConfigOptions } from '../interfaces';
import { PS_CONFIG_OPTIONS, SSM_PS_CLIENT } from '../constants';

export const ssmClientProvider: FactoryProvider<SSMClient> = {
  provide: SSM_PS_CLIENT,
  useFactory: async (options: PSConfigOptions): Promise<SSMClient> => {
    return new SSMClient(options.ssmClientOptions ?? {});
  },
  inject: [PS_CONFIG_OPTIONS],
};
