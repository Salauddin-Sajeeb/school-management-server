// CommonJS version (works on Vercel's @vercel/node runtime)
// If you use ESM ("type":"module"), tell me and I’ll send the ESM variant.

const express = require("express");
const cors = require("cors");

const app = express();

/* -----------------------  C O R S  ----------------------- */
// Allow credentialed requests (cookies) from an allowlist of origins.
// IMPORTANT: With credentials=true you CANNOT send "*" for Access-Control-Allow-Origin.
const ALLOWED = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// Make cache vary by Origin so CDNs don't mix responses across sites
app.use((req, res, next) => {
  res.setHeader("Vary", "Origin");
  next();
});

app.use(
  cors({
    origin(origin, cb) {
      // Allow non-browser tools (curl/postman) with no Origin header
      if (!origin) return cb(null, true);
      if (ALLOWED.length === 0) return cb(null, true); // permissive if not configured
      return cb(null, ALLOWED.includes(origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Preflight
app.options("*", cors());

/* --------------------  B O D Y  P A R S E R S  -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------------  H E A L T H  ------------------------ */
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to school-manager application." });
});
app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* -----------------------  R O U T E S  ----------------------- */
// Keep your existing route modules & paths
require("./app/api/class.js")(app);
require("./app/api/section.js")(app);
require("./app/api/period.js")(app);
require("./app/api/subject.js")(app);
require("./app/api/teacher.js")(app);
require("./app/api/routine.js")(app);
require("./app/api/school_info.js")(app);
require("./app/api/day.js")(app);
require("./app/api/session.js")(app);
require("./app/api/shift.js")(app);
require("./app/api/attendance.js")(app);
require("./app/api/homework.js")(app);
require("./app/api/users.js")(app);
require("./app/api/student.js")(app);
require("./app/api/notice.js")(app);
require("./app/api/student_present_status")(app);
require("./app/api/exam_info")(app);
require("./app/api/admin")(app);
require("./app/api/markCount")(app);
require("./app/api/academicCalender")(app);
require("./app/api/school_admin")(app);
require("./app/api/super_admin")(app);
require("./app/api/exam.marks")(app);

/* --------------------  E R R O R  H A N D L E R  -------------------- */
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  const status = err.status || 500;
  res.status(status).json({
    error: "server_error",
    message: err.message || "Internal Server Error",
  });
});

/* ---------  Vercel serverless export (NO app.listen here)  --------- */
module.exports = (req, res) => app(req, res);

/* ---------------  Local dev server (ignored by Vercel)  --------------- */
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Express running locally at http://localhost:${PORT}`)
  );
}
