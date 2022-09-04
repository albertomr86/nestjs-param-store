import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import {
  PSConfigOptions,
  PSConfigModuleAsyncOptions,
  PSConfigOptionsFactory,
} from './interfaces';
import {
  createOptionsProvider,
  configParametersProvider,
  ssmClientProvider,
} from './providers';
import { PSConfigService, ParameterStoreService } from './services';
import { PS_CONFIG_OPTIONS, PS_CONFIG_PARAMETERS } from './constants';

@Global()
@Module({})
export class PSConfigModule {
  public static register(options: PSConfigOptions): DynamicModule {
    const optionsProvider = createOptionsProvider(options);

    return {
      module: PSConfigModule,
      providers: [
        optionsProvider,
        configParametersProvider,
        ssmClientProvider,
        PSConfigService,
        ParameterStoreService,
      ],
      exports: [PSConfigService, PS_CONFIG_PARAMETERS],
    };
  }

  public static registerAsync(
    options: PSConfigModuleAsyncOptions,
  ): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: PSConfigModule,
      imports: options.imports || [],
      providers,
      exports: [PSConfigService, PS_CONFIG_PARAMETERS],
    };
  }

  private static createAsyncProviders(
    options: PSConfigModuleAsyncOptions,
  ): Provider[] {
    const optionsProvider = this.createAsyncOptionsProvider(options);
    const reqProviders = [
      optionsProvider,
      configParametersProvider,
      ssmClientProvider,
      PSConfigService,
      ParameterStoreService,
    ];

    if (options.useExisting || options.useFactory || !options.useClass) {
      return reqProviders;
    }

    return [
      ...reqProviders,
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: PSConfigModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: PS_CONFIG_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useExisting || options.useClass;

    return {
      provide: PS_CONFIG_OPTIONS,
      useFactory: async (optionsFactory: PSConfigOptionsFactory) => {
        return optionsFactory.createOptions();
      },
      inject: inject ? [inject] : [],
    };
  }
}
