import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  useQuery as apolloUseQuery,
  useMutation as apolloUseMutation,
} from "@apollo/client";
import {
  GET_ARTICLE,
  GET_CURRENT_USER,
  GET_COMMENTS,
  GET_USER,
} from "@/lib/graphql/queries";
import {
  DELETE_ARTICLE,
  LIKE_ARTICLE,
  UNLIKE_ARTICLE,
  ADD_COMMENT,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "@/lib/graphql/mutations";
import { formatDistanceToNow } from "date-fns";
import {
  User,
  Trash2,
  Edit,
  Loader2,
  Heart,
  MessageSquare,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { isAuthenticated } from "@/lib/auth";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const authenticated = isAuthenticated();

  const { loading, error, data } = apolloUseQuery(GET_ARTICLE, {
    variables: { slug: id || "0" },
  });

  const { data: meData } = apolloUseQuery(GET_CURRENT_USER, {
    skip: !authenticated,
  });

  const postSlug = data?.article?.slug;
  const authorUsername = data?.article?.author?.username;

  const { data: authorData } = apolloUseQuery(GET_USER, {
    skip: !authorUsername,
    variables: { username: authorUsername },
  });

  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: refetchComments,
  } = apolloUseQuery(GET_COMMENTS, {
    skip: !postSlug,
    variables: { articleSlug: postSlug },
  });

  // open comments panel automatically when there are comments
  React.useEffect(() => {
    if (commentsData?.comments?.length > 0) setShowComments(true);
  }, [commentsData]);

  const [likeArticle] = apolloUseMutation(LIKE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLE, variables: { slug: postSlug } }],
    awaitRefetchQueries: true,
  });

  const [unlikeArticle] = apolloUseMutation(UNLIKE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLE, variables: { slug: postSlug } }],
    awaitRefetchQueries: true,
  });

  const [addComment] = apolloUseMutation(ADD_COMMENT, {
    onCompleted: () => {
      setCommentText("");
      setShowComments(true);
      refetchComments();
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const [followUser] = apolloUseMutation(FOLLOW_USER, {
    refetchQueries: [
      { query: GET_USER, variables: { username: authorUsername } },
    ],
  });

  const [unfollowUser] = apolloUseMutation(UNFOLLOW_USER, {
    refetchQueries: [
      { query: GET_USER, variables: { username: authorUsername } },
    ],
  });

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [deleteArticle, { loading: deleting }] = apolloUseMutation(
    DELETE_ARTICLE,
    {
      onCompleted: () => {
        toast({
          title: "Article deleted",
          description: "Your article has been removed",
        });
        navigate("/");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle({ variables: { slug: post.slug } });
    }
  };

  const handleLike = () => {
    if (!authenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like articles",
        variant: "destructive",
      });
      return;
    }
    if (!post) return;
    if (post.favorited) {
      unlikeArticle({ variables: { slug: post.slug } });
    } else {
      likeArticle({ variables: { slug: post.slug } });
    }
  };

  const handleFollowToggle = () => {
    if (!authenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to follow users",
        variant: "destructive",
      });
      return;
    }
    const isFollowing = authorData?.user?.following;
    if (isFollowing) {
      unfollowUser({ variables: { username: authorUsername } });
    } else {
      followUser({ variables: { username: authorUsername } });
    }
  };

  const handleAddComment = async () => {
    if (!authenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment",
        variant: "destructive",
      });
      return;
    }
    if (!commentText.trim()) return;
    await addComment({
      variables: { articleSlug: post.slug, body: commentText.trim() },
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <div className="flex items-center space-x-2 mb-8">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error || !data?.article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Article not found</h2>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>
    );
  }

  const post = data.article;
  const currentUser = meData?.me;
  const isAuthor = !!(
    currentUser &&
    post?.author &&
    currentUser.username === post.author.username
  );

  return (
    <article className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-article-title mb-6 font-serif text-foreground">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-12 pb-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {post.author.username}
              </p>
              <p className="text-sm text-tertiary">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/edit/${post.slug}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={handleLike}>
            <Heart className={`mr-2 ${post.favorited ? "text-red-500" : ""}`} />
            {post.likesCount}
          </Button>

          <Button variant="ghost" onClick={() => setShowComments((v) => !v)}>
            <MessageSquare className="mr-2" /> {post.commentsCount}
          </Button>

          {!isAuthor && (
            <Button variant="outline" onClick={handleFollowToggle}>
              {authorData?.user?.following ? (
                <UserMinus className="mr-2" />
              ) : (
                <UserPlus className="mr-2" />
              )}
              {authorData?.user?.following ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        <div className="article-content font-serif">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>

        {showComments && (
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            {commentsLoading ? (
              <p className="text-muted-foreground">Loading comments…</p>
            ) : commentsData?.comments?.length > 0 ? (
              commentsData.comments.map((c: any) => (
                <div key={c.id} className="mb-4 border-b pb-2">
                  <p className="font-medium">
                    {c.author.username}{" "}
                    <span className="text-sm text-tertiary">
                      {formatDistanceToNow(new Date(c.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </p>
                  <p>{c.body}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No comments yet.</p>
            )}

            <div className="mt-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                rows={3}
              />
              <div className="flex justify-end">
                <Button onClick={handleAddComment}>Post comment</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Article;
