import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeaturedMedia {
  source_url: string;
  alt_text?: string;
}

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}

function truncate(text: string, max = 120): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

function getFeaturedAlt(post: WPPost): string {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? post.title.rendered;
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm animate-pulse">
      <div className="w-full h-52 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-100 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: WPPost }) {
  const image = getFeaturedImage(post);
  const alt = getFeaturedAlt(post);
  const title = post.title.rendered;
  const excerpt = truncate(stripHtml(post.excerpt.rendered));
  const href = `/blog/${post.slug}`;

  return (
    <a
      href={href}
      className="
        group flex flex-col rounded-2xl overflow-hidden bg-white
        border border-slate-100 shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:border-slate-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
      "
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
            <svg
              className="w-10 h-10 text-emerald-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Tag pill overlay */}
        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
          EV Insights
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <h3 className="text-slate-900 font-semibold text-base leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">{excerpt}</p>

        {/* Read More */}
        <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium mt-1 group-hover:gap-2.5 transition-all duration-200">
          Read More
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </a>
  );
}

// ─── Error Fallback ────────────────────────────────────────────────────────────

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <div>
        <p className="text-slate-700 font-medium">Could not load latest posts</p>
        <p className="text-slate-400 text-sm mt-1">Check your connection and try again.</p>
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors duration-200"
      >
        Retry
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const API_URL =
  "https://speedforceev.in/blog/wp-json/wp/v2/posts?_embed&per_page=3";

export default function BlogPreview() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: WPPost[] = await res.json();
      setPosts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-[0.2em]">
              View our Blogs
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Latest Insights
            </h2>
          </div>
          <a
            href="/blog"
            className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors duration-200 underline-offset-4 hover:underline"
          >
            View all posts →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : error ? (
            <ErrorFallback onRetry={fetchPosts} />
          ) : posts.length === 0 ? (
            <p className="col-span-full text-center text-slate-400 py-12">No posts found.</p>
          ) : (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </section>
  );
}