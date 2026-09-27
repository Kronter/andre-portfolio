import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  return reduced;
}

export default function MediaCarousel({ project }) {
  const media = useMemo(() => {
    const items = [];
    if (project.videoId) {
      items.push({ type: 'video', videoId: project.videoId, poster: project.image, alt: `${project.title} video` });
    }
    const images = project.screenshots?.length ? project.screenshots : [project.image];
    images.forEach((src, index) => items.push({
      type: 'image',
      src,
      alt: project.screenshotAlts?.[index] || `${project.title} screenshot ${index + 1}`,
    }));
    return items;
  }, [project]);

  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const touchStart = useRef(null);
  const manualByProject = useRef(new Set());
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setIndex(0);
    setManual(manualByProject.current.has(project.slug));
    setPlayingVideo(false);
  }, [project.slug]);

  useEffect(() => {
    const activeIndex = media.length ? ((index % media.length) + media.length) % media.length : 0;
    if (manual || reducedMotion || media.length < 2 || media[activeIndex]?.type !== 'image') return undefined;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % media.length), 5200);
    return () => window.clearTimeout(timer);
  }, [index, manual, media, reducedMotion]);

  const select = (next) => {
    manualByProject.current.add(project.slug);
    setManual(true);
    setPlayingVideo(false);
    setIndex((next + media.length) % media.length);
  };

  const safeIndex = media.length ? ((index % media.length) + media.length) % media.length : 0;
  const current = media[safeIndex];

  return (
    <div className="media-carousel">
      <div
        className="media-stage"
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          if (Math.abs(distance) > 45) select(safeIndex + (distance < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        {current.type === 'image' ? (
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 767px) 100vw, 760px"
            className="media-image"
          />
        ) : playingVideo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${current.videoId}?autoplay=1`}
            title={current.alt}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-poster"
            onClick={() => { manualByProject.current.add(project.slug); setManual(true); setPlayingVideo(true); }}
            aria-label={`Play ${project.title} video`}
          >
            <Image src={current.poster} alt="" fill sizes="(max-width: 767px) 100vw, 760px" className="media-image" />
            <span><Play aria-hidden="true" fill="currentColor" /> Play video</span>
          </button>
        )}

        {media.length > 1 && (
          <>
            <button type="button" className="carousel-arrow carousel-prev" onClick={() => select(safeIndex - 1)} aria-label="Previous media">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className="carousel-arrow carousel-next" onClick={() => select(safeIndex + 1)} aria-label="Next media">
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
        <span className="media-position" aria-live="polite">{safeIndex + 1} / {media.length}</span>
      </div>

      {media.length > 1 && (
        <div className="media-thumbnails" aria-label="Choose project media">
          {media.map((item, itemIndex) => (
            <button
              type="button"
              key={`${item.type}-${item.src || item.videoId}`}
              className={itemIndex === safeIndex ? 'active' : ''}
              onClick={() => select(itemIndex)}
              aria-label={`Show media ${itemIndex + 1}`}
              aria-current={itemIndex === safeIndex ? 'true' : undefined}
            >
              <Image src={item.src || item.poster} alt="" fill sizes="72px" className="thumbnail-image" />
              {item.type === 'video' && <Play className="thumbnail-play" aria-hidden="true" fill="currentColor" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
