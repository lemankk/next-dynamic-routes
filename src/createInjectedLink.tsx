import React from "react";
import OriginalNextLink from "next/link";
import Registry from "./Registry";
import { DynamicRouteLinkProps, NextLinkElementType } from "./types";
import { useDynamicRouteMatch } from "./useDynamicRouteMatch";

export function createInjectedLink(
  registry: Registry,
  Link: NextLinkElementType | null = null
) {
  const LinkRenderer: any = Link || OriginalNextLink;
  function DynamicRouteLink(props: DynamicRouteLinkProps) {
    const { route, params, to, ...newProps } = props;
    const nameOrUrl = route || to;

    // Try to provide asPath, query to next/link after mapped from RouteRegistry
    const result = useDynamicRouteMatch(registry, nameOrUrl, params);

    let _newProps: any = newProps;
    if (result) {
      Object.assign(_newProps, result.urls);
    }
    if (!_newProps.href) {
      _newProps.href = nameOrUrl;
    }
    if (!_newProps.params) {
      _newProps.params = params;
    }

    return <LinkRenderer {..._newProps} />;
  }
  return DynamicRouteLink;
}
