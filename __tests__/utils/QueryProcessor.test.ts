import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Madina"
          ));
    })

    test("should return my andrew id", () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("mmirzata"); // ← same ID as above
      });

    test.each([
        ["Which of the following numbers is the largest: 93, 95, 89?", "95"],
        ["Which of the following numbers is the largest: 65, 24, 9?", "65"],
        ["Which of the following numbers is the largest: 61, 5, 17?", "61"],
        ["Which of the following numbers is the largest: 81, 49, 71?", "81"],
        ["Which of the following numbers is the largest: 1, 82, 79?", "82"],
        ["Which of the following numbers is the largest: 57, 97, 69?", "97"],
        ["Which of the following numbers is the largest: 47, 76, 71?", "76"],
        ["Which of the following numbers is the largest: 42, 45, 51?", "51"],
    ])("should return the largest number for %s", (query, expected) => {
        expect(QueryProcessor(query)).toBe(expected);
    });

    test.each([
        ["What is 82 plus 73?", "155"],
        ["What is 33 plus 16?", "49"],
        ["What is 82 plus 97?", "179"],
    ])("should add numbers for %s", (query, expected) => {
        expect(QueryProcessor(query)).toBe(expected);
    });
});