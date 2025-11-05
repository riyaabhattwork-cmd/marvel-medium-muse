import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ArticleCardProps {
  slug: string;
  title: string;
  body: string;
  author: {
    id: string | number;
    username: string;
  };
  createdAt: string;
}

const ArticleCard = ({
  slug,
  title,
  body,
  author,
  createdAt,
}: ArticleCardProps) => {
  const excerpt =
    (body || "").substring(0, 200) + ((body || "").length > 200 ? "..." : "");

  return (
    <Card className="p-6 hover:shadow-elegant transition-smooth border-border group">
      <Link to={`/article/${slug}`}>
        <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors font-serif">
          {title}
        </h2>
        <p className="text-secondary mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-tertiary">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="font-medium text-secondary">
              {author.username}
            </span>
          </div>
          <time className="text-tertiary">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </time>
        </div>
      </Link>
    </Card>
  );
};

export default ArticleCard;
