import { SingletonRouter } from "next/router";
import Registry from "./Registry";
import { InjectedRouter } from "./types";
declare function createInjectedRouter(registry: Registry, Router?: SingletonRouter | any): InjectedRouter;
export default createInjectedRouter;
//# sourceMappingURL=createInjectedRouter.d.ts.map