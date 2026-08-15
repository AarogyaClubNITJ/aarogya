import { useState, useEffect } from "react";

const VisitCounter = () => {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    setShowIframe(true);
  }, []);

  if (!showIframe) return null;

  return (
    <div className="absolute sm:right-0 md:right-4 bottom-0 mb-4 hidden sm:block">
      <iframe
        src="/visitor-counter.html"
        title="Visitor Counter"
        style={{
          width: "200px",
          height: "100px",
          overflow: "hidden",
        }}
        scrolling="no"
      />
    </div>
  );
};

export default VisitCounter;
