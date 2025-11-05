import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery as apolloUseQuery,
  useMutation as apolloUseMutation,
} from "@apollo/client";
import { GET_ARTICLE } from "@/lib/graphql/queries";
import { UPDATE_ARTICLE } from "@/lib/graphql/mutations";
import ArticleEditor from "@/components/ArticleEditor";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { isAuthenticated } from "@/lib/auth";
import { useEffect } from "react";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to edit articles",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [authenticated, navigate, toast]);

  const { loading, error, data } = apolloUseQuery(GET_ARTICLE, {
    variables: { slug: id || "0" },
  });

  const [updateArticle, { loading: updating }] = apolloUseMutation(
    UPDATE_ARTICLE,
    {
      onCompleted: (data) => {
        toast({
          title: "Article updated!",
          description: "Your changes have been saved",
        });
        // navigate to the updated article's slug (title change may update slug)
        const newSlug = data?.updateArticle?.slug || id;
        navigate(`/article/${newSlug}`);
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

  const handleSave = async (title: string, content: string) => {
    const description = content.substring(0, 160);
    await updateArticle({
      variables: {
        slug: id || "0",
        input: { title, description, body: content },
      },
    });
  };

  if (!authenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !data?.article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Article not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ArticleEditor
        initialTitle={data.article.title}
        initialContent={data.article.body}
        onSave={handleSave}
        isLoading={updating}
      />
    </div>
  );
};

export default EditArticle;
