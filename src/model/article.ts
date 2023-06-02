import { Schema, model, models } from "mongoose";

const ArticleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    impressions: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Articles", timestamps: true }
);

const Article = models?.Article || model("Article", ArticleSchema);

export interface ArticleType {
  
}

export default Article;
