import { parse } from "url";
import Route from "./Route";
import {
  DynamicRouteProps,
  DynamicRouteMatchResult,
  DynamicRegistry,
  RequestHandlerQueryCallback,
} from "./types";
import { EVENT_CHANGE } from "./constants";

export class Registry implements DynamicRegistry {
  private _routes: Route[] = [];

  private _callbacks: Record<string, Function[]> = {};

  public get routes(): Route[] {
    return this._routes;
  }

  constructor() {
    this._routes = [];
  }

  /**
   * Listen to event change from registry
   * @param event
   * @param cb
   * @returns
   */
  public on(event: string, cb: Function) {
    if (!this._callbacks[event]) this._callbacks[event] = [];
    this._callbacks[event].push(cb);

    return () => {
      this.off(event, cb);
    };
  }

  /**
   * Remove listener from registry
   * @param event
   * @param cb
   */
  public off(event: string, cb: Function) {
    const index = this._callbacks[event].findIndex((target) => target === cb);
    if (index >= 0) {
      this._callbacks[event] = this._callbacks[event].splice(index, 1);
    }
  }

  public emit(event: string, ...rest: any[]) {
    const cbs = this._callbacks[event];
    if (cbs) {
      cbs.forEach((cb) => cb.call(null, rest));
    }
  }

  public createOption(name: string | any, pattern?: string, page?: string) {
    let options: any = {};
    let _name: any = name;
    if (name instanceof Object) {
      _name = options.name;
    } else {
      if (name[0] === "/") {
        page = pattern;
        pattern = name;
        _name = null;
      }
      options = { name: _name, pattern, page };
    }
    return options;
  }

  /**
   *
   * @param name
   * @param pattern
   * @param page
   */
  public add(
    name: DynamicRouteProps | string,
    pattern?: string,
    page?: string
  ) {
    const options: DynamicRouteProps =
      name instanceof Object ? name : this.createOption(name, pattern, page);

    if (this.findByName(options.name)) {
      throw new Error(`Route "${options.name}" already exists`);
    }

    this._routes.push(new Route(options));

    this.emit(EVENT_CHANGE);
    return this;
  }

  /**
   *
   * @param name
   * @param pattern
   * @param page
   */
  public set(
    name: DynamicRouteProps | string,
    pattern?: string,
    page?: string
  ) {
    const options: DynamicRouteProps =
      name instanceof Object ? name : this.createOption(name, pattern, page);

    const curRoute = this.findByName(options.name);
    if (!!curRoute) {
      if (options.pattern) curRoute.updatePattern(options.pattern);
      if (options.page) curRoute.updatePage(options.page);
    } else {
      this._routes.push(new Route(options));
    }

    this.emit(EVENT_CHANGE);

    return this;
  }

  public findByName(name: string): Route | null {
    if (name) {
      return this._routes.filter((route) => route.name === name)[0];
    }
    return null;
  }

  public match(url: string) {
    const parsedUrl = parse(url, true);
    const { pathname, query } = parsedUrl;

    return this._routes.reduce(
      (result: any, route: any) => {
        if (result.route) return result;
        const params = route.match(pathname);
        if (!params) return result;
        return { ...result, route, params, query: { ...query, ...params } };
      },
      { route: null, query, parsedUrl }
    );
  }

  public findAndGetUrls(
    nameOrUrl: string,
    params = {}
  ): DynamicRouteMatchResult {
    const route = this.findByName(nameOrUrl);

    if (route) {
      return { route, urls: route.getUrls(params), byName: true };
    } else {
      const { route, query } = this.match(nameOrUrl);
      const href = route ? route.getHref(query) : nameOrUrl;
      const urls = { href, as: nameOrUrl };
      return { route, urls, byName: false };
    }
  }

  /**
   * Provide the handler for server-side
   * for the path request (IncomingMessage) handling
   * @param app
   * @param customHandler
   */
  public getRequestHandler(app: any, customHandler: any = null) {
    const nextHandler = app.getRequestHandler();

    return (
      req: any,
      res: any,
      queryHandler: RequestHandlerQueryCallback | null = null
    ) => {
      const { route, query, parsedUrl } = this.match(req.url);

      if (route) {
        if (!!customHandler) {
          customHandler({
            req,
            res,
            route,
            query: queryHandler ? queryHandler({ req, query, route }) : query,
            parsedUrl,
          });
        } else {
          app.render(
            req,
            res,
            route.page,
            queryHandler ? queryHandler({ req, query, route }) : query,
            parsedUrl
          );
        }
      } else {
        nextHandler(req, res, parsedUrl);
      }
    };
  }
}

export default Registry;
