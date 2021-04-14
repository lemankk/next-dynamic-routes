import React from "react";
import Registry from "./Registry";
import { DynamicRouteMatchResult } from "./types";
import { EVENT_CHANGE } from "./constants";

function createDefaultResult(): DynamicRouteMatchResult {
  return { route: null, urls: { as: "", href: "" }, byName: false };
}

export function useDynamicRouteMatch(
  registry: Registry,
  nameOrUrl?: string,
  params: any = {}
) {
  const result = !nameOrUrl
    ? createDefaultResult()
    : registry.findAndGetUrls(nameOrUrl, params);

  const [lastUrls, setUrls] = React.useState(result.urls);
  React.useEffect(() => {
    const remover = registry.on(EVENT_CHANGE, () => {
      const newResult = !nameOrUrl
        ? createDefaultResult()
        : registry.findAndGetUrls(nameOrUrl, params);
      if (
        !newResult.urls ||
        lastUrls.as !== newResult.urls.as ||
        lastUrls.href !== newResult.urls.href
      ) {
        setUrls(newResult.urls);
      }
    });
    return () => {
      remover();
    };
  }, []);

  return result;
}
