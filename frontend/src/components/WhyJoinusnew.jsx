import { useScroll, motion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const WhyJoinusnew = () => {
  const para =
    "Aarogya Club helps you prioritize your health with resources to manage stress, stay fit, and maintain balance. Gain practical skills in fitness, nutrition, and mental well-being through workshops, while connecting with experts and peers in a supportive community.";
  const title = "WHY JOIN US ! ! !";

  const highlightedPhrases = ["Manage", "stress", "stay", "fit", "Maintain balance"];
  const words = para.split(" ");

  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.8", "start 0.1"],
  });

  // Function to check if the word belongs to the highlighted phrases
  const isHighlighted = (word, index) => {
    const phraseWords = highlightedPhrases.join(" ").split(" ");
    const checkWords = words.slice(index, index + phraseWords.length).join(" ");
    return highlightedPhrases.some((phrase) => checkWords.startsWith(phrase));
  };

  return (
    <div className="flex flex-col bg-white w-[70vw] items-center font-Basic mb-10 mt-36 rounded-3xl h-[77vh] overflow-hidden px-32 shadow-custom">
      <h1 className="pt-10 text-7xl font-black text-[#406ED5]">{title}</h1>
      <motion.p
        ref={element}
        style={{ opacity: scrollYProgress }}
        className="pt-8 flex flex-wrap font-bold text-4xl capitalize"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word
              key={i}
              range={[start, end]}
              progress={scrollYProgress}
              highlighted={isHighlighted(word, i)}
            >
              {word}
            </Word>
          );
        })}
      </motion.p>
    </div>
  );
};

const Word = ({ children, range, progress, highlighted }) => {
  const baseOpacity = useTransform(progress, range, [0.3, 0.7]); // Base opacity for all words
  const color = highlighted
    ? useTransform(progress, range, ["#000", "#4BC1E2"]) // Highlighted words transition to blue
    : "#000"; // Default color is black

  return (
    <motion.span
      style={{
        opacity: highlighted ? 1 : baseOpacity, // Highlighted words are fully opaque
        color,
      }}
      className="mr-[12px] mt-1"
    >
      {children}
    </motion.span>
  );
};

export default WhyJoinusnew;
