import { Separator } from "@/components/ui/separator";
import Editor from "./@components/Editor";
import initMongoose from "@/lib/db";
import Article, { ArticleType } from "@/model/article";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const getPost = async (postId: string): Promise<ArticleType | null> => {
  await initMongoose();

  const post: ArticleType | null = await Article.findById(postId);
  return post;
};

interface pageProps {
  params: {
    postId: string;
  };
}

const Page = async ({ params }: pageProps) => {
  const session = await getServerSession(authOptions);

  const { postId } = params;
  console.log(postId);

  const post = await getPost(postId);
  if (!post) {
    throw new Error("Taki artykuł nie istnieje");
  }

  if (post.userId.toString() !== session?.user._id) {
    throw new Error("Nie masz uprawnień do edycji tego artykułu");
  }

  return (
    <Editor
      className={`article-editor`}
      post={post}
      userId={session.user._id}
    />
  );
};

export default Page;
