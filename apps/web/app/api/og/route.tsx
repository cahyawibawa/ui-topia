import { readFileSync } from "fs";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { join } from "path";
import { Icons } from "@/registry/components/icons";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    const description = searchParams.get("description");

    const fontPath = join(process.cwd(), "public", "fonts", "Geist-Medium.otf");
    const fontData = readFileSync(fontPath);

    return new ImageResponse(
      <div
        style={{
          alignItems: "flex-start",
          background: "white",
          display: "flex",
          flexDirection: "column",
          fontWeight: 500,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-.02em",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            left: 42,
            position: "absolute",
            top: 42,
          }}
        >
          <Icons.logo />
          <span
            style={{
              fontSize: 24,
              marginLeft: 8,
            }}
          >
            ui/topia
          </span>
        </div>
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            fontStyle: "normal",
            letterSpacing: "-0.05em",
            lineHeight: 1.5,
            marginLeft: 42,
            marginRight: 42,
            whiteSpace: "pre-wrap",
          }}
        >
          <div style={{ color: "black", fontSize: 48 }}>{title}</div>
          <br />
          <div style={{ color: "gray", fontSize: 36 }}>{description}</div>
        </div>
      </div>,
      {
        fonts: [
          {
            data: fontData,
            name: "Geist",
            style: "normal",
          },
        ],
        height: 630,
        width: 1200,
      },
    );
  } catch (error) {
    console.error("Failed to generate the image:", error);
    return new Response(`Failed to generate the image: ${error}`, {
      status: 500,
    });
  }
}
