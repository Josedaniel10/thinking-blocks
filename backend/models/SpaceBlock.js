import mongoose from "mongoose"

const iconSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["emoji", "lucide", "image"],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
)

const spaceBlockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 80,
    },
    icon: {
      type: iconSchema,
      required: true,
    },
    color: {
      type: String,
      default: "#7C3AED",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
)

export default mongoose.model("SpaceBlock", spaceBlockSchema)
