import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const useGsapSplitText = (selector, locale = "zh") => {
    useEffect(() => {
        let splitInstance;
        let observer;

        const animateSplitText = () => {
            const el = document.querySelector(selector);
            if (!el) return;

            const segmenter = new Intl.Segmenter(locale, { granularity: "word" });

            splitInstance = SplitText.create(el, {
                type: "words",
                wordsClass: "word",
                prepareText: (text) => {
                    return [...segmenter.segment(text)].map(s => s.segment).join(String.fromCharCode(8204));
                },
                wordDelimiter: { delimiter: /\u200c/, replaceWith: " " },
                autoSplit: true,
                onSplit: (self) => {
                    gsap.from(self.words, {
                        y: -30,
                        opacity: 0,
                        stagger: 0.1,
                        ease: "back"
                    });
                }
            });

            gsap.set(el, { opacity: 1 });
        };

        // Observer le DOM jusqu'à ce que le .split apparaisse
        observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                animateSplitText();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            splitInstance?.revert?.();
            observer?.disconnect?.();
        };
    }, [selector, locale]);
};

export default useGsapSplitText;
