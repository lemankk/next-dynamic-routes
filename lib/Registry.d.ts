import Route from "./Route";
import { RouteOption } from "./types";
export declare class Registry {
    routes: Route[];
    constructor();
    createOption(name: string | Object, pattern?: string, page?: string): any;
    add(options: RouteOption): this;
    set(options: RouteOption): this;
    findByName(name: string): Route | null;
    match(url: string): any;
    findAndGetUrls(nameOrUrl: string, params?: {}): {
        route: Route;
        urls: {
            as: any;
            href: string;
        };
        byName: boolean;
    } | {
        route: any;
        urls: {
            href: any;
            as: string;
        };
        byName?: undefined;
    };
    getRequestHandler(app: any, customHandler?: any): (req: any, res: any) => void;
}
export default Registry;
//# sourceMappingURL=Registry.d.ts.map