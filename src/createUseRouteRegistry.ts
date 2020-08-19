import { useRouter } from "next/router";
import Registry from "./Registry";

const createUseRouteRegistry = (registry: Registry) => {
  return () => {
    const router = useRouter();
    const matches = registry.findAndGetUrls(router.asPath, router.query);;
    return {
      matches,
    }
  }
}

export default createUseRouteRegistry;

