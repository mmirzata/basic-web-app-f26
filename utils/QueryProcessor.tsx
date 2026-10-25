export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Mad";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "mmirzata"; 
  }

  const largestMatch = query.match(
    /which of the following numbers is the largest:\s*([\d,\s]+)/i
  );
  if (largestMatch) {
    const numbers = largestMatch[1]
      .split(",")
      .map((value) => parseInt(value.trim(), 10))
      .filter((value) => !Number.isNaN(value));
    if (numbers.length > 0) {
      return String(Math.max(...numbers));
    }
  }

  const plusMatch = query.match(/what is (\d+(?: plus \d+)+)/i);
  if (plusMatch) {
    const sum = plusMatch[1]
      .split(/ plus /i)
      .reduce((total, value) => total + parseInt(value, 10), 0);
    return String(sum);
  }

  const productMatch = query.match(/what is (\d+) multiplied by (\d+)/i);
  if (productMatch) {
    return String(parseInt(productMatch[1], 10) * parseInt(productMatch[2], 10));
  }

  const squareCubeMatch = query.match(
    /which of the following numbers is both a square and a cube:\s*([\d,\s]+)/i
  );
  if (squareCubeMatch) {
    const numbers = squareCubeMatch[1]
      .split(",")
      .map((value) => parseInt(value.trim(), 10))
      .filter((value) => !Number.isNaN(value));
    const match = numbers.find((value) => isSquareAndCube(value));
    if (match !== undefined) {
      return String(match);
    }
  }

  return "";
}

function isSquareAndCube(value: number): boolean {
  const cubeRoot = Math.round(Math.cbrt(value));
  if (cubeRoot * cubeRoot * cubeRoot !== value) {
    return false;
  }
  const squareRoot = Math.round(Math.sqrt(cubeRoot));
  return squareRoot * squareRoot === cubeRoot;
}
