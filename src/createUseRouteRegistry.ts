import { useRouter } from "next/router";
import Registry from "./Registry";
import { UseRouteDynamicResponse, CreateUseRouteDynamicResponse } from "./types";

const createUseRouteRegistry = (registry: Registry): CreateUseRouteDynamicResponse => {
  return (): UseRouteDynamicResponse => {
    const router = useRouter();
    const matches = registry.findAndGetUrls(router.asPath, router.query);;
    return {
      matches,
    }
  }
}

export default createUseRouteRegistry;

