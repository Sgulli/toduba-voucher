import { Express } from "express";

/**
 * Logs all registered routes in the Express application
 * @param app Express application instance
 */
export function logRoutes(app: Express): void {
  console.log("\n📋 API Routes:");
  console.log("====================");

  const routes: { method: string; path: string }[] = [];

  // Helper function to print routes
  function print(path: string, layer: any) {
    if (layer.route) {
      layer.route.stack.forEach((stack: any) => {
        const method = Object.keys(stack.method)[0].toUpperCase();
        routes.push({
          method: method,
          path: path + (path === "/" ? "" : "/") + layer.route.path,
        });
      });
    } else if (layer.name === "router" && layer.handle.stack) {
      // It's a mounted router
      let routerPath = path;
      if (layer.regexp) {
        // Try to extract real path from RegExp
        const match = layer.regexp.toString().match(/^\/\^((?:\\\/|[^\/])+)/);
        if (match) {
          routerPath = match[1].replace(/\\\//, "/");
          if (routerPath !== "/") {
            routerPath = "/" + routerPath.replace(/\\\//g, "/");
          }
        }
      }
      layer.handle.stack.forEach((stackItem: any) => {
        print(routerPath, stackItem);
      });
    }
  }

  // Start with the main router stack
  app._router.stack.forEach((layer: any) => {
    print("", layer);
  });

  // Sort routes by path for better readability
  routes.sort((a, b) => {
    if (a.path === b.path) {
      return a.method.localeCompare(b.method);
    }
    return a.path.localeCompare(b.path);
  });

  // Clean up paths (replace regex artifacts)
  const cleanRoutes = routes.map((route) => ({
    method: route.method,
    path: route.path
      .replace(/\\/g, "")
      .replace(/\^/g, "")
      .replace(/\$/g, "")
      .replace(/\(/g, ":")
      .replace(/\)/g, "")
      .replace(/\?/g, "")
      .replace(/\/+/g, "/"),
  }));

  // Format and log each route
  cleanRoutes.forEach((route) => {
    console.log(`${route.method.padEnd(7)} ${route.path}`);
  });

  console.log("====================");
  console.log(`Total routes: ${cleanRoutes.length}\n`);
}
