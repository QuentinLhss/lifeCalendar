import { useEffect } from "react";
import gsap from "gsap";

export default function useJellyCursor() {
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window;
        if (isTouchDevice) return;

        const mainCursor = document.getElementById("jelly-cursor");
        if (!mainCursor) return;

        // === Create trail elements ===
        const trailCount = 6;
        const trailEls = [];

        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement("div");
            trail.className = "jelly-trail";
            Object.assign(trail.style, {
                position: "fixed",
                top: 0,
                left: 0,
                width: "16px",
                height: "16px",
                backgroundColor: "rgba(0,160,255,0.2)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 9998,
                transform: "translate3d(0, 0, 0)",
            });
            document.body.appendChild(trail);
            trailEls.push({
                el: trail,
                pos: { x: 0, y: 0 },
                setX: gsap.quickSetter(trail, "x", "px"),
                setY: gsap.quickSetter(trail, "y", "px"),
            });
        }

        // === Main cursor setup ===
        const pos = { x: 0, y: 0 };
        const vel = { x: 0, y: 0 };
        let targetPos = { x: 0, y: 0 };
        let isHoveringClickable = false;

        const setX = gsap.quickSetter(mainCursor, "x", "px");
        const setY = gsap.quickSetter(mainCursor, "y", "px");
        const setRotation = gsap.quickSetter(mainCursor, "rotate", "deg");
        const setScaleX = gsap.quickSetter(mainCursor, "scaleX");
        const setScaleY = gsap.quickSetter(mainCursor, "scaleY");
        const setOpacity = gsap.quickSetter(mainCursor, "opacity");

        const getScale = (dx, dy) => Math.min(Math.sqrt(dx * dx + dy * dy) / 100, 0.25);
        const getAngle = (dx, dy) => (Math.atan2(dy, dx) * 180) / Math.PI;

        function update() {
            const rotation = getAngle(vel.x, vel.y);
            const scale = getScale(vel.x, vel.y);

            setX(pos.x);
            setY(pos.y);
            setRotation(rotation);
            if (!isHoveringClickable) {
                setScaleX(1 + scale);
                setScaleY(1 - scale);
            }

            // Update trails
            trailEls.forEach((trail, i) => {
                const delay = (i + 1) * 0.07;
                trail.pos.x += (pos.x - trail.pos.x) * delay;
                trail.pos.y += (pos.y - trail.pos.y) * delay;
                trail.setX(trail.pos.x);
                trail.setY(trail.pos.y);
            });
        }

        function animate() {
            const speed = 0.35;
            pos.x += (targetPos.x - pos.x) * speed;
            pos.y += (targetPos.y - pos.y) * speed;
            vel.x = targetPos.x - pos.x;
            vel.y = targetPos.y - pos.y;

            update();
            requestAnimationFrame(animate);
        }

        const handleCursorHover = (hovering) => {
            isHoveringClickable = hovering;
            gsap.to(mainCursor, {
                scale: hovering ? 1 : 1,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const hideCursor = () => {
            setOpacity(0);
            trailEls.forEach(t => t.el.style.opacity = "0");
        };

        const showCursor = () => {
            setOpacity(1);
            trailEls.forEach(t => t.el.style.opacity = "1");
        };

        const mouseMoveHandler = (e) => {
            targetPos.x = e.clientX;
            targetPos.y = e.clientY;
            update();
        };

        // Hover events
        const clickableElements = document.querySelectorAll("a, button");
        clickableElements.forEach(el => {
            const enterHandler = () => handleCursorHover(true);
            const leaveHandler = () => handleCursorHover(false);
            el.addEventListener("mouseenter", enterHandler);
            el.addEventListener("mouseleave", leaveHandler);
            el.__jellyCursorHandlers = { enterHandler, leaveHandler };
        });

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseleave", hideCursor);
        document.addEventListener("mouseenter", showCursor);

        const iframes = document.querySelectorAll("iframe");
        iframes.forEach((iframe) => {
            iframe.addEventListener("mouseenter", hideCursor);
            iframe.addEventListener("mouseleave", showCursor);
        });

        animate();

        // Cleanup
        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseleave", hideCursor);
            document.removeEventListener("mouseenter", showCursor);

            clickableElements.forEach((el) => {
                const handlers = el.__jellyCursorHandlers;
                if (handlers) {
                    el.removeEventListener("mouseenter", handlers.enterHandler);
                    el.removeEventListener("mouseleave", handlers.leaveHandler);
                    delete el.__jellyCursorHandlers;
                }
            });

            iframes.forEach((iframe) => {
                iframe.removeEventListener("mouseenter", hideCursor);
                iframe.removeEventListener("mouseleave", showCursor);
            });

            // Remove trail elements
            trailEls.forEach(({ el }) => el.remove());
        };
    }, []);
}
