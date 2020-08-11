import Registry from "./Registry";
import createInjectedLink from "./createInjectedLink";
import createInjectedRouter from "./createInjectedRouter";
import { CreateRegistryOptions } from "./types";

export const createRegistry = (options?: CreateRegistryOptions) => {
    const { Link = null, Router = null } = options || {};
    const registry = new Registry();
    return {
        registry,
        Link: createInjectedLink(registry, Link),
        Router: createInjectedRouter(registry, Router),
    }
};

export default createRegistry;
