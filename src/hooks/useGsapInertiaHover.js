import { useEffect, useRef } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

export default function useGsapInertiaHover(containerRef, dependencies = []) {
    const mouse = useRef({ x: 0, y: 0, dx: 0, dy: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            mouse.current.dx = e.clientX - mouse.current.x;
            mouse.current.dy = e.clientY - mouse.current.y;
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        container.addEventListener("mousemove", handleMouseMove);

        const mediaEls = Array.from(container.querySelectorAll(".media"));

        mediaEls.forEach((el, index) => {
            const onEnter = () => {
                const targets = [
                    { el, factor: 1 },
                    ((Math.floor(index - 1 / 36) - Math.floor(index / 3)) + Math.abs(index - 1 % 36 - index % 36) === 1) && { el: mediaEls[index - 1], factor: 0.5 },
                    ((Math.floor(index + 1 / 36) - Math.floor(index / 3)) + Math.abs(index + 1 % 36 + index % 36) === 1) && { el: mediaEls[index + 1], factor: 0.5 },
                    ((Math.floor(index - 2 / 36) - Math.floor(index / 3)) + Math.abs(index - 2 % 36 - index % 36) === 1) && { el: mediaEls[index - 2], factor: 0.25 },
                    ((Math.floor(index + 2 / 36) - Math.floor(index / 3)) + Math.abs(index + 2 % 36 - index % 36) === 1) && { el: mediaEls[index + 2], factor: 0.25 },
                    ((Math.floor(index - 3 / 36) - Math.floor(index / 3)) + Math.abs(index - 3 % 36 - index % 36) === 1) && { el: mediaEls[index - 3], factor: 0.25 },
                    ((Math.floor(index + 3 / 36) - Math.floor(index / 3)) + Math.abs(index + 3 % 36 - index % 36) === 1) && { el: mediaEls[index + 3], factor: 0.25 },
                ].filter(t => t.el);

                targets.forEach(({ el: target, factor }) => {
                    const tl = gsap.timeline({ onComplete: () => tl.kill() });

                    tl.to(target, {
                        inertia: {
                            x: {
                                velocity: mouse.current.dx * 8 * factor,
                                end: 0
                            },
                            y: {
                                velocity: mouse.current.dy * 8 * factor,
                                end: 0
                            },
                        }
                    });

                    tl.fromTo(target, {
                        rotate: 0
                    }, {
                        duration: 0.4,
                        rotate: (Math.random() - 0.5) * 15 * factor,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.inOut"
                    }, "<");
                });
            };

            el.addEventListener("mouseenter", onEnter);
            el._gsapEnter = onEnter; // Save reference for cleanup
        });

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            mediaEls.forEach(el => {
                el.removeEventListener("mouseenter", el._gsapEnter);
                delete el._gsapEnter;
            });
        };
    }, dependencies);
}
