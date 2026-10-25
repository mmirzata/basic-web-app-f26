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

  return "";
}
