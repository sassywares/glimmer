"use client";

import { useRef, useLayoutEffect, PropsWithChildren } from "react";

/**
 * A component that simulates typing out text.
 * Can animate complex content with HTML tags, just make sure the content is not wrapped in a single tag.
 *
 * @param { Object } props
 * @param { ReactNode } props.children The content to type out.
 * @param { number } [props.delay=0] The delay before starting the typing animation.
 *
 * @example
 * <TypingAnimation>
 *  Hello <strong>world</strong>! I plan on <span className="highlight">typing</span> out this content.
 * </TypingAnimation>
 */
export function TypingAnimation({
  children,
  delay = 0,
  ...props
}: PropsWithChildren<
  {
    delay?: number;
  } & React.ComponentPropsWithoutRef<"div">
>) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = ref.current!;

          // Get the original content and insert a caret
          const originalContent = element.innerHTML;
          element.innerHTML = "|";

          setTimeout(() => {
            // Clear the content
            element.innerHTML = "";

            // Create and add a caret
            const caret = document.createElement("span");
            caret.className = "caret-animation";
            caret.innerText = "|";
            element.appendChild(caret);

            // Split the content into words, preserving HTML tags as single words
            const words =
              originalContent.match(
                /<[^>]+>[^<]*<\/[^>]+>|<[^>]+>|[^<>\s]+/g,
              ) || [];

            let currentIndex = 0;

            // Function to add words one by one
            const addNextWord = () => {
              if (currentIndex < words.length) {
                // Remove the caret, add the next word, then re-add the caret
                caret.remove();
                element.innerHTML += words[currentIndex] + " ";
                currentIndex++;
                element.appendChild(caret);
                setTimeout(addNextWord, 100); // Adjust the delay as needed
              } else {
                // Remove the caret once the typing is done
                caret.remove();
              }
            };

            addNextWord();
          }, delay);

          // Stop observing once the animation is done
          observer.unobserve(element);
        }
      });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
}
