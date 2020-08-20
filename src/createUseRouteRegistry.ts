import { useRouter } from "next/router";
import Registry from "./Registry";
import { UseRouteRegistryResponse, CreateUseRouteDynamicResponse } from "./types";

const createUseRouteRegistry = (registry: Registry): CreateUseRouteDynamicResponse => {
  return (): UseRouteRegistryResponse => {
    const router = useRouter();
    const matches = registry.findAndGetUrls(router.asPath, router.query);;
    return {
      matches,
    }
  }
}

export default createUseRouteRegistry;

