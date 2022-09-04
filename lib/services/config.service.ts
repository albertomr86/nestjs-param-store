import { Injectable, Inject } from '@nestjs/common';
import { Parameter } from '@aws-sdk/client-ssm';
import { PS_CONFIG_PARAMETERS } from '../constants';

type Maybe<T> = T | null;

@Injectable()
export class PSConfigService {
  private static readonly trutyValues = [
    'true',
    'True',
    '1',
    'y',
    'yes',
    'Yes',
  ];

  public constructor(
    @Inject(PS_CONFIG_PARAMETERS) private readonly parameters: Parameter[],
  ) {}

  public get<R extends string>(
    name: string,
    defaultValue: Maybe<R> = null,
  ): Maybe<R> {
    const found = this.parameters.find((param) => param.Name?.endsWith(name));

    if (!found) {
      return defaultValue;
    }

    return found.Value as R;
  }

  public getBool<R extends boolean>(
    name: string,
    defaultValue: Maybe<R> = null,
  ): Maybe<R> {
    const found = this.parameters.find((param) => param.Name?.endsWith(name));

    if (!found) {
      return defaultValue;
    }

    const isTrue = PSConfigService.trutyValues.includes(found.Value ?? '');

    return isTrue as R;
  }

  public getNumber<R extends number>(
    name: string,
    defaultValue: Maybe<R> = null,
  ): Maybe<R> {
    const found = this.parameters.find((param) => param.Name?.endsWith(name));

    if (!found?.Value) {
      return defaultValue;
    }

    return +found.Value as R;
  }
}
