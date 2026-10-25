const SCRABBLE_SCORES: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
  m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
  y: 4, z: 10,
};

const GENERAL_KNOWLEDGE: Array<[string, string]> = [
  ["theresa may", "2016"],
  ["eiffel tower", "Paris"],
  ["colour is a banana", "yellow"],
  ["color is a banana", "yellow"],
  ["james bond", "Sean Connery"],
];

export default function QueryProcessor(query: string): string {
  const normalized = query.toLowerCase();

  if (normalized.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (normalized.includes("name")) {
    return "Mad";
  }

  if (normalized.includes("age")) {
    return "67";
  }

  if (normalized.includes("andrew id")) {
    return "mmirzata";
  }

  const largestMatch = query.match(
    /which of the following numbers is the largest:\s*([\d,\s-]+)/i
  );
  if (largestMatch) {
    const numbers = parseNumberList(largestMatch[1]);
    if (numbers.length > 0) {
      const max = Math.max(...numbers);
      return numbers.filter((value) => value === max).join(", ");
    }
  }

  const primesMatch = query.match(
    /which of the following numbers are primes:\s*([\d,\s-]+)/i
  );
  if (primesMatch) {
    return parseNumberList(primesMatch[1]).filter(isPrime).join(", ");
  }

  const squareCubeMatch = query.match(
    /which of the following numbers is both a square and a cube:\s*([\d,\s-]+)/i
  );
  if (squareCubeMatch) {
    const matches = parseNumberList(squareCubeMatch[1]).filter(isSquareAndCube);
    if (matches.length > 0) {
      return matches.join(", ");
    }
  }

  const anagramMatch = query.match(
    /which of the following is an anagram of ["']?([a-z]+)["']?:\s*(.+)/i
  );
  if (anagramMatch) {
    const target = letters(anagramMatch[1]);
    const options = anagramMatch[2].replace(/\?$/, "").split(",");
    const match = options.find((option) => letters(option) === target);
    if (match) {
      return match.trim();
    }
  }

  const scrabbleMatch = query.match(/what is the (?:english )?scrabble score of ([a-z]+)/i);
  if (scrabbleMatch) {
    const score = scrabbleMatch[1]
      .split("")
      .reduce((total, letter) => total + (SCRABBLE_SCORES[letter.toLowerCase()] ?? 0), 0);
    return String(score);
  }

  const fibonacciMatch = query.match(
    /what is the (\d+)(?:st|nd|rd|th) number in the fibonacci sequence/i
  );
  if (fibonacciMatch) {
    return String(fibonacci(parseInt(fibonacciMatch[1], 10)));
  }

  const powerMatch = query.match(/what is (-?\d+) to the power of (\d+)/i);
  if (powerMatch) {
    return integerPower(BigInt(powerMatch[1]), parseInt(powerMatch[2], 10));
  }

  const plusTimesMatch = query.match(
    /what is (-?\d+) plus (-?\d+) multiplied by (-?\d+)/i
  );
  if (plusTimesMatch) {
    const first = parseInt(plusTimesMatch[1], 10);
    const second = parseInt(plusTimesMatch[2], 10);
    const third = parseInt(plusTimesMatch[3], 10);
    return String(first + second * third);
  }

  const timesPlusMatch = query.match(
    /what is (-?\d+) multiplied by (-?\d+) plus (-?\d+)/i
  );
  if (timesPlusMatch) {
    const first = parseInt(timesPlusMatch[1], 10);
    const second = parseInt(timesPlusMatch[2], 10);
    const third = parseInt(timesPlusMatch[3], 10);
    return String(first * second + third);
  }

  const plusMatch = query.match(/what is (-?\d+(?: plus -?\d+)+)/i);
  if (plusMatch) {
    const sum = plusMatch[1]
      .split(/ plus /i)
      .reduce((total, value) => total + parseInt(value, 10), 0);
    return String(sum);
  }

  const minusMatch = query.match(/what is (-?\d+) minus (-?\d+)/i);
  if (minusMatch) {
    return String(parseInt(minusMatch[1], 10) - parseInt(minusMatch[2], 10));
  }

  const productMatch = query.match(/what is (-?\d+) multiplied by (-?\d+)/i);
  if (productMatch) {
    return String(parseInt(productMatch[1], 10) * parseInt(productMatch[2], 10));
  }

  for (const [clue, answer] of GENERAL_KNOWLEDGE) {
    if (normalized.includes(clue)) {
      return answer;
    }
  }

  return "";
}

function parseNumberList(value: string): number[] {
  return value
    .split(",")
    .map((part) => parseInt(part.trim(), 10))
    .filter((part) => !Number.isNaN(part));
}

function isPrime(value: number): boolean {
  if (value < 2) {
    return false;
  }
  if (value % 2 === 0) {
    return value === 2;
  }
  for (let factor = 3; factor * factor <= value; factor += 2) {
    if (value % factor === 0) {
      return false;
    }
  }
  return true;
}

function isSquareAndCube(value: number): boolean {
  if (value < 0) {
    return false;
  }
  const cubeRoot = Math.round(Math.cbrt(value));
  if (cubeRoot * cubeRoot * cubeRoot !== value) {
    return false;
  }
  const squareRoot = Math.round(Math.sqrt(cubeRoot));
  return squareRoot * squareRoot === cubeRoot;
}

function letters(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("");
}

function integerPower(base: bigint, exponent: number): string {
  let result = BigInt(1);
  for (let step = 0; step < exponent; step += 1) {
    result *= base;
  }
  return result.toString();
}

function fibonacci(index: number): number {
  let previous = 0;
  let current = 1;
  for (let step = 0; step < index; step += 1) {
    const next = previous + current;
    previous = current;
    current = next;
  }
  return previous;
}
