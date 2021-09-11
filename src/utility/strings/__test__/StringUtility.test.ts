import { convertKebabCaseToCamelCase, reverseString } from "../StringUtility";

describe("reverse", () => {
    it("should return a reversed string", () => {
        const expected = "fedcba"
        const reversed = reverseString("abcdef");
        expect(reversed).toBe(expected);
    });

    it("should return an empty string", () => {
        const expected = ""
        const reversed = reverseString("");
        expect(reversed).toBe(expected);
    });
});

describe("convertKebabCaseToCamelCase", () => {
    it("should return a converted string", () => {
        const expected = "abcDefG";
        const converted = convertKebabCaseToCamelCase("abc-def-g");
        expect(converted).toBe(expected);
    });

    it("should return undefined for undefined", () => {
        const converted = convertKebabCaseToCamelCase(undefined);
        expect(converted).toBeUndefined();
    });

    it("should return undefined for null", () => {
        const converted = convertKebabCaseToCamelCase(null);
        expect(converted).toBeUndefined();
    });

    it("should return blank string for a blank string", () => {
        const expected = "";
        const converted = convertKebabCaseToCamelCase("");
        expect(converted).toBe(expected);
    });
});