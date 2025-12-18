"use client";;
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered
}) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    suppressHydrationWarning
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-48 md:h-64 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}>
    <img
      src={card.src}
      alt={card.title}
      suppressHydrationWarning
      className="object-cover absolute inset-0 h-full w-full"
    />
    <div
      suppressHydrationWarning
      className={cn(
        "absolute inset-0 bg-black/50 flex flex-col justify-end py-4 px-4 transition-all duration-300",
        hovered === index ? "bg-black/70" : "bg-black/40"
      )}>
      <div
        suppressHydrationWarning
        className={cn(
          "text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 transition-all duration-300",
        )}>
        {card.title}
      </div>
      <div
        suppressHydrationWarning
        className={cn(
          "overflow-hidden transition-all duration-300",
          hovered === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        )}>
        <p className="text-sm text-neutral-300" suppressHydrationWarning>
          {card.desc}
        </p>
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

export function FocusCards({
  cards
}) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered} />
      ))}
    </div>
  );
}
