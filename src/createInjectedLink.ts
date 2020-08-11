import React from "react";
import OriginalNextLink from "next/link";
import Registry from "./Registry";
import { DynamicRouteLinkProps, NextLinkElementType } from "./types";


function createInjectedLink(registry: Registry, Link: NextLinkElementType | null = null) {
  let _Link = Link || OriginalNextLink;
  const DynamicRouteLink = React.memo((props: DynamicRouteLinkProps) => {
    const { route, params, to, ...newProps } = props;
    const nameOrUrl = route || to;

    if (nameOrUrl) {
      Object.assign(newProps, registry.findAndGetUrls(nameOrUrl, params).urls);
    }

    return React.createElement(_Link, newProps);
  });
  return DynamicRouteLink;
}

export default createInjectedLink;