/// <reference types="react" />
import Registry from "./Registry";
import { CreateRegistryOptions } from "./types";
export declare const createRegistry: (options?: CreateRegistryOptions | undefined) => {
    registry: Registry;
    Link: (props: import("./types").DynamicRouteLinkProps) => JSX.Element;
    Router: import("./types").InjectedRouter;
};
export default createRegistry;
//# sourceMappingURL=createRegistry.d.ts.map