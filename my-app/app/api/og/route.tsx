import { ImageResponse } from "next/og";

export const runtime = "edge";

export const GET = async () => {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1E0E",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: -2,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Visione
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#4FA45A",
              letterSpacing: -2,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Sostenibile
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#4FA45A",
              letterSpacing: 1,
              marginTop: 16,
            }}
          >
            Giardini Biodinamici a Torino
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#4FA45A",
            }}
          />
          <div
            style={{
              fontSize: 18,
              color: "#FFFFFF",
              opacity: 0.7,
            }}
          >
            www.visionesostenibile.it
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};
