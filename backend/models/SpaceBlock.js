import mongoose from "mongoose"

const iconSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["emoji", "lucide", "image"],
      default: "emoji",
    },
    value: {
      type: String,
      default: "📁",
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
    description: {
      type: String,
      default: "",
      maxLength: 1000
    },
    color: {
      type: String,
      default: "#7C3AED",
    },
    parentSpaceBlockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpaceBlock",
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    position: {
      x: {
        type: Number,
        default: 0,
      },
      y: {
        type: Number,
        default: 0,
      },
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    lastOpenedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

spaceBlockSchema.index({
  parentSpaceBlockId: 1,
  isArchived: 1,
})

spaceBlockSchema.index({
  updatedAt: -1
});

spaceBlockSchema.index({
  lastOpenedAt: -1
});

export default mongoose.model("SpaceBlock", spaceBlockSchema)
