"use client";

import { FC } from "react";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-[2px]">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
