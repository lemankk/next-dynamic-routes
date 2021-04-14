import Registry from "./Registry";
import { createInjectedLink } from "./createInjectedLink";
import { createInjectedRouter } from "./createInjectedRouter";
import { createUseRouteRegistry } from "./createUseRouteRegistry";
import { CreateRegistryOptions, CreateRegistryResposne } from "./types";

export const createRegistry = (
  options?: CreateRegistryOptions
): CreateRegistryResposne => {
  const { Link: LinkTemplate = null, Router: RouterTemplate = null } =
    options || {};
  const registry = new Registry();
  const useRouteRegistry = createUseRouteRegistry(registry);
  const Link = createInjectedLink(registry, LinkTemplate);
  const Router = createInjectedRouter(registry, RouterTemplate);
  return {
    registry,
    Link,
    Router,
    useRouteRegistry,
  };
};

export default createRegistry;
