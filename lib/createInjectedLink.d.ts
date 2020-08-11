import React from "react";
import Registry from "./Registry";
import { DynamicRouteLinkProps, NextLinkElementType } from "./types";
declare function createInjectedLink(registry: Registry, Link?: NextLinkElementType | null): React.MemoExoticComponent<(props: DynamicRouteLinkProps) => React.ReactElement<import("next/link").LinkProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>>;
export default createInjectedLink;
//# sourceMappingURL=createInjectedLink.d.ts.map