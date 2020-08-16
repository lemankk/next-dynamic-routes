/// <reference types="react" />
import Registry from "./Registry";
import { CreateRegistryOptions } from "./types";
export declare const createRegistry: (options?: CreateRegistryOptions | undefined) => {
    registry: Registry;
    Link: (props: import("./types").DynamicRouteLinkProps) => import("react").FunctionComponentElement<{
        propTypes?: import("react").WeakValidationMap<import("next/link").LinkProps> | undefined;
        contextTypes?: import("prop-types").ValidationMap<any> | undefined;
        defaultProps?: Partial<import("next/link").LinkProps> | undefined;
        displayName?: string | undefined;
    }>;
    Router: import("./types").InjectedRouter;
};
export default createRegistry;
//# sourceMappingURL=createRegistry.d.ts.map