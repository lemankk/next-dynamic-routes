import OriginalNextRouter, { SingletonRouter } from "next/router";
import Registry from "./Registry";
import { InjectedRouter } from "./types";

export function createInjectedRouter(registry: Registry, Router: SingletonRouter | any = null) {
  const _router: any = Router || OriginalNextRouter;
  const _injectingRouter: InjectedRouter = {
    ..._router,
  };
  const wrap = (method: string) => (route: string, params?: any, options?: any) => {
    const _method: any = _router[method];
    if (!!_method) {
      const {
        byName,
        urls: { as, href },
      } = registry.findAndGetUrls(route, params);
      return _method(href, as, byName ? options : params);
    }
  };
  
  _injectingRouter.pushRoute = wrap("push");
  _injectingRouter.replaceRoute = wrap("replace");
  _injectingRouter.prefetchRoute = wrap("prefetch");
  return _injectingRouter;
}
