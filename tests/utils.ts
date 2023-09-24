import { SSMClient, GetParametersByPathCommand, GetParametersByPathCommandOutput } from '@aws-sdk/client-ssm';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamicModule, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SSM_PS_CLIENT } from '../lib/constants';
import { mockData } from './mockdata';

export interface TestHarness {
  app: INestApplication;
  testingModule: TestingModule;
}

const chunk = <T>(arr: T[], size: number): Array<T[]> => {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_: T, i: number) => arr.slice(i * size, i * size + size),
  );
}

export const createSSMClientWithTestData = () => {
  const ssmClient = mockClient(SSMClient);

  const paginatedMockData = chunk(mockData, 10);
  const totalPages = paginatedMockData.length;

  paginatedMockData.forEach((pageData, index) => {
    // Last page doesn't have a next token (no more data to load).
    const isLastPage = index + 1 == totalPages;
    const tokenForNextPage = isLastPage ? undefined : `token-for-page=${index + 1}`;

    const resultsForThisPage: GetParametersByPathCommandOutput = {
      $metadata: {},
      Parameters: pageData,
      NextToken: tokenForNextPage,
    };

    ssmClient
      .on(GetParametersByPathCommand, {
        NextToken: index === 0 ? undefined: `token-for-page=${index}`
      })
      .resolves(resultsForThisPage);
  });
  
  return ssmClient;
};

export async function createTestHarness(module: DynamicModule): Promise<TestHarness> {
  const testingModule = await Test.createTestingModule({
    imports: [module],
  })
  .overrideProvider(SSM_PS_CLIENT)
  .useValue(createSSMClientWithTestData())
  .compile();

  const app = testingModule.createNestApplication();
  await app.init();

  return {
    app,
    testingModule,
  };
}
