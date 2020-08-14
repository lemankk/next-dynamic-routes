import React from "react";
import { SingletonRouter } from "next/router";
import { LinkProps as OriginalLinkProps } from "next/link";
export declare type NextLinkElementType = React.SFC<OriginalLinkProps>;
export declare type CreateRegistryOptions = {
    Link?: NextLinkElementType;
    Router?: any;
};
export declare type DynamicRouteParams = {
    [key: string]: any;
};
export declare type DynamicRouteProps = {
    name: string;
    pattern?: string;
    page?: string;
};
export declare type DynamicRouteLinkProps = NextLinkElementType & {
    route?: string;
    to?: string;
    params?: any;
};
export declare type LinkProps = OriginalLinkProps;
export declare type InjectedRouter = SingletonRouter & {
    pushRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
    replaceRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
    prefetchRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
};
//# sourceMappingURL=types.d.ts.map