import mongoose from "mongoose"
import { MONGODB_URI } from "../utils/config.js"

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("🚀 Successful connection to the database")
  } catch (error) {
    console.log('❌ Error connecting to the database')
  }
}


export default connectDB