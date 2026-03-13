const DISPATCH_CARDS = [
  "/images/dispatch-card-1.jpg",
  "/images/dispatch-card-2.jpg",
  "/images/dispatch-card-3.jpg",
];

/** Deterministic image pick based on slug hash so the same post always gets the same image */
export function getDispatchImage(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return DISPATCH_CARDS[Math.abs(hash) % DISPATCH_CARDS.length];
}

export function isDispatch(tags: string[] | null): boolean {
  return tags?.includes("Certification Dispatch") ?? false;
}
