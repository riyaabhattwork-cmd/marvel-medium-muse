import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery as apolloUseQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_USER_ARTICLES,
  GET_NOTIFICATIONS,
} from "@/lib/graphql/queries";
import ArticleCard from "@/components/ArticleCard";
import { isAuthenticated } from "@/lib/auth";
import { User, Loader2, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view your profile",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [authenticated, navigate, toast]);

  const { loading, error, data } = apolloUseQuery(GET_CURRENT_USER, {
    skip: !authenticated,
  });

  const {
    loading: articlesLoading,
    error: articlesError,
    data: articlesData,
  } = apolloUseQuery(GET_USER_ARTICLES, {
    skip: !data?.me?.username,
    variables: { filter: { author: data?.me?.username } },
  });

  const { data: notificationsData, loading: notificationsLoading } =
    apolloUseQuery(GET_NOTIFICATIONS, { skip: !authenticated });

  if (!authenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <Card className="p-6 max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Error loading profile</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </Card>
      </div>
    );
  }

  const user = data?.me;

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/20 via-background to-muted/40 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="p-10 shadow-elegant border-border/60 backdrop-blur-md">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-8 mb-10">
            <div className="flex items-center gap-6">
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-inner">
                <User className="h-14 w-14 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-serif font-bold">
                  {user?.username}
                </h1>
                <p className="text-muted-foreground mt-1">{user?.email}</p>
                <div className="flex gap-4 mt-3">
                  <Badge variant="outline" className="text-sm">
                    Followers: {user?.followersCount ?? 0}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Following: {user?.followingCount ?? 0}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="w-full sm:w-64 bg-muted/40 rounded-xl p-4 shadow-inner border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  Notifications
                </h3>
              </div>
              {notificationsLoading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : notificationsData?.notifications?.length ? (
                <ul className="space-y-2 text-sm max-h-36 overflow-y-auto">
                  {notificationsData.notifications.map((n: any) => (
                    <li key={n.id} className="border-b border-border/30 pb-1">
                      <span className="font-medium">{n.actor.username}</span>{" "}
                      {n.type.toLowerCase()}ed your post
                      <span className="text-xs text-muted-foreground block">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No notifications
                </p>
              )}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Articles Section */}
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-6">
              Your Stories
            </h2>
            {articlesLoading ? (
              <p className="text-muted-foreground">Loading your articles…</p>
            ) : articlesError ? (
              <p className="text-muted-foreground">Unable to load articles.</p>
            ) : articlesData?.articles?.articles?.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {articlesData.articles.articles.map((a: any) => (
                  <ArticleCard
                    key={a.id}
                    slug={a.slug}
                    title={a.title}
                    body={a.body}
                    author={a.author}
                    createdAt={a.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12 italic">
                You haven’t written any stories yet.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
