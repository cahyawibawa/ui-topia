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
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 500,
          background: "white",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icons.logo />
          <span
            style={{
              marginLeft: 8,
              fontSize: 24,
            }}
          >
            ui/topia
          </span>
        </div>
        <div
          style={{
            marginLeft: 42,
            marginRight: 42,
            display: "flex",
            flexDirection: "column",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "black",
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontSize: 48, color: "black" }}>{title}</div>
          <br />
          <div style={{ fontSize: 36, color: "gray" }}>{description}</div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  } catch (error) {
    console.error("Failed to generate the image:", error);
    return new Response(`Failed to generate the image: ${error}`, {
      status: 500,
    });
  }
}
