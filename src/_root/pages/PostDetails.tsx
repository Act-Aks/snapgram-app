import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { formatDate } from "@/lib/utils";
import { Link, generatePath, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id: postId } = useParams();
  const { data: post, isPending: isLoading } = useGetPostById(postId || "");

  const { user } = useUserContext();

  const handleDeletePost = (event: React.MouseEvent) => {
    console.log(event);
  };

  return (
    <div className="post_details-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={generatePath(routes.profile, { id: post?.creator.$id })}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 to-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDate(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  to={generatePath(routes.updatePost, { id: post?.$id })}
                  className={`${user.id !== post?.creator.$id} && "hidden"`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    width={24}
                    height={24}
                    alt="edit"
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant={"ghost"}
                  className={`ghost_details-delete-btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex mt-2 gap-1">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">{`#${tag}`}</li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
