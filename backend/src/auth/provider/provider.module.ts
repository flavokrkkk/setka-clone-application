import { DynamicModule, Module } from "@nestjs/common";
import { ProviderService } from "./provider.service";
import { ProviderOptionsSymbol, TypeAsyncOptions, TypeOptions } from "./provider.constants";

@Module({})
export class ProviderModule {
  public static register(options: TypeOptions): DynamicModule {
    return {
      module: ProviderModule,
      providers: [
        {
          useValue: options.services,
          provide: ProviderOptionsSymbol,
        },
        ProviderService,
      ],
      exports: [ProviderService],
    };
  }

  public static registerAsync(options: TypeAsyncOptions): DynamicModule {
    return {
      module: ProviderModule,
      imports: options.imports,
      providers: [
        {
          useFactory: options.useFactory,
          provide: ProviderOptionsSymbol,
          inject: options.inject,
        },
        ProviderService,
      ],
      exports: [ProviderService],
    };
  }
}
