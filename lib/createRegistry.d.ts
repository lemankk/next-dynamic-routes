/// <reference types="react" />
import Registry from "./Registry";
import { CreateRegistryOptions } from "./types";
export declare const createRegistry: (options?: CreateRegistryOptions | undefined) => {
    registry: Registry;
    Link: (props: import("./types").DynamicRouteLinkProps) => JSX.Element;
    Router: import("./types").InjectedRouter;
    useRouteRegistry: () => {
        route: import("./Route").Route;
        urls: {
            as: any;
            href: string;
        };
        byName: boolean;
    } | {
        route: any;
        urls: {
            href: any;
            as: string;
        };
        byName: boolean;
    };
};
export default createRegistry;
//# sourceMappingURL=createRegistry.d.ts.map