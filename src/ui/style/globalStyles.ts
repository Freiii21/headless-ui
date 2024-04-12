import { css } from "@emotion/react";

import { colors } from "ui/style/colors";
import { fonts } from "ui/style/fonts";

export default css`
	html {
		font-size: calc(100vw / 1920 * 10); //FullHD - the most popular screen size. Estimated viewport is 1920 x 931.
		@media (max-width: 1440px) {
			font-size: calc(100vw / 1440 * 10); //Design in Figma 1440 x 900 and one of the sizes Mac Book Pro.
		}
		@media (max-width: 1366px) {
			font-size: calc(100vw / 1366 * 7); //The second popular screen size. Estimated viewport is 1366 x 625.
		}
		@media (max-width: 1280px) {
			font-size: calc(100vw / 1280 * 8); //The third popular screen size.
		}
		@media (max-width: 1152px) {
			font-size: calc(100vw / 1152 * 8); //Some recommendation size to check 1152 x 700.
		}
		@media (max-width: 1024px) {
			font-size: calc(100vw / 1024 * 7); //The fourth popular screen size.
		}

		//For design development
		//overflow: hidden;
	}

	body {
		${css`
			//Determining the default font-size based on the font-size from the html block.
			${fonts.s}
		`}
		min-height: 100vh;
		margin: 0 auto;
		cursor: default;
		color: ${colors.black};
		background-color: ${colors.white};
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: "Inter", sans-serif;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	input {
		outline: none;
	}
`;
