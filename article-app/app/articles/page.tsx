import ArticleList from "../components/ArticleList";
import { fetchArticles, ArticleCardResponse } from "@/services/article.service";

export const dynamic = "force-dynamic";

export default async function ArticlesFeed() {
  let initialArticles: ArticleCardResponse[] = [];
  let initialNextCursor: number | null = null;
  let initialHasMore = false;

  try {
    const response = await fetchArticles({ limit: 10 });
    initialArticles = response.data;
    initialNextCursor = response.meta.nextCursor;
    initialHasMore = response.meta.hasMore;
  } catch (err) {
    console.error("Error fetching initial articles during SSR:", err);
  }

  return (
    <section className='flex flex-col gap-6 px-5 pb-5 md:px-10 md:pb-10'>
      <div>
        <span className='font-merriweather font-semibold text-lg md:text-2xl inline-block border-b md:border-b-2 border-black pb-1'>
          Suggested
        </span>
      </div>

      <ArticleList
        initialArticles={initialArticles}
        initialNextCursor={initialNextCursor}
        initialHasMore={initialHasMore}
      />
    </section>
  );
}
