"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import Modal from "@/components/ui/Modal";
import { newsContent, type NewsArticle } from "@/content/news";

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>(newsContent.articles);
  const [active, setActive] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (newsContent.source !== "cms" || !newsContent.cmsUrl) return;

    let cancelled = false;
    setLoading(true);
    fetch(newsContent.cmsUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load news");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.items ?? data?.data ?? [];
        const mapped: NewsArticle[] = list.slice(0, 6).map(
          (item: Record<string, unknown>, index: number) => ({
            id: String(item.id ?? index),
            title: String(item.title ?? "Untitled"),
            excerpt: String(item.excerpt ?? item.description ?? ""),
            date: String(item.date ?? item.publishedAt ?? ""),
            image: String(item.image ?? item.featuredImage ?? newsContent.articles[0]?.image),
            url: item.url ? String(item.url) : undefined,
            htmlContent: item.htmlContent
              ? String(item.htmlContent)
              : item.content
                ? String(item.content)
                : undefined,
          }),
        );
        if (mapped.length) setArticles(mapped);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load news");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SectionShell id="news" variant="default" className="bg-navy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {newsContent.title}
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-cream text-sm">Loading articles…</p>
        ) : null}
        {error ? (
          <p className="text-center text-red-400 text-sm mb-6">{error}</p>
        ) : null}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => {
                if (article.url && !article.htmlContent) {
                  window.open(article.url, "_blank", "noopener,noreferrer");
                  return;
                }
                setActive(article);
              }}
              className="text-left bg-navy-light border border-white/10 overflow-hidden hover:border-gold/40 transition-colors"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 space-y-2">
                {article.date ? (
                  <p className="text-xs text-gold tracking-widest uppercase">
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                ) : null}
                <h3 className="text-white font-semibold">{article.title}</h3>
                <p className="text-cream text-sm line-clamp-3">{article.excerpt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active ? (
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover"
                sizes="800px"
              />
            </div>
            {active.date ? (
              <p className="text-xs text-gold tracking-widest uppercase">
                {new Date(active.date).toLocaleDateString()}
              </p>
            ) : null}
            {active.htmlContent ? (
              <div
                className="prose prose-invert max-w-none text-cream text-sm"
                dangerouslySetInnerHTML={{ __html: active.htmlContent }}
              />
            ) : (
              <p className="text-cream text-sm">{active.excerpt}</p>
            )}
          </div>
        ) : null}
      </Modal>
    </SectionShell>
  );
}
