"use client";

import { useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCreative } from "swiper/modules";
import type { Project } from "@/content/projects";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(project.images[0] ?? "");
  const id = useId().replace(/:/g, "");

  const openModal = () => {
    setActiveImage(project.images[0] ?? "");
    setShowModal(true);
  };

  return (
    <article className="bg-navy-light border border-white/10 overflow-hidden flex flex-col">
      <h3 className="text-lg md:text-xl font-semibold text-white px-4 pt-4 pb-2">
        {project.title}
      </h3>

      <div className="relative px-4">
        <Swiper
          modules={[Navigation, Pagination, EffectCreative]}
          effect="creative"
          creativeEffect={{
            prev: { shadow: true, translate: ["-20%", 0, -1], scale: 0.9 },
            next: { translate: ["100%", 0, 0] },
          }}
          speed={800}
          spaceBetween={0}
          slidesPerView={1}
          loop={project.images.length > 1}
          navigation={{ nextEl: `.next-${id}`, prevEl: `.prev-${id}` }}
          pagination={{ el: `.pagination-${id}`, clickable: true }}
          className="aspect-[4/3] bg-navy-mid"
        >
          {project.images.slice(0, 3).map((img, i) => (
            <SwiperSlide key={`${project.slug}-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${project.title} ${i + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={openModal}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={`prev-${id} absolute left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/50 text-white hover:bg-gold hover:text-navy`}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          className={`next-${id} absolute right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/50 text-white hover:bg-gold hover:text-navy`}
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className={`pagination-${id} flex justify-center gap-1 py-3`} />
      </div>

      <div className="px-4 pb-5 pt-2 space-y-2 text-sm flex-1 flex flex-col">
        <p>
          <span className="text-cream">Developer: </span>
          <span className="text-white">{project.developer}</span>
        </p>
        <p>
          <span className="text-cream">Location: </span>
          <span className="text-white">{project.location}</span>
        </p>
        <p className="text-cream leading-relaxed flex-1">{project.description}</p>
        <Button onClick={openModal} variant="outline" className="mt-3 w-full">
          See Gallery Details
        </Button>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={`${project.title} — Gallery`}
        className="max-w-4xl"
      >
        <div className="space-y-4">
          <div className="relative aspect-video bg-navy-mid overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={`${project.title} selected`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {project.images.map((img, index) => (
              <button
                key={`${project.slug}-thumb-${index}`}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`aspect-square overflow-hidden border ${
                  activeImage === img ? "border-gold" : "border-white/10"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${project.title} thumb ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </article>
  );
}
