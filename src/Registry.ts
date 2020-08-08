import { parse } from "url";
import Route from "./Route";
import { RouteOption } from "./types";

export class Registry {
  public routes: Route[] = [];

  constructor() {
    this.routes = [];
  }

  createOption(name: string | Object, pattern?: string, page?: string) {
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

  add(options: RouteOption) {
    if (this.findByName(options.name)) {
      throw new Error(`Route "${options.name}" already exists`);
    }

    this.routes.push(new Route(options));
    return this;
  }

  set(options: RouteOption) {
    const curRoute = this.findByName(options.name);
    if (!!curRoute) {
      if (options.pattern) curRoute.updatePattern(options.pattern);
      if (options.page) curRoute.updatePage(options.page);
    } else {
      this.routes.push(new Route(options));
    }
    return this;
  }

  findByName(name: string): Route | null {
    if (name) {
      return this.routes.filter((route) => route.name === name)[0];
    }
    return null
  }

  match(url: string) {
    const parsedUrl = parse(url, true);
    const { pathname, query } = parsedUrl;

    return this.routes.reduce(
      (result: any, route: any) => {
        if (result.route) return result;
        const params = route.match(pathname);
        if (!params) return result;
        return { ...result, route, params, query: { ...query, ...params } };
      },
      { route: null, query, parsedUrl }
    );
  }

  findAndGetUrls(nameOrUrl: string, params = {}) {
    const route = this.findByName(nameOrUrl);

    if (route) {
      return { route, urls: route.getUrls(params), byName: true };
    } else {
      const { route, query } = this.match(nameOrUrl);
      const href = route ? route.getHref(query) : nameOrUrl;
      const urls = { href, as: nameOrUrl };
      return { route, urls };
    }
  }

  getRequestHandler(app: any, customHandler: any = null) {
    const nextHandler = app.getRequestHandler();

    return (req: any, res: any) => {
      const { route, query, parsedUrl } = this.match(req.url);

      if (route) {
        if (!!customHandler) {
          customHandler({ req, res, route, query });
        } else {
          app.render(req, res, route.page, query);
        }
      } else {
        nextHandler(req, res, parsedUrl);
      }
    };
  }
}

export default Registry;
