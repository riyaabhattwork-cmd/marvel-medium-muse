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
      <section className="bg-[#FFC017] border-b border-black py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-6xl md:text-7xl font-serif font-normal leading-tight mb-8">
              Human stories & ideas
            </h1>
            <p className="text-xl md:text-2xl text-gray-900 mb-8">
              A place to read, write, and deepen your understanding
            </p>
            <button className="px-12 py-3 bg-gray-900 text-white font-normal rounded-full hover:bg-gray-800 transition-all duration-200 text-lg">
              Start reading
            </button>
          </div>
          <div className="flex-1 hidden md:block">
            <div className="text-9xl">M</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-gray-900 w-8"></div>
          <h2 className="text-sm font-medium tracking-wide uppercase">Trending on Scribe</h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {data?.articles?.articles?.slice(0, 6).map((article: any, idx: number) => (
              <div key={article.id} className="flex gap-4">
                <div className="text-3xl font-serif text-gray-200 font-bold">0{idx + 1}</div>
                <div className="flex-1">
                  <ArticleCard
                    slug={article.slug}
                    title={article.title}
                    body={article.body}
                    author={article.author}
                    createdAt={article.createdAt}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            {loading ? (
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-gray-200 pb-12">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : data?.articles?.articles?.length > 0 ? (
              <div className="space-y-12">
                {data.articles.articles.map((article: any) => (
                  <div key={article.id} className="border-b border-gray-200 pb-12 last:border-0">
                    <ArticleCard
                      slug={article.slug}
                      title={article.title}
                      body={article.body}
                      author={article.author}
                      createdAt={article.createdAt}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-600">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-serif mb-2">No stories yet</h3>
                <p>Be the first to share your thoughts and ideas!</p>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-sm font-medium mb-4">Discover more of what matters to you</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Programming", "Data Science", "Technology", "Self Improvement", "Writing", "Relationships", "Machine Learning", "Productivity"].map((tag) => (
                  <button key={tag} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition">
                    {tag}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-6 text-xs text-gray-500 space-x-4">
                <a href="#" className="hover:text-gray-900">Help</a>
                <a href="#" className="hover:text-gray-900">Status</a>
                <a href="#" className="hover:text-gray-900">Writers</a>
                <a href="#" className="hover:text-gray-900">Blog</a>
                <a href="#" className="hover:text-gray-900">Careers</a>
                <a href="#" className="hover:text-gray-900">Privacy</a>
                <a href="#" className="hover:text-gray-900">Terms</a>
                <a href="#" className="hover:text-gray-900">About</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
