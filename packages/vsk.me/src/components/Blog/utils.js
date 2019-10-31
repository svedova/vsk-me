import { useEffect } from "react";

export const formatDate = d => {
  const date = new Date(d);

  return date.toLocaleDateString("de-CH", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const highlight = () => {
  if (
    typeof window === "undefined" ||
    typeof window.hljs === "undefined" ||
    typeof window.hljs.highlightBlock === "undefined"
  ) {
    return;
  }

  document.querySelectorAll("code").forEach(code => {
    code.className = "es6";
    window.hljs.highlightBlock(code);
  });
};

export const useWithHiglight = (...args) => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Already loaded
    if (document.querySelector("#hljs") !== null) {
      return highlight();
    }

    const script = document.createElement("script");
    const link = document.createElement("link");
    script.onload = highlight;
    script.id = "hljs";
    script.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"; // prettier-ignore
    link.rel = "stylesheet";
    link.href= "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css" // prettier-ignore
    document.head.appendChild(link);
    document.body.appendChild(script);
  }, args);
};
