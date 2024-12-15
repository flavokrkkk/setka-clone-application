import { FactoryProvider, ModuleMetadata } from "@nestjs/common";
import { BaseOAuthService } from "./services/base-oauth.service";

export const ProviderOptionsSymbol = Symbol();

export type TypeOptions = {
  baseUrl: string;
  services: Array<BaseOAuthService>;
};

export type TypeAsyncOptions = Pick<ModuleMetadata, "imports"> & Pick<FactoryProvider<TypeOptions>, "useFactory" | "inject">;
