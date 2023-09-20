import { Injectable, Inject } from '@nestjs/common';
import {
  SSMClient,
  GetParametersByPathCommand,
  Parameter,
} from '@aws-sdk/client-ssm';
import { SSM_PS_CLIENT } from '../constants';

@Injectable()
export class ParameterStoreService {
  public constructor(
    @Inject(SSM_PS_CLIENT) private readonly client: SSMClient,
  ) {}

  public async getParametersByPath(
    path: string,
    decrypt = false,
  ): Promise<Parameter[]> {
    let allParameters: Parameter[] = [];
    let nextParametersToken: string | undefined;
    do {
      const getParameters = new GetParametersByPathCommand({
        Path: path,
        WithDecryption: decrypt,
        NextToken: nextParametersToken,
      });

      const { Parameters = [], NextToken } = await this.client.send(
        getParameters,
      );
      allParameters = allParameters.concat(Parameters);
      nextParametersToken = NextToken;
    } while (Boolean(nextParametersToken));

    return allParameters;
  }
}
