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

  public async getParametersByPath(path: string): Promise<Parameter[]> {
    const getParameters = new GetParametersByPathCommand({
      Path: path,
    });

    const { Parameters = [] } = await this.client.send(getParameters);

    return Parameters;
  }
}
