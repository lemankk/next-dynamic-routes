import React, { PropsWithChildren } from "react";
import { SingletonRouter } from "next/router";
import { LinkProps as OriginalLinkProps } from "next/link";

export interface DynamicRoute {
  name: string;
  pattern: string;
  page: string;
  regex: RegExp;
  keyNames: string[];
  toPath: any;
  keys: any[];

  updatePattern(pattern: string): void;
  updatePage(page?: string): void;
  match(path: string): any;
  valuesToParams(values: any[]): any;
  getHref(params?: any): string;
  getAs(params?: any): any;
  getUrls(
    params: any
  ): {
    as: any;
    href: string;
  };
}

export type RequestHandlerQueryCallbackParams = {
  route: DynamicRoute;
  query: any;
  req: any;
};
export type RequestHandlerQueryCallback = (
  params: RequestHandlerQueryCallbackParams
) => any;

export interface DynamicRegistry {
  createOption(name: string | any, pattern?: string, page?: string): any;
  /**
   *
   * @param name
   * @param pattern
   * @param page
   */
  add(name: DynamicRouteProps | string, pattern?: string, page?: string): this;
  /**
   *
   * @param name
   * @param pattern
   * @param page
   */
  set(name: DynamicRouteProps | string, pattern?: string, page?: string): this;
  findByName(name: string): DynamicRoute | null;
  match(url: string): any;
  findAndGetUrls(nameOrUrl: string, params?: {}): DynamicRouteMatchResult;
  /**
   * Provide the handler for server-side
   * for the path request (IncomingMessage) handling
   * @param app
   * @param customHandler
   */
  getRequestHandler(
    app: any,
    customHandler?: any
  ): (
    req: any,
    res: any,
    queryHandler?: RequestHandlerQueryCallback | null
  ) => void;
}
export type LinkProps = Exclude<OriginalLinkProps, "href">;

export type NextLinkElementType = React.SFC<LinkProps>;
export type DynamicRouteMatchUrlsResult = {
  as: any;
  href: string;
  query?: Record<string, any>;
};
export type DynamicRouteMatchResult = {
  route: DynamicRoute | null;
  urls: DynamicRouteMatchUrlsResult;
  byName: boolean;
};

export type UseRouteRegistryResponse = {
  matches: DynamicRouteMatchResult;
};

export type CreateUseRouteDynamicResponse = () => UseRouteRegistryResponse;

export type DynamicRouteParams = {
  [key: string]: any;
};

export type DynamicRouteProps = {
  name: string;
  pattern?: string;
  page?: string;
};

export type DynamicRouteLinkProps = PropsWithChildren<{
  route: string,
  href?: string,
  to?: string,
  params?: any,
}>;


export type InjectedRouter = SingletonRouter & {
  pushRoute?: (
    route: string,
    params?: DynamicRouteParams,
    options?: any
  ) => void;
  replaceRoute?: (
    route: string,
    params?: DynamicRouteParams,
    options?: any
  ) => void;
  prefetchRoute?: (
    route: string,
    params?: DynamicRouteParams,
    options?: any
  ) => void;
};

export type CreateRegistryOptions = {
  Link?: NextLinkElementType;
  Router?: any;
};

export type CreateRegistryResposne = {
  registry: DynamicRegistry;
  Link: React.SFC<DynamicRouteLinkProps>;
  Router: InjectedRouter;
  useRouteRegistry: CreateUseRouteDynamicResponse;
};
