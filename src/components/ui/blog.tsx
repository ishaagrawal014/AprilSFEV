import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Calendar, Clock, Trash2, Upload } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface Blog {
    id: number;
    title: string;
    excerpt: string;
    tag: 'Maintenance' | 'TCO Strategy' | 'Operations' | 'Insights';
    date: string;
    image: string;
    readTime: string;
}

const BlogSection: React.FC = () => {
    // Verified Image Database
    const fallbackImages: Record<Blog['tag'], string[]> = {
        "Maintenance": [
            "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
        ],
        "TCO Strategy": [
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        ],
        "Operations": [
            "https://images.unsplash.com/photo-1519003722824-192d992a6059?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
        ],
        "Insights": [
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
        ]
    };

    const initialBlogs: Blog[] = [
        {
            id: 1,
            title: "Stop Waiting for Breakdowns: Proactive Service",
            excerpt: "Shifting from reactive maintenance to a predictive model to ensure maximum uptime for EV fleets.",
            tag: "Maintenance",
            date: "Feb 2026",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "The Sticker Price Trap",
            excerpt: "Analyzing why acquisition cost is a misleading metric and why service support defines long-term ROI.",
            tag: "TCO Strategy",
            date: "Feb 2026",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
            readTime: "4 min read"
        },
        {
            id: 3,
            title: "The EV Maintenance Myth",
            excerpt: "Debunking common misconceptions about electric vehicle upkeep that fleet managers often get wrong.",
            tag: "Maintenance",
            date: "Feb 2026",
            image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800",
            readTime: "4 min read"
        },
        {
            id: 4,
            title: "Charging Is Killing Your Uptime",
            excerpt: "Why battery swapping is the only viable path for high-utilization commercial fleets.",
            tag: "Operations",
            date: "Feb 2026",
            image: "https://images.unsplash.com/photo-1519003722824-192d992a6059?auto=format&fit=crop&q=80&w=800",
            readTime: "6 min read"
        },
        {
            id: 5,
            title: "Stop Measuring Range",
            excerpt: "Shifting the focus from battery capacity to daily operational utility and fleet availability.",
            tag: "Insights",
            date: "Feb 2026",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
            readTime: "3 min read"
        }
    ];

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newBlog, setNewBlog] = useState<Omit<Blog, 'id' | 'date'>>({
        title: '', excerpt: '', tag: 'Insights', image: '', readTime: '4 min read'
    });

    useEffect(() => {
        const saved = localStorage.getItem('speedforce_hub_final_v5');
        if (saved) {
            setBlogs(JSON.parse(saved));
        } else {
            setBlogs(initialBlogs);
            localStorage.setItem('speedforce_hub_final_v5', JSON.stringify(initialBlogs));
        }
    }, []);

    const handleAddBlog = (e: React.FormEvent) => {
        e.preventDefault();
        let finalImage = newBlog.image;

        if (!finalImage) {
            const categoryImages = fallbackImages[newBlog.tag];
            finalImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];
        }

        const blogToAdd: Blog = {
            ...newBlog,
            id: Date.now(),
            image: finalImage,
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        const updated = [blogToAdd, ...blogs];
        setBlogs(updated);
        localStorage.setItem('speedforce_hub_final_v5', JSON.stringify(updated));
        setIsModalOpen(false);
        setNewBlog({ title: '', excerpt: '', tag: 'Insights', image: '', readTime: '4 min read' });
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center mb-16">
                    <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">
                        SPEEDFORCE <span className="text-blue-600">HUB</span>
                    </h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-slate-900 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
                    >
                        <Plus size={20} /> New Insight
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {blogs.map((blog) => (
                        <article key={blog.id} className="group flex flex-col">
                            <div className="h-64 rounded-[2rem] overflow-hidden mb-6 relative shadow-sm border border-slate-100">
                                <img
                                    src={blog.image}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800";
                                    }}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={blog.title}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                        {blog.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="px-2">
                                <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-3">
                                    {blog.title}
                                </h4>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {blog.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                                        <span className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12}/> {blog.readTime}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const updated = blogs.filter(b => b.id !== blog.id);
                                            setBlogs(updated);
                                            localStorage.setItem('speedforce_hub_final_v5', JSON.stringify(updated));
                                        }}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                        aria-label="Delete Insight"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Create Publication</h4>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
                            </div>
                            <form onSubmit={handleAddBlog} className="space-y-6">
                                <input
                                    required
                                    placeholder="Publication Title"
                                    value={newBlog.title}
                                    onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                                    className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                />
                                <textarea
                                    required
                                    placeholder="Executive Summary"
                                    rows={3}
                                    value={newBlog.excerpt}
                                    onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})}
                                    className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <select
                                        value={newBlog.tag}
                                        onChange={e => setNewBlog({...newBlog, tag: e.target.value as Blog['tag']})}
                                        className="p-4 bg-slate-50 rounded-2xl font-bold text-xs uppercase tracking-widest cursor-pointer outline-none"
                                    >
                                        <option value="Insights">Insights</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="TCO Strategy">TCO Strategy</option>
                                        <option value="Operations">Operations</option>
                                    </select>

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center justify-center bg-slate-50 rounded-2xl cursor-pointer border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                                    >
                                        {newBlog.image ? <span className="text-[10px] font-black text-blue-600 uppercase">File Ready</span> : <Upload size={20} className="text-slate-400" />}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            hidden
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => setNewBlog({...newBlog, image: reader.result as string});
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-slate-900 transition-all uppercase tracking-widest text-xs shadow-lg shadow-blue-100">
                                    Publish to Fleet Hub
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;