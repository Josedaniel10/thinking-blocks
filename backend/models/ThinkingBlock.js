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
      default: "💡",
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
    description: {
      type: String,
      default: "",
      maxLength: 1000
    },
    spaceBlockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpaceBlock",
      index: true,
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

thinkingBlockSchema.index({
  spaceBlockId: 1,
  isArchived: 1,
})

thinkingBlockSchema.index({
  updatedAt: -1
});

thinkingBlockSchema.index({
  lastOpenedAt: -1
});

export default mongoose.model("ThinkingBlock", thinkingBlockSchema)
