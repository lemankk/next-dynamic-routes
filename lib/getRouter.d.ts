import { SingletonRouter } from "next/router";
import Registry from "./Registry";
export declare type InternalRouter = SingletonRouter & {
    pushRoute?: (route: any, params?: any, options?: any) => void;
    replaceRoute?: (route: any, params?: any, options?: any) => void;
    prefetchRoute?: (route: any, params?: any, options?: any) => void;
};
declare function getRouter(registry: Registry, Router?: null): InternalRouter;
export default getRouter;
//# sourceMappingURL=getRouter.d.ts.map