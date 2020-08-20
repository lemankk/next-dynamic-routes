import React from "react";
import OriginalNextLink from "next/link";
import Registry from "./Registry";
import { DynamicRouteLinkProps, NextLinkElementType } from "./types";


function createInjectedLink(registry: Registry, Link: NextLinkElementType | null = null) {
  const LinkRenderer: any = Link || OriginalNextLink;
  const DynamicRouteLink = (props: DynamicRouteLinkProps) => {
    const { route, params, to, ...newProps } = props;
    const nameOrUrl = route || to;

    let _newProps: any = newProps;
    // Try to provide asPath, query to next/link after mapped from RouteRegistry
    if (nameOrUrl) {
      Object.assign(_newProps, registry.findAndGetUrls(nameOrUrl, params).urls);
    }
    if (!_newProps.href) {
      _newProps.href = nameOrUrl;
    }
    if (!_newProps.params) {
      _newProps.params = params;
    }

    return <LinkRenderer {..._newProps} />;
  };
  return DynamicRouteLink;
}

export default createInjectedLink;