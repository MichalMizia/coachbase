import Editor from "./@components/Editor";
import initMongoose from "@/lib/db";
import Article, { ArticleType } from "@/model/article";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";

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

  const whitelisted_emails = process.env.WHITELISTED_EMAILS?.split(
    ", "
  ) as string[];
  if (
    !session ||
    !session.user.email ||
    !whitelisted_emails.includes(session.user.email)
  ) {
    redirect("/");
  }

  const { postId } = params;
  console.log(postId);

  const post = await getPost(postId);
  if (!post) {
    throw new Error("Taki artykuł nie istnieje");
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
