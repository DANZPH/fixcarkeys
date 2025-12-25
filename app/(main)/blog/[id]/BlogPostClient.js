'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function BlogPostClient({ post }) {
    const router = useRouter();
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        if (post.created_at) {
            setFormattedDate(new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }));
        }
    }, [post.created_at]);

    // Handle back navigation
    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-white pb-16" style={{ paddingTop: 'clamp(80px, 12vh, 100px)' }}>
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Breadcrumb / Back Link */}
                <button
                    onClick={handleBack}
                    className="inline-flex items-center text-[#778873] hover:text-[#5f6d5c] mb-8 font-medium transition-colors cursor-pointer bg-transparent border-none"
                    style={{ fontSize: '0.95rem' }}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Articles
                </button>

                {/* Article Header */}
                <header className="mb-8 text-center">
                    {post.category && (
                        <span className="inline-block bg-[#F1F3E0] text-[#778873] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                            {post.category}
                        </span>
                    )}

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1f2e] mb-4 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Admin</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formattedDate || '...'}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image - Reduced size */}
                {post.image_url && (
                    <div className="flex justify-center w-full mb-10">
                        <div className="relative w-full max-w-3xl aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={post.image_url}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </div>
                    </div>
                )}

                {/* Content Body - Improved spacing */}
                <article className="prose prose-lg max-w-none">
                    <style jsx global>{`
                        .blog-content h1 {
                            font-size: clamp(1.75rem, 4vw, 2.25rem);
                            font-weight: 700;
                            color: #1a1f2e;
                            margin-top: 2rem;
                            margin-bottom: 1rem;
                            line-height: 1.3;
                        }
                        .blog-content h2 {
                            font-size: clamp(1.4rem, 3vw, 1.75rem);
                            font-weight: 700;
                            color: #1a1f2e;
                            margin-top: 2rem;
                            margin-bottom: 0.75rem;
                            line-height: 1.4;
                        }
                        .blog-content h3 {
                            font-size: clamp(1.2rem, 2.5vw, 1.4rem);
                            font-weight: 600;
                            color: #1a1f2e;
                            margin-top: 1.5rem;
                            margin-bottom: 0.5rem;
                        }
                        .blog-content p {
                            color: #4a5568;
                            line-height: 1.8;
                            margin-bottom: 1.25rem;
                            font-size: clamp(1rem, 2vw, 1.125rem);
                        }
                        .blog-content ul, .blog-content ol {
                            margin-left: 1.5rem;
                            margin-bottom: 1.25rem;
                        }
                        .blog-content li {
                            color: #4a5568;
                            line-height: 1.7;
                            margin-bottom: 0.5rem;
                            font-size: clamp(1rem, 2vw, 1.125rem);
                        }
                        .blog-content ul li {
                            list-style-type: disc;
                        }
                        .blog-content ol li {
                            list-style-type: decimal;
                        }
                        .blog-content a {
                            color: #0056b3;
                            text-decoration: underline;
                        }
                        .blog-content a:hover {
                            color: #003d82;
                        }
                        .blog-content strong {
                            color: #1a1f2e;
                            font-weight: 600;
                        }
                        .blog-content blockquote {
                            border-left: 4px solid #778873;
                            padding-left: 1rem;
                            margin: 1.5rem 0;
                            color: #4a5568;
                            font-style: italic;
                        }
                        .blog-content hr {
                            border: none;
                            border-top: 1px solid #e2e8f0;
                            margin: 2rem 0;
                        }
                        .blog-content code {
                            background: #f1f5f9;
                            padding: 0.125rem 0.375rem;
                            border-radius: 4px;
                            font-family: monospace;
                            font-size: 0.9em;
                        }
                    `}</style>

                    {post.content ? (
                        <div className="blog-content">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 {...props} />,
                                    h2: ({ node, ...props }) => <h2 {...props} />,
                                    h3: ({ node, ...props }) => <h3 {...props} />,
                                    ul: ({ node, ...props }) => <ul {...props} />,
                                    ol: ({ node, ...props }) => <ol {...props} />,
                                    li: ({ node, ...props }) => <li {...props} />,
                                    p: ({ node, ...props }) => <p {...props} />,
                                    a: ({ node, ...props }) => <a {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote {...props} />,
                                    hr: ({ node, ...props }) => <hr {...props} />,
                                    code: ({ node, ...props }) => <code {...props} />,
                                    strong: ({ node, ...props }) => <strong {...props} />,
                                    em: ({ node, ...props }) => <em {...props} />,
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <div className="text-gray-500 italic">
                            <p>{post.excerpt}</p>
                            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="font-semibold text-center">Full article content coming soon.</p>
                            </div>
                        </div>
                    )}
                </article>

                {/* CTA Section */}
                <div className="mt-12 bg-[#F1F3E0] rounded-2xl p-8 md:p-10 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1f2e] mb-3">Need Emergency Car Key Assistance?</h3>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm md:text-base">
                        Don't get stranded. Our expert mobile locksmiths are ready to help you with key replacement, unlocking, and programming.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="tel:07444125447"
                            className="inline-flex items-center justify-center bg-[#ea580c] text-white px-10 py-5 text-xl rounded-xl font-bold hover:bg-[#c2410c] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <Phone className="w-7 h-7 mr-3" />
                            Call Now for Immediate Assistance
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
