// Centralized asset paths for the public/ directory
// --------------------------------------------------
// NOTE: All files referenced here live under `public/assets/...`.
// Because they are served statically by Next.js, we do not import them –
// we simply reference their URL paths as strings.
// This keeps the bundle size small and avoids the "unknown module type" errors.

// 🖼️  Images
export const heroImg          = "/assets/images/hero.jpeg";
export const appleImg         = "/assets/images/apple.svg";
export const searchImg        = "/assets/images/search.svg";
export const bagImg           = "/assets/images/bag.svg";
export const watchImg         = "/assets/images/watch.svg";
export const rightImg         = "/assets/images/right.svg";
export const replayImg        = "/assets/images/replay.svg";
export const playImg          = "/assets/images/play.svg";
export const pauseImg         = "/assets/images/pause.svg";

export const yellowImg        = "/assets/images/yellow.jpg";
export const blueImg          = "/assets/images/blue.jpg";
export const whiteImg         = "/assets/images/white.jpg";
export const blackImg         = "/assets/images/black.jpg";
export const explore1Img      = "/assets/images/explore1.jpg";
export const explore2Img      = "/assets/images/explore2.jpg";
export const chipImg          = "/assets/images/chip.jpeg";
export const frameImg         = "/assets/images/frame.png";

// 📹  Videos
export const heroVideo            = "/assets/videos/hero.mp4";
export const smallHeroVideo       = "/assets/videos/smallHero.mp4";
export const highlightFirstVideo  = "/assets/videos/highlight-first.mp4";
export const highlightSecondVideo = "/assets/videos/hightlight-third.mp4";
export const highlightThirdVideo  = "/assets/videos/hightlight-sec.mp4";
export const highlightFourthVideo = "/assets/videos/hightlight-fourth.mp4";
export const exploreVideo         = "/assets/videos/explore.mp4";
export const frameVideo           = "/assets/videos/frame.mp4";

// --------------------------------------------------
// Usage Example (React component):
// <img src={heroImg} alt="Hero" />
// <video src={heroVideo} autoPlay loop muted />
