import React from "react";
import { SingletonRouter } from "next/router";
import { LinkProps as OriginalLinkProps } from "next/link";

export type NextLinkElementType = React.ElementType<OriginalLinkProps>;

export type CreateRegistryOptions = {
  Link?: NextLinkElementType,
  Router?: any,
}

export type DynamicRouteParams = {
  [key: string]: any,
}

export type DynamicRouteProps = {
  name: string;
  pattern?: string;
  page?: string;
};

export type DynamicRouteLinkProps = NextLinkElementType & {
  route?: string,
  to?: string,
  params?: any,
}

export type LinkProps = OriginalLinkProps;

export type InjectedRouter = SingletonRouter & {
  pushRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
  replaceRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
  prefetchRoute?: (route: string, params?: DynamicRouteParams, options?: any) => void;
};
