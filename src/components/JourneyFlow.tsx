import React, { useRef } from "react";
import { ScrollItem } from "./ScrollItem";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Import Sayde images
import Sayde35A from "../assets/Sayde35A.jpg";
import Sayde35B from "../assets/Sayde35B.jpg";
import Sayde35F from "../assets/Sayde35F.jpg";
import Sayde35G from "../assets/Sayde35G.jpg";
import Sayde35H from "../assets/Sayde35H.jpg";
import Sayde35I from "../assets/Sayde35I.jpg";
import Sayde35J from "../assets/Sayde35J.jpg";
import Sayde35K from "../assets/Sayde35K.jpg";
import Sayde35L from "../assets/Sayde35L.jpg";
import Sayde35M from "../assets/Sayde35M.jpg";

interface TextItem {
  type: "text";
  side: "left" | "right";
  title: string;
  quote: string;
  content: string;
}

interface PhotoItem {
  type: "photo";
  side: "left" | "right";
  src: string;
  alt: string;
}

type JourneyItem = TextItem | PhotoItem;

export const JourneyFlow: React.FC = () => {
  // Journey items in alternating order
  const journeyItems: JourneyItem[] = [
    {
      type: "photo",
      side: "left",
      src: Sayde35A,
      alt: "Sayde photo 1",
    },
    {
      type: "photo",
      side: "right",
      src: Sayde35B,
      alt: "Sayde photo 2",
    },
    {
      type: "text",
      side: "left",
      title: "35 Years of Amazing! ✨",
      quote:
        '"A heart is shown not by how much you love, but by how much you are loved by others."',
      content:
        "Do you know how special you are? We do. Your kindness and enthusiasm make every day brighter for everyone around you. Anyone who is lucky enough to know you knows this.",
    },
    {
      type: "photo",
      side: "right",
      src: Sayde35F,
      alt: "Sayde photo 3",
    },
    {
      type: "photo",
      side: "left",
      src: Sayde35G,
      alt: "Sayde photo 4",
    },
    {
      type: "text",
      side: "right",
      title: "A Special Surprise 🎁",
      quote: "\"That, my dear, is a 'horse of a different color.'\"",
      content:
        "You deserve the best, and we wanted to make sure you get it for your 35th. It may not be what you were expecting, but you're in a family used to doing things differently",
    },
    {
      type: "photo",
      side: "left",
      src: Sayde35H,
      alt: "Sayde photo 5",
    },
    {
      type: "photo",
      side: "right",
      src: Sayde35I,
      alt: "Sayde photo 6",
    },
    {
      type: "photo",
      side: "left",
      src: Sayde35J,
      alt: "Sayde photo 7",
    },
    {
      type: "text",
      side: "right",
      title: "Almost There! 🌈",
      quote: '"Somewhere over the rainbow skies are blue …"',
      content:
        "There are a couple more twists and turns to take, but you are a great navigator (and Leia can help). It will be worth it!",
    },
    {
      type: "photo",
      side: "left",
      src: Sayde35K,
      alt: "Sayde photo 8",
    },
    {
      type: "photo",
      side: "right",
      src: Sayde35L,
      alt: "Sayde photo 9",
    },
    {
      type: "photo",
      side: "left",
      src: Sayde35M,
      alt: "Sayde photo 10",
    },
    {
      type: "text",
      side: "right",
      title: "Your Surprise Awaits ✨",
      quote:
        '"You\'ve always had the power, my dear. You just had to learn it for yourself."',
      content:
        "Hope you've enjoyed your magical journey. You're now ready for the surprise ahead.",
    },
  ];

  // Create refs and animations for each item
  const itemRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const itemAnimations = [
    useScrollAnimation(itemRefs[0]),
    useScrollAnimation(itemRefs[1]),
    useScrollAnimation(itemRefs[2]),
    useScrollAnimation(itemRefs[3]),
    useScrollAnimation(itemRefs[4]),
    useScrollAnimation(itemRefs[5]),
    useScrollAnimation(itemRefs[6]),
    useScrollAnimation(itemRefs[7]),
    useScrollAnimation(itemRefs[8]),
    useScrollAnimation(itemRefs[9]),
    useScrollAnimation(itemRefs[10]),
    useScrollAnimation(itemRefs[11]),
    useScrollAnimation(itemRefs[12]),
    useScrollAnimation(itemRefs[13]),
  ];

  const renderTextItem = (item: TextItem, index: number) => (
    <section
      key={index}
      ref={itemRefs[index]}
      className="min-h-[50dvh] flex items-center justify-center relative overflow-hidden"
    >
      {itemAnimations[index].isVisible && (
        <ScrollItem
          side={item.side}
          isVisible={itemAnimations[index].isVisible}
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-gray-500 italic leading-relaxed mb-3">
            {item.quote}
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {item.content}
          </p>
        </ScrollItem>
      )}
    </section>
  );

  const renderPhotoItem = (item: PhotoItem, index: number) => {
    // Create slight random rotation for polaroid effect
    const rotations = [-2.5, 1.8, -1.2, 2.3, -3.1, 1.5, -2.8, 2.1, -1.7, 3.2];
    const rotation = rotations[index % rotations.length];

    return (
      <section
        key={index}
        ref={itemRefs[index]}
        className="min-h-[250px] flex items-center justify-center relative"
      >
        {itemAnimations[index].isVisible && (
          <div
            className={`
          absolute top-1/2 transform -translate-y-1/2 z-20
          ${
            item.side === "left"
              ? "left-2 sm:left-4 md:left-8 lg:left-16"
              : "right-2 sm:right-4 md:right-8 lg:right-16"
          }
        `}
            style={{ transform: `translateY(-50%) rotate(${rotation}deg)` }}
          >
            {/* Realistic polaroid with enhanced shadows and borders */}
            <div
              className="inline-block bg-gray-50 p-1 md:p-3 pb-4 md:pb-8 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                boxShadow: `
                     0 4px 8px rgba(0, 0, 0, 0.12),
                     0 8px 16px rgba(0, 0, 0, 0.08),
                     0 16px 32px rgba(0, 0, 0, 0.04),
                     inset 0 1px 0 rgba(255, 255, 255, 0.1)
                   `,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-[100px] md:w-[300px] h-auto block rounded-sm border-gray-400 border-2"
              />
            </div>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-y-1">
      {journeyItems.map((item, index) =>
        item.type === "text"
          ? renderTextItem(item, index)
          : renderPhotoItem(item, index)
      )}
    </div>
  );
};
