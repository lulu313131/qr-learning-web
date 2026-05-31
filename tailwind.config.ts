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
        primary: "#0076CB",
        success: "#34C759",
        "text-main": "#1D1D1F",
        "text-secondary": "#86868B",
      },
    },
  },
};

export default config;
