import Link from "next/link";
import Image from "next/image";
import { LuArrowLeft } from "react-icons/lu";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { fetchArticleById, formatDate } from "@/services/article.service";

export const dynamic = "force-dynamic";

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = await params;

  const article = await fetchArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <article className='px-6 md:px-10 py-3 lg:pt-0 lg:pb-10 flex flex-col gap-4 md:gap-8'>
      <Link
        href='/articles'
        className='flex items-center gap-2 text-secondary font-medium md:text-xl lg:text-xl'>
        <LuArrowLeft />
        Back to All Articles
      </Link>

      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl md:text-4xl lg:text-3xl font-bold'>
          {article.title}
        </h2>

        <div className='flex justify-between text-secondary font-medium md:text-xl lg:text-xl'>
          <span>{article.author}</span>
          <span>{formatDate(article.created_at)}</span>
        </div>
      </div>

      {article.imageUrl && (
        <div className='relative mx-auto aspect-video w-full lg:max-w-xl'>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className='object-cover'
          />
        </div>
      )}

      <div className='flex flex-col text-gray-800 leading-relaxed text-base md:text-lg'>
        {article.content ? (
          <MarkdownRenderer content={article.content} />
        ) : (
          <p className='italic text-gray-500'>{article.description}</p>
        )}
      </div>
    </article>
  );
}
