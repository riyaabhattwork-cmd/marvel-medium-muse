// import { useQuery as apolloUseQuery } from "@apollo/client";
// import { GET_ARTICLES } from "@/lib/graphql/queries";
// import ArticleCard from "@/components/ArticleCard";
// import { Skeleton } from "@/components/ui/skeleton";
// import { BookOpen } from "lucide-react";

// const Home = () => {
//   const { loading, error, data } = apolloUseQuery(GET_ARTICLES);

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//           <h2 className="text-2xl font-bold mb-2">Unable to load articles</h2>
//           <p className="text-muted-foreground">
//             Please make sure your GraphQL server is running
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="gradient-hero text-primary-foreground py-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif animate-fade-in">
//             Where stories come to life
//           </h1>
//           <p className="text-xl md:text-2xl opacity-90 animate-slide-up">
//             Discover perspectives, share your voice, and connect with writers
//             worldwide
//           </p>
//         </div>
//       </section>

//       {/* Articles Section */}
//       <section className="max-w-5xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold mb-8 text-foreground">
//           Latest Stories
//         </h2>

//         {loading ? (
//           <div className="space-y-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="border border-border rounded-lg p-6">
//                 <Skeleton className="h-8 w-3/4 mb-4" />
//                 <Skeleton className="h-4 w-full mb-2" />
//                 <Skeleton className="h-4 w-full mb-2" />
//                 <Skeleton className="h-4 w-2/3 mb-4" />
//                 <div className="flex items-center space-x-2">
//                   <Skeleton className="h-8 w-8 rounded-full" />
//                   <Skeleton className="h-4 w-24" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {data?.articles?.articles?.length > 0 ? (
//               data.articles.articles.map((article: any) => (
//                 <ArticleCard
//                   key={article.id}
//                   slug={article.slug}
//                   title={article.title}
//                   body={article.body}
//                   author={article.author}
//                   createdAt={article.createdAt}
//                 />
//               ))
//             ) : (
//               <div className="text-center py-12">
//                 <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//                 <h3 className="text-2xl font-bold mb-2">No stories yet</h3>
//                 <p className="text-muted-foreground">
//                   Be the first to share your story!
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Home;
import { useQuery as apolloUseQuery } from "@apollo/client";
import { GET_ARTICLES } from "@/lib/graphql/queries";
import ArticleCard from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

const Home = () => {
  const { loading, error, data } = apolloUseQuery(GET_ARTICLES);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-center">
        <div>
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-500" />
          <h2 className="text-2xl font-serif font-semibold mb-2 text-gray-900">
            Unable to load articles
          </h2>
          <p className="text-gray-600">
            Please make sure your GraphQL server is running properly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 🌟 Hero Section */}
      <section className="bg-[#1A8917]/5 border-b border-gray-200 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-in">
            Where good ideas find you
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slide-up">
            Read and share stories that matter — ideas that shape our world and connect people through writing.
          </p>
          <button className="px-6 py-3 bg-[#1A8917] text-white font-medium rounded-full hover:bg-[#166f13] transition-all duration-200 ease-in-out">
            Start Reading
          </button>
        </div>
      </section>

      {/* 📰 Trending Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 font-serif">
          Trending on Scribe
        </h2>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4 border border-gray-200 p-4 rounded-xl shadow-sm">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {data?.articles?.articles?.slice(0, 6).map((article: any) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                body={article.body}
                author={article.author}
                createdAt={article.createdAt}
              />
            ))}
          </div>
        )}
      </section>

      {/* 🧾 Recommended Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 font-serif">
          Recommended for You
        </h2>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : data?.articles?.articles?.length > 0 ? (
          <div className="space-y-10">
            {data.articles.articles.map((article: any) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                body={article.body}
                author={article.author}
                createdAt={article.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold mb-2 font-serif">
              No stories yet
            </h3>
            <p>Be the first to share your thoughts and ideas!</p>
          </div>
        )}
      </section>

      {/* 🌍 Footer */}
      <footer className="border-t border-gray-200 py-10 bg-gray-50 text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Scribe — Built for storytellers.</p>
          <div className="flex space-x-6">
            {["About", "Help", "Terms", "Privacy", "Careers"].map((item) => (
              <a key={item} href="#" className="hover:text-gray-900 transition">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
