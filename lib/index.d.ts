/// <reference types="react" />
import Registry from "./Registry";
export * from "./Route";
export * from "./utils";
export * from "./types";
export declare type CreateRegistryOptions = {
    Link?: any;
    Router?: any;
};
export declare const createRegistry: (options?: CreateRegistryOptions | undefined) => {
    registry: Registry;
    Link: (props: any) => import("react").FunctionComponentElement<import("next/link").LinkProps>;
    Router: import("./getRouter").InternalRouter;
};
export default createRegistry;
//# sourceMappingURL=index.d.ts.map