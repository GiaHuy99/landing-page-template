import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import { galleryContent } from "@/content/gallery";

export default function ImageGallerySection() {
  return (
    <SectionShell id="gallery" variant="default" className="bg-navy-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 reveal-on-scroll">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {galleryContent.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-4 md:gap-6">
          {galleryContent.tiles.map((tile) => (
            <figure
              key={`${tile.alt}-${tile.aspect}`}
              className={`relative overflow-hidden group ${
                tile.aspect === "wide" ? "aspect-[16/10]" : "aspect-square"
              }`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-cream opacity-0 group-hover:opacity-100 transition-opacity">
                {tile.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
