import React from "react";
import NextLink from "next/link";
import Registry from "./Registry";

function getLink(registry: Registry, Link = null) {
  let _Link = Link || NextLink;
  const LinkRoutes = (props: any) => {
    const { route, params, to, ...newProps } = props;
    const nameOrUrl = route || to;

    if (nameOrUrl) {
      Object.assign(newProps, registry.findAndGetUrls(nameOrUrl, params).urls);
    }

    return React.createElement(_Link, newProps);
  };
  return LinkRoutes;
}

export default getLink;