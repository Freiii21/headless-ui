export const convertRemToPx = (valueInRem: number): number => {
	if (!valueInRem || valueInRem < 0) {
		return 0;
	}

	const documentFontSize = getComputedStyle(document.body).getPropertyValue("font-size");
	const oneRemInPx = parseInt(documentFontSize) / 1.6;

	return valueInRem * oneRemInPx;
};
