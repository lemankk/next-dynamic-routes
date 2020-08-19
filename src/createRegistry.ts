import Registry from "./Registry";
import createInjectedLink from "./createInjectedLink";
import createInjectedRouter from "./createInjectedRouter";
import createUseRouteRegistry from "./createUseRouteRegistry";
import { CreateRegistryOptions, CreateRegistryResposne } from "./types";

export const createRegistry = (options?: CreateRegistryOptions): CreateRegistryResposne => {
    const { Link = null, Router = null } = options || {};
    const registry = new Registry();
    return {
        registry,
        Link: createInjectedLink(registry, Link),
        Router: createInjectedRouter(registry, Router),
        useRouteRegistry: createUseRouteRegistry(registry),
    }
};

export default createRegistry;
