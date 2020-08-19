import { pathToRegexp, compile } from "path-to-regexp";
import { toQuerystring } from "./utils";
import { DynamicRouteProps, DynamicRoute } from "./types";

export class Route  implements DynamicRoute{
  public name!: string;
  public pattern!: string;
  public page!: string;
  public regex!: RegExp;
  public keyNames!: string[];
  public toPath!: any;
  public keys!: any[];

  constructor(options: DynamicRouteProps) {
    const { name, pattern, page = name } = options;
    if (!name && !page) {
      throw new Error(`Missing page to render for route "${pattern}"`);
    }

    this.name = name;
    if (page) this.updatePage(page);
    if (pattern) this.updatePattern(pattern);
  }

  updatePattern (pattern: string) {
    if ( this.pattern !== pattern ) {
      this.pattern = pattern || `/${this.name}`;
      this.regex = pathToRegexp(this.pattern, (this.keys = []));
      this.keyNames = this.keys.map((key) => key.name);
      this.toPath = compile(this.pattern);
    }
  }

  updatePage (page: string = '') {
    if ( this.page !== page ) {
      this.page = `${page}`.replace(/(^|\/)index$/, "").replace(/^\/?/, "/");
    }
  }

  match(path: string) {
    const values = this.regex.exec(path);
    if (values) {
      return this.valuesToParams(values.slice(1));
    }
  }

  valuesToParams(values: any[]) {
    return values.reduce((params, val, i) => {
      if (val === undefined) return params;
      return Object.assign(params, {
        [this.keys[i].name]: decodeURIComponent(val),
      });
    }, {});
  }

  getHref(params: any = {}) {
    return `${this.page}?${toQuerystring(params)}`;
  }

  getAs(params: any = {}) {
    const as = this.toPath(params) || "/";
    const keys = Object.keys(params);
    const qsKeys = keys.filter((key) => this.keyNames.indexOf(key) === -1);

    if (!qsKeys.length) return as;

    const qsParams = qsKeys.reduce(
      (qs, key) =>
        Object.assign(qs, {
          [key]: params[key],
        }),
      {}
    );

    return `${as}?${toQuerystring(qsParams)}`;
  }

  getUrls(params: any) {
    const as = this.getAs(params);
    const href = this.getHref(params);
    return { as, href };
  }
}
export default Route;
