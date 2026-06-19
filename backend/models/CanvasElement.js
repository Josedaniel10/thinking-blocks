import mongoose from "mongoose"

const canvasElementSchema = new mongoose.Schema(
  {
    thinkingBlockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ThinkingBlock",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "text",
        "image",
        "video",
        "file",
        "table",
        "drawing",
        "thinking_block_reference",
      ],
      default: "text",
    },
    bounds: {
      x: {
        type: Number,
        default: 0,
      },
      y: {
        type: Number,
        default: 0,
      },
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 0,
      },
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    version: {
      type: Number,
      default: 1,
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

canvasElementSchema.index({
  thinkingBlockId: 1,
  isArchived: 1,
})

export default mongoose.model("CanvasElement", canvasElementSchema)
