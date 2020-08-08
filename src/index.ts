import Registry from "./Registry";
import getLink from "./getLink";
import getRouter from "./getRouter";
export * from "./Route";
export * from "./utils";
export * from "./types";

export type CreateRegistryOptions = {
    Link?: any,
    Router?: any,
}

export const createRegistry = (options?: CreateRegistryOptions) => {
    const { Link = null, Router = null } = options || {};
    const registry = new Registry();
    return {
        registry,
        Link: getLink(registry, Link),
        Router: getRouter(registry, Router),
    }
};

export default createRegistry;