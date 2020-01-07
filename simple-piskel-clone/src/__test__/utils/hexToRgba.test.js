import convertHexToRgba from "../../components/utils/hexToRgba"

test('adding hex color #0000000 should return color rgba - 0,0,0,255', () => {
    expect(convertHexToRgba('#000000')).toBe('0,0,0,255')
})

test('adding hex color #0000000 should return color rgba - 0,255,0,255', () => {
    expect(convertHexToRgba('#00ff00')).toBe('0,255,0,255')
})