import Link from "next/link";
import Image from "next/image";
import { ArticleCardResponse, formatDate } from "@/services/article.service";

interface ArticleCardProps {
  article: ArticleCardResponse;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className='flex gap-6'>
      <div className='flex-1'>
        <div className='flex gap-2 md:gap-4 text-gray-500 text-sm md:text-xl lg:text-lg'>
          <span>{article.author}</span>
          {article.created_at && (
            <span>{formatDate(article.created_at)}</span>
          )}
        </div>

        <div>
          <h2 className='md:text-2xl lg:text-xl font-bold'>
            {article.title}
          </h2>
          <p className='line-clamp-2 text-sm md:text-xl lg:text-lg text-gray-500'>
            {article.description}
          </p>
        </div>
      </div>

      {/* sisi kanan */}
      <div className='relative w-40 h-24 md:w-60 md:h-36 lg:w-40 lg:h-24'>
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes='(max-width: 768px) 160px, (max-width: 1024px) 240px, 160px'
            className='object-cover'
          />
        ) : (
          <div className='w-full h-full bg-gray-200' />
        )}
      </div>
    </Link>
  );
}
