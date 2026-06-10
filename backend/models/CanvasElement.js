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
      required: true,
    },
    bounds: {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    data: {
      type: mongoose.Schema.Types.Mided,
      default: {},
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

export default mongoose.model("CanvasElement", canvasElementSchema)
