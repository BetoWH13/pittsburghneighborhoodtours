"use client";

import { useEffect } from "react";

const INTERNAL_HOSTS = new Set([
  "pittsburghneighborhoodtours.com",
  "www.pittsburghneighborhoodtours.com",
]);

function shouldOpenInNewTab(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return false;

  try {
    const url = new URL(href, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return !INTERNAL_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function updateExternalLinks(root: ParentNode): void {
  const anchors = root.querySelectorAll<HTMLAnchorElement>("a[href]");

  anchors.forEach((anchor) => {
    if (!shouldOpenInNewTab(anchor)) return;

    anchor.target = "_blank";

    const relTokens = new Set((anchor.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    relTokens.add("noopener");
    relTokens.add("noreferrer");
    anchor.setAttribute("rel", Array.from(relTokens).join(" "));
  });
}

export default function ExternalLinkBehavior() {
  useEffect(() => {
    updateExternalLinks(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("a[href]")) {
            updateExternalLinks(node.parentNode || document);
            return;
          }
          updateExternalLinks(node);
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
