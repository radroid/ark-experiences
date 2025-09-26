"use client";

import { CSSProperties, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type LiquidGlassProps = {
    width?: number;
    height?: number;
    borderRadius?: number;
    tintOpacity?: number;
    blur?: number;
    /** If true, acts as a global cursor overlay that follows the mouse */
    isCursor?: boolean;
    /** Only used when isCursor=true. Hide the system cursor while active (default: true) */
    hideDefaultCursor?: boolean;
    /** Render as a perfect circle using width/height (ignores borderRadius) */
    isCircle?: boolean;
};

export const LiquidGlass = (props: LiquidGlassProps) => {
    const {
        width = 120,
        height = 120,
        borderRadius = 12,
        tintOpacity = 0.1,
        blur = 2,
        isCursor = false,
        hideDefaultCursor = true,
        isCircle = false,
    } = props;

    const glassRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const glass = glassRef.current;
        if (!glass) return;

        let previousCursor: string | null = null;

        const mouseMove = (e: MouseEvent) => {
            if (!glassRef.current) return;

            const posX = e.clientX - width / 2;
            const posY = e.clientY - height / 2;

            gsap.to(glassRef.current, {
                duration: 0.3,
                left: posX,
                top: posY,
                ease: "power2.out",
            });
        };

        const mouseMoveLocal = (e: MouseEvent) => {
            if (!glassRef.current || !glassRef.current?.parentElement) return;
            const parent = glassRef.current.parentElement;
            const parentRect = parent.getBoundingClientRect();
            const posX = e.clientX - parentRect.left - width / 2;
            const posY = e.clientY - parentRect.top - height / 2;
            gsap.to(glassRef.current, {
                duration: 0.3,
                left: posX,
                top: posY,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", isCursor ? mouseMove : mouseMoveLocal);

        if (isCursor && hideDefaultCursor) {
            previousCursor = document.body.style.cursor;
            document.body.style.cursor = "none";
        }

        return () => {
            window.removeEventListener("mousemove", isCursor ? mouseMove : mouseMoveLocal);
            if (isCursor && hideDefaultCursor) {
                document.body.style.cursor = previousCursor ?? "";
            }
        };
    }, [isCursor, hideDefaultCursor, width, height]);

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" className="absolute overflow-hidden">
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.008 0.008"
                            numOctaves="2"
                            seed="92"
                            result="noise"></feTurbulence>
                        <feGaussianBlur in="noise" stdDeviation="2" result="blurred"></feGaussianBlur>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="blurred"
                            scale="80"
                            xChannelSelector="R"
                            yChannelSelector="G"></feDisplacementMap>
                    </filter>
                </defs>
            </svg>
            <div
                ref={glassRef}
                className={cn(
                    isCursor ? "fixed" : "absolute",
                    "pointer-events-none z-[60] isolate shadow-lg",
                    isCircle ? "rounded-full" : "rounded-(--lg-border-radius)",
                    [
                        isCircle
                            ? "before:absolute before:inset-0 before:z-0 before:rounded-full before:bg-[rgba(255,255,255,var(--lg-tint-opacity))] before:shadow-[inset_0_0_20px_-5px_rgba(255,255,255,0.7)] before:content-['']"
                            : "before:absolute before:inset-0 before:z-0 before:rounded-(--lg-border-radius) before:bg-[rgba(255,255,255,var(--lg-tint-opacity))] before:shadow-[inset_0_0_20px_-5px_rgba(255,255,255,0.7)] before:content-['']",
                    ],
                    [
                        isCircle
                            ? "after:absolute after:inset-0 after:isolate after:-z-1 after:rounded-full after:[filter:url(#glass-distortion)] after:backdrop-blur-[var(--lg-blur)] after:content-['']"
                            : "after:absolute after:inset-0 after:isolate after:-z-1 after:rounded-(--lg-border-radius) after:[filter:url(#glass-distortion)] after:backdrop-blur-[var(--lg-blur)] after:content-['']",
                    ],
                )}
                style={
                    {
                        "--lg-border-radius": `${borderRadius}px`,
                        "--lg-tint-opacity": tintOpacity,
                        "--lg-blur": `${blur}px`,
                        width: width,
                        height: height,
                    } as CSSProperties
                }></div>
        </>
    );
};
