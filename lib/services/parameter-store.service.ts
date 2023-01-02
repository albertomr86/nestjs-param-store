import { Injectable, Inject } from '@nestjs/common';
import {
  SSMClient,
  GetParametersByPathCommand,
  Parameter,
} from '@aws-sdk/client-ssm';
import { SSM_PS_CLIENT } from '../constants';

type GetParametersByPathRecursive = {
  Path: string;
  parameters: Parameter[];
  NextToken?: string;
};

@Injectable()
export class ParameterStoreService {
  public constructor(
    @Inject(SSM_PS_CLIENT) private readonly client: SSMClient,
  ) {}

  private async getParametersByPathRecursive({
    Path,
    parameters,
    NextToken,
  }: GetParametersByPathRecursive): Promise<Parameter[]> {
    const getParameters = new GetParametersByPathCommand({
      Path,
      NextToken,
      WithDecryption: true,
    });

    const { Parameters = [], NextToken: nextToken } = await this.client.send(
      getParameters,
    );

    if (nextToken) {
      return this.getParametersByPathRecursive({
        Path,
        parameters: [...parameters, ...Parameters],
        NextToken: nextToken,
      });
    }

    return [...parameters, ...Parameters];
  }

  public async getParametersByPath(path: string): Promise<Parameter[]> {
    const getParameters = new GetParametersByPathCommand({
      WithDecryption: true,
      Path: path,
    });

    return this.getParametersByPathRecursive({
      Path: path,
      parameters: [],
    });
  }
}
