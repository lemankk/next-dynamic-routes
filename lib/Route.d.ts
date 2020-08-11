import { DynamicRouteProps } from "./types";
export declare class Route {
    name: string;
    pattern: string;
    page: string;
    regex: RegExp;
    keyNames: string[];
    toPath: any;
    keys: any[];
    constructor(options: DynamicRouteProps);
    updatePattern(pattern: string): void;
    updatePage(page?: string): void;
    match(path: string): any;
    valuesToParams(values: any[]): any;
    getHref(params?: any): string;
    getAs(params?: any): any;
    getUrls(params: any): {
        as: any;
        href: string;
    };
}
export default Route;
//# sourceMappingURL=Route.d.ts.map