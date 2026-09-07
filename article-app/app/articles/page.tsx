"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DUMMY_ARTICLES } from "../data/article";

const PAGE_SIZE = 5;

export default function ArticlesFeed() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleArticles = DUMMY_ARTICLES.slice(0, visibleCount);

  return (
    <section className='flex flex-col gap-6 px-5 pb-5 md:px-10 md:pb-10'>
      <div>
        <span className='font-merriweather font-semibold text-lg md:text-2xl inline-block border-b md:border-b-2 border-black pb-1'>
          Suggested
        </span>
      </div>

      <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-8'>
        {visibleArticles.map((article) => (
          // sisi kiri
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className='flex gap-6'>
            <div className='flex-1'>
              <div className='flex gap-2 md:gap-4 text-gray-500 text-sm md:text-xl lg:text-lg'>
                <span>{article.author}</span>
                <span>{article.createdAt}</span>
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
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className='object-cover'
              />
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < DUMMY_ARTICLES.length && (
        <button
          onClick={() =>
            setVisibleCount((currentCount) =>
              Math.min(currentCount + PAGE_SIZE, DUMMY_ARTICLES.length),
            )
          }
          className='bg-tertiary md:text-xl border border-black font-medium rounded-2xl py-1 px-3 mx-auto shadow-tactile hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150'>
          Load More
        </button>
      )}
    </section>
  );
}
