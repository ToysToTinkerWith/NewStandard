const functions = require("firebase-functions");
const next = require("next");

const PUBLIC_FILE = /\.[^/]+$/;
const isDev = process.env.NODE_ENV !== "production";

const app = next({
  dev: isDev,
  dir: __dirname,           // IMPORTANT: treat functions/ as the app root at runtime
  conf: {
    distDir: ".next",       // expects functions/.next
    optimizeFonts: false
  }
});

const handle = app.getRequestHandler();
let preparedApp;

const prepareApp = () => {
  if (!preparedApp) {
    preparedApp = app.prepare().catch((err) => {
      preparedApp = null;
      throw err;
    });
  }

  return preparedApp;
};

const redirectUppercasePath = (req, res) => {
  const parsedUrl = new URL(req.url || "/", "http://newstandard.local");
  const { pathname, search } = parsedUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return false;
  }

  const lowercasePathname = pathname.toLowerCase();

  if (pathname === lowercasePathname) {
    return false;
  }

  res.redirect(308, `${lowercasePathname}${search}`);
  return true;
};

exports.nextServer = functions.https.onRequest(async (req, res) => {
  try {
    if (redirectUppercasePath(req, res)) {
      return;
    }

    await prepareApp();
    return handle(req, res);
  } catch (err) {
    console.error("Next SSR error:", err);
    res.status(500).send("Internal Server Error");
  }
});
