function convertRgbaToHex(rgbaColor) {
    let color;

    if (typeof rgbaColor === 'string') {
        color = rgbaColor.split(',');
        } else {
        color = rgbaColor;
    }

    const hexString = `#${color
        .map(number => {
        const hexChars = Number(number).toString(16);
        return hexChars.length === 1 ? `0${hexChars}` : hexChars;
        })
    .join('')
    .slice(0, -2)}`;

    return hexString;
}  

export default convertRgbaToHex;