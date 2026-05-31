import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Microsoft JhengHei"',
          '"微軟正黑體"',
          '"PingFang TC"',
          "sans-serif",
        ],
      },
      colors: {
        "bg-base": "#F0F4F8",
        "bg-surface": "#FFFFFF",
        "bg-card": "#FFFFFF",
        "bg-card-hover": "#EBF4FF",
        accent: "#4A90D9",
        "accent-teal": "#50BFC3",
        "text-main": "#1E3A5F",
        "text-mid": "#4A7FA5",
        "border-light": "#D6E8F5",
      },
    },
  },
};

export default config;
