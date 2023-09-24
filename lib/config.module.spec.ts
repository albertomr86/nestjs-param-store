import { INestApplication } from '@nestjs/common';
import { Parameter } from '@aws-sdk/client-ssm';
import { PSConfigModule } from './config.module';
import { PSConfigParameters, PSConfigOptions } from './interfaces';
import { PS_CONFIG_PARAMETERS, PS_CONFIG_OPTIONS } from './constants';
import { createTestHarness } from '../tests/utils';
import { mockData } from '../tests/mockdata';

describe('PSConfigModule', () => {
  let app: INestApplication;
  const moduleOptions: PSConfigOptions = {
    ssmParamStorePath: '/',
    ssmDecryptParams: true,
    ssmRecursive: true,
    ssmClientOptions: {
      region: 'us-east-1',
    },
  };

  describe('register()', () => {
    beforeEach(async () => {
      const testHarness = await createTestHarness(
        PSConfigModule.register(moduleOptions),
      );
      app = testHarness.app;
    });

    it('should fetch all parameters when loading', () => {
      const parameters = app.get<
        typeof PS_CONFIG_PARAMETERS,
        PSConfigParameters
      >(PS_CONFIG_PARAMETERS);
      expect(parameters).toBeInstanceOf(Array<Parameter>);
      expect(parameters).toHaveLength(mockData.length);
    });

    it('should load the module with options', () => {
      expect(app.get<PSConfigOptions>(PS_CONFIG_OPTIONS)).toMatchObject(
        moduleOptions,
      );
    });
  });

  describe('registerAsync()', () => {
    beforeEach(async () => {
      const testHarness = await createTestHarness(
        PSConfigModule.registerAsync({
          useFactory: () => moduleOptions,
        }),
      );
      app = testHarness.app;
    });

    it('should fetch all parameters when loading', () => {
      const parameters = app.get<
        typeof PS_CONFIG_PARAMETERS,
        PSConfigParameters
      >(PS_CONFIG_PARAMETERS);
      expect(parameters).toBeInstanceOf(Array<Parameter>);
      expect(parameters).toHaveLength(mockData.length);
    });

    it('should load the module with options', () => {
      expect(app.get<PSConfigOptions>(PS_CONFIG_OPTIONS)).toMatchObject(
        moduleOptions,
      );
    });
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
