import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { toast } from "@/components/ui/use-toast";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError,
  } = useGetRecentPosts();

  if (isError) {
    toast({ title: "Failed to get recent posts" });
    return (
      <div className="flex w-full">
        {"Something went wrong. Please try again later"}
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">{"Home Feed"}</h2>

          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-1 flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
