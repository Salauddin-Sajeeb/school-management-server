// server.js
const express = require("express");
const cors = require("cors");

const app = express();

// --- CORS
// NOTE: If you use credentials, '*' is not allowed by browsers.
// Prefer setting a specific origin via an env var like CORS_ORIGIN.
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// --- body parsing (no need for body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- health/base routes
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to school-manager application." });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- your feature routes (unchanged paths)
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

// --- Export a handler for Vercel serverless runtime
module.exports = (req, res) => app(req, res);

// --- Local dev server (Vercel ignores this)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Express running on http://localhost:${PORT}`));
}
