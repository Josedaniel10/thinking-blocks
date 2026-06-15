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

const thinkingBlockSchema = new mongoose.Schema(
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
    spaceBlockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpaceBlock",
      required: true,
      index: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

thinkingBlockSchema.index({
  spaceBlockId: 1,
  isArchived: 1
})

export default mongoose.model("ThinkingBlock", thinkingBlockSchema)
