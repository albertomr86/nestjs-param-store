import { Injectable, Inject } from '@nestjs/common';
import { Parameter } from '@aws-sdk/client-ssm';
import { PS_CONFIG_PARAMETERS } from '../constants';

@Injectable()
export class PSConfigService {
  public constructor(
    @Inject(PS_CONFIG_PARAMETERS) private readonly parameters: Parameter[],
  ) {}

  get = (name: string, defaultValue?: string): string => {
    const found = this.parameters.find(({ Name }) => Name?.endsWith(name));

    if (!found?.Value) {
      if (defaultValue) {
        return defaultValue;
      }

      throw new Error(`Parameter ${name} not found`);
    }

    return found.Value;
  };
}
