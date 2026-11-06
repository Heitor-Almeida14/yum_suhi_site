"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "fade" | "left" | "right" | "curtain";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Atraso em ms para criar sequência */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "figure" | "li" | "span";
}

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: "",
  fade: "reveal-fade",
  left: "reveal-left",
  right: "reveal-right",
  curtain: "",
};

/**
 * Revela o conteúdo ao entrar no viewport, com respeito a prefers-reduced-motion.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  const classes =
    variant === "curtain"
      ? `reveal-curtain img-zoom ${visible ? "is-visible" : ""} ${className}`
      : `reveal ${VARIANT_CLASS[variant]} ${visible ? "is-visible" : ""} ${className}`;

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={classes} style={style}>
      {children}
    </Tag>
  );
}
