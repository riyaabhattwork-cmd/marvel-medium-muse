import { useNavigate } from "react-router-dom";
import { useMutation as apolloUseMutation } from "@apollo/client";
import { CREATE_ARTICLE } from "@/lib/graphql/mutations";
import { GET_ARTICLES } from "@/lib/graphql/queries";
import ArticleEditor from "@/components/ArticleEditor";
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated } from "@/lib/auth";
import { useEffect } from "react";

const Write = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to write articles",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [authenticated, navigate, toast]);

  const [createArticle, { loading }] = apolloUseMutation(CREATE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLES }],
    onCompleted: (data) => {
      toast({
        title: "Article published!",
        description: "Your story is now live",
      });
      // navigate to the article slug
      navigate(`/article/${data.createArticle.slug}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = async (title: string, content: string) => {
    const description = content.substring(0, 160);
    await createArticle({
      variables: {
        input: { title, description, body: content, tagList: [] },
      },
    });
  };

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <ArticleEditor onSave={handleSave} isLoading={loading} />
    </div>
  );
};

export default Write;
