import app from "./app.js"
import { PORT } from "./utils/config.js"
import connectDB from "./config/db.js"

app.listen(PORT, () =>
  console.log("Listen server from http://localhost:" + PORT),
)

connectDB()