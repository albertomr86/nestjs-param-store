import { Test, TestingModule } from '@nestjs/testing';
import { configParametersProvider } from './config-parameters.provider';
import { createOptionsProvider } from './options.provider';
import { ParameterStoreService } from '../services';
import { PSConfigParameters } from '../interfaces';
import { PS_CONFIG_PARAMETERS } from '../constants';
import { mockData } from '../../tests/mockdata';

describe('configParametersProvider#PS_CONFIG_PARAMETERS', () => {
  let moduleRef: TestingModule;
  let parameterStoreService: ParameterStoreService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        createOptionsProvider({ ssmParamStorePath: '/' }),
        {
          provide: ParameterStoreService,
          useFactory: () => ({
            getParametersByPath: jest
              .spyOn(ParameterStoreService.prototype, 'getParametersByPath')
              .mockImplementation(() => Promise.resolve(mockData)),
          }),
        },
        configParametersProvider,
      ],
    }).compile();

    parameterStoreService = moduleRef.get<ParameterStoreService>(
      ParameterStoreService,
    );
  });

  it('should hold all parameters', () => {
    const parameters = moduleRef.get<PSConfigParameters>(PS_CONFIG_PARAMETERS);
    expect(parameters).toBeInstanceOf(Array);
    expect(parameters).toHaveLength(mockData.length);
    expect(parameterStoreService.getParametersByPath).toHaveBeenCalled();
  });
});
