import React from "react";
import Registry from "./Registry";
import { DynamicRouteLinkProps, NextLinkElementType } from "./types";
declare function createInjectedLink(registry: Registry, Link?: NextLinkElementType | null): (props: DynamicRouteLinkProps) => React.FunctionComponentElement<{
    propTypes?: React.WeakValidationMap<import("next/link").LinkProps> | undefined;
    contextTypes?: import("prop-types").ValidationMap<any> | undefined;
    defaultProps?: Partial<import("next/link").LinkProps> | undefined;
    displayName?: string | undefined;
}>;
export default createInjectedLink;
//# sourceMappingURL=createInjectedLink.d.ts.map