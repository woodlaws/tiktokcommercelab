import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "틱톡커머스랩",
    short_name: "커머스랩",
    description:
      "틱톡샵, 숏폼, 라이브커머스, 크리에이터, 광고와 교육을 연결하는 독립 틱톡커머스 전문 플랫폼",
    start_url: "/",
    display: "standalone",
    background_color: "#050607",
    theme_color: "#050607",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
