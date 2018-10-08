module.exports = {
  plugins: [
    require("autoprefixer")(),
    require("postcss-nested")(),
    require("postcss-simple-vars")({
      variables: {
        // Colors
        $title: "#ffffff",
        $body: "#455a64",
        $disabled: "#cfd8dc",
        $background: "#ffffff",
        $accentPrimary: "#e91e63",
        $accentPrimaryHover: "#880e4f",

        $accentSecondary: "#3f51b5",
        $accentSecondaryHover: "#1a237e",

        // Spacing
        $marginXl: "40px",
        $marginLg: "30px",
        $margin: "20px",
        $marginSm: "10px",
        $marginXs: "8px",

        //Borders
        $borderRadiusLg: "6px",
        $borderRadiusSm: "3px",
        $borderRadiusRound: "50%",

        //Breakpoint variables
        $breakpointSm: "800px",
        $breakpointMd: "1100px",
        $breakpointLg: "1400px",

        //Font variables
        $fontMedium: "400",
        $fontBold: "500",
        $fontExtraBold: "700",
        $fontSize: "18px",
        $fontSizeXs: "9px",
        $fontSizeSm: "12px",
        $fontSizeLg: "24px",
        $fontSizeXl: "28px",
        $fontSizeXxl: "48px"
      }
    }),
    require("postcss-calc")()
  ]
};
