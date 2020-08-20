import React from "react";
import OriginalNextLink from "next/link";
import Registry from "./Registry";
import { DynamicRouteLinkProps, NextLinkElementType } from "./types";


function createInjectedLink(registry: Registry, Link: NextLinkElementType | null = null) {
  const LinkRenderer: any = Link || OriginalNextLink;
  const DynamicRouteLink = (props: DynamicRouteLinkProps) => {
    const { route, params, to, ...newProps } = props;
    const nameOrUrl = route || to;

    // Try to provide asPath, query to next/link after mapped from RouteRegistry
    if (nameOrUrl) {
      Object.assign(newProps, registry.findAndGetUrls(nameOrUrl, params).urls);
    }

    return <LinkRenderer {...newProps} />;
  };
  return DynamicRouteLink;
}

export default createInjectedLink;