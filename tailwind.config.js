module.exports = {
  theme: {
    extend: {
      width: {
        "14": "3.5rem",
        "20": "5rem",
        "48": "12rem",
        "80": "20rem",
        "96": "24rem",
        "128": "32rem",
        "256": "64rem"
      },
      height: {
        "14": "3.5rem",
        "80": "20rem",
        "96": "24rem",
        "128": "32rem",
        "256": "64rem"
      },
      spacing: {
        "14": "3.5rem"
      },
      zIndex: {
        "60": 60,
        "70": 70,
        "80": 80
      },
      fontSize: {
        xxs: "0.625rem"
      },
      borderWidth: {
        "3": "3px"
      },
      maxHeight: {
        "64": "16rem",
        "160": "40rem"
      },
      boxShadow: {
        // right:
        //   "10px 0 10px 4px rgba(0, 0, 0, 0.2), 16px 0 10px 2px rgba(0, 0, 0, 0.2)"
        right:
          "8px 0 6px 2px rgba(42, 67, 101, 1), 14px 0 12px 6px rgba(44, 82, 130, 0.8), 22px 0 6px 4px rgba(43, 108, 176, 0.6)"
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"]
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen lg": {
            maxWidth: "1024px"
          },
          "@screen xl": {
            maxWidth: "1280px"
          }
        }
      });
    }
  ]
};
