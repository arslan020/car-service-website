import Link from "next/link";
import { BlogPostEditor } from "@/components/blog-post-editor";

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/blog" className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-[#0F63FF]">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to blog
        </Link>
        <h1 className="text-2xl font-extrabold text-[#020F3D]">New post</h1>
        <p className="mt-0.5 text-sm text-slate-500">Write a new article for your website&apos;s blog.</p>
      </div>
      <BlogPostEditor />
    </div>
  );
}
