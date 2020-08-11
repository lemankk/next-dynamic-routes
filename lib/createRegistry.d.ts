/// <reference types="react" />
import Registry from "./Registry";
import { CreateRegistryOptions } from "./types";
export declare const createRegistry: (options?: CreateRegistryOptions | undefined) => {
    registry: Registry;
    Link: import("react").MemoExoticComponent<(props: import("./types").DynamicRouteLinkProps) => import("react").ReactElement<import("next/link").LinkProps, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>>;
    Router: import("./types").InjectedRouter;
};
export default createRegistry;
//# sourceMappingURL=createRegistry.d.ts.map