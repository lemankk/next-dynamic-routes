import Registry from "./Registry";
declare const createUseRouteRegistry: (registry: Registry) => () => {
    matches: {
        route: import("./Route").Route;
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
        byName: boolean;
    };
};
export default createUseRouteRegistry;
//# sourceMappingURL=createUseRouteRegistry.d.ts.map