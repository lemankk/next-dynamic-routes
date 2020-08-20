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
    getUrls(params: any): {
        as: any;
        href: string;
    };
}
export declare type RequestHandlerQueryCallbackParams = {
    route: DynamicRoute;
    query: any;
    req: any;
};
export declare type RequestHandlerQueryCallback = (params: RequestHandlerQueryCallbackParams) => any;
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
    getRequestHandler(app: any, customHandler?: any): (req: any, res: any, queryHandler?: RequestHandlerQueryCallback | null) => void;
}
export declare type NextLinkElementType = React.SFC<OriginalLinkProps>;
export declare type DynamicRouteMatchUrlsResult = {
    as: any;
    href: string;
};
export declare type DynamicRouteMatchResult = {
    route: DynamicRoute;
    urls: DynamicRouteMatchUrlsResult;
    byName: boolean;
};
export declare type UseRouteRegistryResponse = {
    matches: DynamicRouteMatchResult;
};
export declare type CreateUseRouteDynamicResponse = () => UseRouteRegistryResponse;
export declare type DynamicRouteParams = {
    [key: string]: any;
};
export declare type DynamicRouteProps = {
    name: string;
    pattern?: string;
    page?: string;
};
export declare type DynamicRouteLinkProps = PropsWithChildren<OriginalLinkProps & {
    route: string;
    to?: string;
    params?: any;
}>;
export declare type LinkProps = OriginalLinkProps;
export declare type InjectedRouter = SingletonRouter & {
    pushRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
    replaceRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
    prefetchRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
};
export declare type CreateRegistryOptions = {
    Link?: NextLinkElementType;
    Router?: any;
};
export declare type CreateRegistryResposne = {
    registry: DynamicRegistry;
    Link: React.SFC<DynamicRouteLinkProps>;
    Router: InjectedRouter;
    useRouteRegistry: CreateUseRouteDynamicResponse;
};
//# sourceMappingURL=types.d.ts.map