import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2,
    MapPin,
    CheckCircle2,
    X
} from 'lucide-react';
import { videoTestimonials, VideoTestimonial } from '../data/videoTestimonials';

interface VideoCardProps {
    item: VideoTestimonial;
    activePlayingId: number | null;
    onStartPlaying: (id: number) => void;
    onStopPlaying: () => void;
    onOpenModal: (item: VideoTestimonial) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
    item,
    activePlayingId,
    onStartPlaying,
    onStopPlaying,
    onOpenModal,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const isCurrentlyActive = activePlayingId === item.id;

    // Auto-pause if another video starts playing
    useEffect(() => {
        if (!isCurrentlyActive && isPlaying) {
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsPlaying(false);
        }
    }, [isCurrentlyActive, isPlaying]);

    const handleTogglePlay = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            onStopPlaying();
        } else {
            onStartPlaying(item.id);
            // If sitting at the preview timestamp, rewind to start so user hears from beginning
            const previewTarget = item.previewTime || 2;
            if (videoRef.current.currentTime <= previewTarget + 0.5) {
                videoRef.current.currentTime = 0;
            }
            videoRef.current
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((err) => {
                    console.warn("Video playback was interrupted:", err);
                });
        }
    };

    const handleToggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        const newMuted = !isMuted;
        videoRef.current.muted = newMuted;
        setIsMuted(newMuted);
    };

    const handleOpenContainer = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            onStopPlaying();
        }
        onOpenModal(item);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration || 1;
            setCurrentTime(current);
            setProgress((current / total) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration || 0);
            const previewTarget = item.previewTime || 2;
            if (!isPlaying && videoRef.current.currentTime < 0.5) {
                videoRef.current.currentTime = previewTarget;
            }
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        if (videoRef.current) {
            videoRef.current.currentTime = item.previewTime || 2;
        }
        onStopPlaying();
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds <= 0) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div
            className={`group relative flex flex-col flex-shrink-0 w-[82vw] sm:w-[320px] lg:w-[calc(25%-18px)] min-w-[270px] snap-start rounded-[2.5rem] bg-white border transition-all duration-300 overflow-hidden shadow-md ${
                isPlaying
                    ? 'border-green-500 shadow-2xl shadow-green-500/25 ring-2 ring-green-500/30 -translate-y-1'
                    : 'border-gray-200 hover:shadow-2xl hover:border-green-400 hover:-translate-y-1.5'
            }`}
        >
            {/* Real Video Frame (NO static poster/cover picture) */}
            <div
                className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-slate-950 overflow-hidden cursor-pointer"
                onClick={handleTogglePlay}
            >
                <video
                    ref={videoRef}
                    src={`${item.videoSrc}#t=${item.previewTime || 2}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    playsInline
                    muted={isMuted}
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleVideoEnded}
                />

                {/* Dark gradient overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 transition-opacity duration-300 pointer-events-none ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-85'
                    }`}
                />

                {/* Duration Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-mono font-medium text-white/90 border border-white/10 shadow-sm">
                        {duration > 0 ? formatTime(duration) : "Video"}
                    </span>
                </div>

                {/* Center Play / Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    {!isPlaying ? (
                        <div
                            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 text-white shadow-xl shadow-green-500/40 transform transition-all duration-300 group-hover:scale-110 group-hover:ring-4 group-hover:ring-green-400/30"
                        >
                            <Play className="w-7 h-7 fill-white translate-x-0.5" />
                        </div>
                    ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center w-14 h-14 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                            <Pause className="w-6 h-6 fill-white" />
                        </div>
                    )}
                </div>

                {/* Video Controls Bar Overlay */}
                <div
                    className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent transition-opacity duration-300 z-20 ${
                        isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Scrub Progress Bar */}
                    <div className="w-full bg-white/20 h-1 rounded-full mb-3 overflow-hidden">
                        <div
                            className="bg-green-500 h-full transition-all duration-150"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={handleTogglePlay}
                                className="p-1 hover:text-green-400 transition-colors"
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                            </button>

                            <button
                                type="button"
                                onClick={handleToggleMute}
                                className="p-1 hover:text-green-400 transition-colors"
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
                            </button>

                            <span className="text-[11px] font-mono text-gray-300">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        {/* Open in Popup Container button */}
                        <button
                            type="button"
                            onClick={handleOpenContainer}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-green-500 hover:text-white transition-all text-xs font-semibold"
                            title="Enlarge video"
                        >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Enlarge</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Downside: Name of Testimonial & Place (Analyzed from video) */}
            <div className="p-4 sm:p-5 bg-white flex items-center justify-between gap-3 border-t border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                    {/* Real Avatar extracted directly from video frame */}
                    <div className="relative flex-shrink-0">
                        <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-green-500/40 shadow-sm"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/test1.jpg";
                            }}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 text-white p-0.5 rounded-full ring-2 ring-white">
                            <CheckCircle2 className="w-2.5 h-2.5 fill-green-500 text-white" />
                        </div>
                    </div>

                    {/* Name & Place */}
                    <div className="min-w-0">
                        <h4 className="text-base sm:text-lg font-black text-gray-900 truncate">
                            {item.name}
                        </h4>

                        <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-600 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                            <span className="truncate">{item.place}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Enlarge Container Button */}
                <button
                    type="button"
                    onClick={handleOpenContainer}
                    className="p-2 rounded-xl text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all flex-shrink-0"
                    title="View video in container"
                    aria-label="View in container"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// Dedicated Modal Container Component (shows video cleanly in focused container with Name & Place)
interface VideoModalProps {
    item: VideoTestimonial | null;
    onClose: () => void;
}

const VideoModalContainer: React.FC<VideoModalProps> = ({ item, onClose }) => {
    useEffect(() => {
        if (!item) return;

        // Close on ESC key
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [item, onClose]);

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={onClose}
        >
            {/* Centered Modal Container */}
            <div
                className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Container Header */}
                <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-9 h-9 rounded-full object-cover border-2 border-green-500/50 flex-shrink-0"
                        />
                        <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-white truncate">
                                {item.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mt-0.5">
                                <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                                <span className="truncate">{item.place}</span>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close video container"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Video Area Inside the Container */}
                <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
                    <video
                        src={item.videoSrc}
                        controls
                        autoPlay
                        playsInline
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

const TestimonialSection: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activePlayingId, setActivePlayingId] = useState<number | null>(null);
    const [modalVideo, setModalVideo] = useState<VideoTestimonial | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    // Mouse drag-to-scroll support
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollStartLeft = useRef(0);

    const updateScrollState = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;
        const maxScroll = scrollWidth - clientWidth;

        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < maxScroll - 10);

        const currentProgress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));

        const cardWidth = 300;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveCardIndex(Math.min(videoTestimonials.length - 1, Math.max(0, index)));
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        updateScrollState();
        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [updateScrollState]);

    const handleScroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const cardElements = el.querySelectorAll<HTMLElement>('.snap-start');
        if (cardElements.length > 0) {
            const firstCard = cardElements[0];
            const gap = 24; // gap-6 in tailwind is 24px
            const cardTotalWidth = firstCard.offsetWidth + gap;
            // Calculate how many cards are visible per slide
            const cardsPerSlide = Math.max(1, Math.floor((el.clientWidth + gap) / cardTotalWidth));

            const currentIndex = Math.round(el.scrollLeft / cardTotalWidth);
            const targetIndex = direction === 'right'
                ? Math.min(cardElements.length - 1, currentIndex + cardsPerSlide)
                : Math.max(0, currentIndex - cardsPerSlide);

            if (cardElements[targetIndex]) {
                cardElements[targetIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
                return;
            }
        }

        const scrollAmount = el.clientWidth;
        el.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    const handleScrollBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollContainerRef.current;
        const bar = e.currentTarget;
        if (!el || !bar) return;

        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
        const maxScroll = el.scrollWidth - el.clientWidth;

        el.scrollTo({
            left: maxScroll * clickRatio,
            behavior: 'smooth'
        });
    };

    const handleScrollToCard = (index: number) => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const cardElements = el.querySelectorAll('.snap-start');
        if (cardElements[index]) {
            cardElements[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    };

    // Mouse drag handlers
    const onMouseDown = (e: React.MouseEvent) => {
        const el = scrollContainerRef.current;
        if (!el) return;
        isDragging.current = true;
        startX.current = e.pageX - el.offsetLeft;
        scrollStartLeft.current = el.scrollLeft;
    };

    const onMouseLeaveOrUp = () => {
        isDragging.current = false;
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const el = scrollContainerRef.current;
        if (!el) return;
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        el.scrollLeft = scrollStartLeft.current - walk;
    };

    return (
        <section id="testimonials" className="relative py-24 bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden">
            {/* Background Accent Gradients */}
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        What Our <span className="text-green-500">Partners</span> Say
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto my-4" />
                    <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed">
                        Watch real video testimonials from our partners across India.
                    </p>
                </div>

                {/* Video Carousel Container with Floating Left and Right Side Buttons */}
                <div className="relative group/carousel">
                    {/* Floating Side Left Scroll Button */}
                    <button
                        type="button"
                        onClick={() => handleScroll('left')}
                        disabled={!canScrollLeft}
                        aria-label="Scroll testimonials left"
                        className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 text-gray-800 transition-all duration-300 ${
                            canScrollLeft
                                ? 'opacity-90 hover:opacity-100 hover:scale-110 hover:border-green-500 hover:text-green-600 cursor-pointer'
                                : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Floating Side Right Scroll Button */}
                    <button
                        type="button"
                        onClick={() => handleScroll('right')}
                        disabled={!canScrollRight}
                        aria-label="Scroll testimonials right"
                        className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 text-gray-800 transition-all duration-300 ${
                            canScrollRight
                                ? 'opacity-90 hover:opacity-100 hover:scale-110 hover:border-green-500 hover:text-green-600 cursor-pointer'
                                : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Horizontal Scrollable Track */}
                    <div
                        ref={scrollContainerRef}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseLeaveOrUp}
                        onMouseLeave={onMouseLeaveOrUp}
                        onMouseMove={onMouseMove}
                        className="testimonial-scrollbar flex gap-6 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
                    >
                        {videoTestimonials.map((item) => (
                            <VideoCard
                                key={item.id}
                                item={item}
                                activePlayingId={activePlayingId}
                                onStartPlaying={(id) => setActivePlayingId(id)}
                                onStopPlaying={() => setActivePlayingId(null)}
                                onOpenModal={(video) => setModalVideo(video)}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Scrollbar with Left & Right Move Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200/80">
                    {/* Left Button */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => handleScroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                                canScrollLeft
                                    ? 'bg-white border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 shadow-sm'
                                    : 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>
                    </div>

                    {/* Center: Draggable / Clickable Scrollbar Track */}
                    <div className="w-full max-w-xs sm:max-w-md mx-auto flex items-center gap-3">
                        <span className="text-[11px] font-mono font-bold text-gray-400">
                            01
                        </span>

                        <div
                            onClick={handleScrollBarClick}
                            className="relative flex-grow h-2.5 bg-gray-200 rounded-full cursor-pointer overflow-hidden p-0.5 group"
                            title="Click or drag to scroll through testimonials"
                        >
                            <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-150 group-hover:from-green-600 group-hover:to-emerald-500"
                                style={{ width: `${Math.max(12, scrollProgress)}%` }}
                            />
                        </div>

                        <span className="text-[11px] font-mono font-bold text-gray-400">
                            {videoTestimonials.length < 10 ? `0${videoTestimonials.length}` : videoTestimonials.length}
                        </span>
                    </div>

                    {/* Right Button */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => handleScroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                                canScrollRight
                                    ? 'bg-green-500 border-green-500 text-white hover:bg-green-600 shadow-sm'
                                    : 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Quick Dot Jump Indicators */}
                <div className="mt-5 flex items-center justify-center gap-2">
                    {videoTestimonials.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleScrollToCard(i)}
                            aria-label={`Jump to video testimonial ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeCardIndex === i
                                    ? 'w-7 bg-green-500'
                                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Video Modal Container */}
            <VideoModalContainer
                item={modalVideo}
                onClose={() => setModalVideo(null)}
            />
        </section>
    );
};

export default TestimonialSection;
