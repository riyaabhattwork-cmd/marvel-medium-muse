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
    <div className="group">
      <Link to={`/article/${slug}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 rounded-full bg-gray-900 flex items-center justify-center">
            <User className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {author.username}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors font-serif line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <time>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </time>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
