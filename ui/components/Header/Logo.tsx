import * as React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 191.1 223.9"
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M70.4 0h50.3l70.4 223.9h-50.3L70.4 0z"
      style={{
        fill: "#517cd9",
      }}
    />
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={216.9}
      y1={25.7}
      x2={44.6}
      y2={198}
      gradientTransform="matrix(1 0 0 -1 0 223.8)"
    >
      <stop
        offset={0}
        style={{
          stopColor: "#517cd9",
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: "#2c58b9",
        }}
      />
    </linearGradient>
    <path
      d="M70.4 0h50.3l70.4 223.9h-50.3L70.4 0z"
      style={{
        fill: "url(#a)",
      }}
    />
    <path
      style={{
        fill: "#21356a",
      }}
      d="m75.4 143.9-25.1 80H0l25.1-80z"
    />
    <path
      style={{
        fill: "#81a9ff",
      }}
      d="M120.7 0 94.9 82H44.6L70.4 0z"
    />
  </svg>
);
