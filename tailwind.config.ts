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
        "bg-base": "#1D3752",
        "bg-surface": "#182E45",
        "bg-card": "#214D72",
        "bg-card-hover": "#2C7695",
        "bg-input": "#1D3752",
        accent: "#F7C232",
        "accent-dim": "#C99A20",
        teal: "#50BFC3",
        "mid-blue": "#2C7695",
        "text-warm": "#F0F4F8",
        "text-muted-green": "#50BFC3",
      },
    },
  },
};

export default config;
