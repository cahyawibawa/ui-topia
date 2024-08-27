import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const Inter = fetch(
  new URL(
    "./inter-bold.woff",
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
).then((res) => res.arrayBuffer());

export const GET = async (req: NextRequest) => {
  const title = req.nextUrl.searchParams.get("title");
  const description = req.nextUrl.searchParams.get("description");
  if (title === null && description === null) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundColor: "#ffffff",
          background: "linear-gradient(to bottom, blue, cyan)",
        }}
      >
        <div
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            fontWeight: 600,
            display: "flex",
            flexDirection: "column",
            marginTop: "2rem",
            marginBottom: "2rem",
            marginLeft: "2rem",
            marginRight: "2rem",
            flexGrow: "1",
            borderRadius: "1rem",
          }}
        >
          <p
            style={{
              fontSize: 100,
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            ui/topia
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [{ name: "Inter", data: await Inter }],
      },
    );
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        background: "linear-gradient(to bottom, blue, cyan)",
      }}
    >
      <div
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          marginBottom: "2rem",
          marginLeft: "2rem",
          marginRight: "2rem",
          flexGrow: "1",
          borderRadius: "1rem",
        }}
      >
        <p
          style={{
            fontSize: 50,
            marginTop: "2rem",
            marginBottom: "auto",
            marginLeft: "4rem",
            marginRight: "4rem",
          }}
        >
          RUNFUNRUN.tech
        </p>
        <div
          style={{
            fontSize: 70,
            marginLeft: "4rem",
            marginRight: "4rem",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: "auto",
            marginBottom: "2rem",
            marginLeft: "4rem",
            marginRight: "4rem",
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: await Inter }],
    },
  );
};
