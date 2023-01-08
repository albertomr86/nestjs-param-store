import { SSMClientConfig } from '@aws-sdk/client-ssm';

export interface PSConfigOptions {
  ssmParamStorePath: string;
  ssmDecryptParams?: boolean;
  ssmClientOptions?: SSMClientConfig;
}
