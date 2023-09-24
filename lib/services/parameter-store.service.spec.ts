import 'aws-sdk-client-mock-jest';
import {
  SSMClient,
  Parameter,
  GetParametersByPathCommand,
} from '@aws-sdk/client-ssm';
import { AwsStub } from 'aws-sdk-client-mock';
import { Test } from '@nestjs/testing';
import { ParameterStoreService } from './parameter-store.service';
import { SSM_PS_CLIENT } from '../constants';
import { createSSMClientWithTestData } from '../../tests/utils';
import { mockData } from '../../tests/mockdata';

describe('ParameterStoreService', () => {
  let parameterStoreService: ParameterStoreService;
  let ssmClient: AwsStub<SSMClient, unknown, unknown>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ParameterStoreService,
        {
          provide: SSM_PS_CLIENT,
          useFactory: () => createSSMClientWithTestData(),
        },
      ],
    }).compile();

    parameterStoreService = moduleRef.get(ParameterStoreService);
    ssmClient = moduleRef.get(SSM_PS_CLIENT);
  });

  describe('getParametersByPath()', () => {
    it('should fetch all parameters with pagination', async () => {
      const totalItems = mockData.length;
      const totalPages = Math.ceil(totalItems / 10);

      const results = await parameterStoreService.getParametersByPath(
        '/',
        true,
        true,
      );

      expect(results).toBeInstanceOf(Array<Parameter>);
      expect(results).toHaveLength(totalItems);
      expect(ssmClient).toHaveReceivedCommandTimes(
        GetParametersByPathCommand,
        totalPages,
      );
    });
  });
});
