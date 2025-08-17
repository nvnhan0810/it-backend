const Ziggy = { "url": "http:\/\/localhost", "port": null, "defaults": {}, "routes": { "home": { "uri": "\/", "methods": ["GET", "HEAD"] }, "posts.show": { "uri": "posts\/{slug}", "methods": ["GET", "HEAD"], "parameters": ["slug"] }, "login": { "uri": "auth\/login", "methods": ["GET", "HEAD"] }, "login.callback": { "uri": "auth\/callback", "methods": ["GET", "HEAD"] }, "storage.local": { "uri": "storage\/{path}", "methods": ["GET", "HEAD"], "wheres": { "path": ".*" }, "parameters": ["path"] } } };
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
