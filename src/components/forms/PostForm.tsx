import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { generatePath, useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { PostValidation } from "@/lib/validation";
import FileUploader from "../shared/FileUploader";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { routes } from "@/constants";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "../shared/Loader";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();
  const { user } = useUserContext();

  const form = useForm<TypeOf<typeof PostValidation>>({
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
    resolver: zodResolver(PostValidation),
  });

  async function onSubmit(values: TypeOf<typeof PostValidation>) {
    if (!!post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        toast({ title: "Please try again" });
      }

      return navigate(generatePath(routes.posts, { id: post.$id }));
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({ title: "Please try again" });
    }

    navigate(routes.home);
  }

  const handleCancel = () => {
    form.reset();
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">{"Caption"}</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">{"Add Photo"}</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChanged={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                {"Add Location"}
              </FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                {'Add Tags (seperated by coma " , ")'}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="JS, React, NextJS"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={handleCancel}
          >
            {"Cancel"}
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={!form.formState.isDirty}
          >
            {isCreatingPost || isUpdatingPost ? (
              <div className="flex-center gap-2">
                <Loader /> {"Loading..."}
              </div>
            ) : (
              `${action} post`
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
