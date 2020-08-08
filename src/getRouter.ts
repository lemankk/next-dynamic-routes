import NextRouter, { SingletonRouter } from "next/router";
import Registry from "./Registry";

export type InternalRouter = SingletonRouter & {
  pushRoute?: (route: any, params?: any, options?: any) => void;
  replaceRoute?: (route: any, params?: any, options?: any) => void;
  prefetchRoute?: (route: any, params?: any, options?: any) => void;
};

function getRouter(registry: Registry, Router = null) {
  const _Router: any = Router || NextRouter;
  const _InternalRouter: InternalRouter = _Router;
  const wrap = (method: string) => (route: any, params?: any, options?: any) => {
    const _method: any = _Router[method];
    if (!!_method) {
      const {
        byName,
        urls: { as, href },
      } = registry.findAndGetUrls(route, params);
      return _method(href, as, byName ? options : params);
    }
  };

  _InternalRouter.pushRoute = wrap("push");
  _InternalRouter.replaceRoute = wrap("replace");
  _InternalRouter.prefetchRoute = wrap("prefetch");
  return _InternalRouter;
}

export default getRouter;
