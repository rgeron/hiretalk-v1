import { getCurrentPost } from "@/features/posts/post-manager";
import { SiteConfig } from "@/site-config";
import type { PageParams } from "@/types/next";
import { ImageResponse } from "next/og";
import { getOgImageFont } from "../../../src/lib/og-image-font";

export const alt = "Codeline information images";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function og(props: PageParams<{ slug: string }>) {
  const post = await getCurrentPost(props.params.slug);

  if (!post) {
    return null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          gap: 16,
          fontFamily: "Geist",
          color: "white",
          opacity: "1",
          backgroundColor: "#090910",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: "1",

            borderRadius: 12,
            margin: "4px",
            backgroundColor: "#000000",
          }}
        ></div>
        <img
          src={post.attributes.coverUrl}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 12,
            filter: "blur(2px)",
            position: "absolute",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            height: "100%",
            flex: 1,
            paddingBottom: 32,
            paddingLeft: 42,
            gap: 16,
            backdropFilter: "blur(12px)",
          }}
        >
          <p
            style={{
              color: SiteConfig.brand.primary,
              fontSize: "2rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            NOW.TS
          </p>
          <p style={{ fontSize: "3.5rem", fontWeight: "bold", margin: 0 }}>
            {post.attributes.title}
          </p>
        </div>
      </div>
    ),
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: await getOgImageFont(),
    },
  );
}
