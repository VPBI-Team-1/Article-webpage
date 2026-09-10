/**
 * Utility to strip markdown formatting from a text string.
 * Useful for generating plain text descriptions from markdown content.
 */
export function stripMarkdown(text: string): string {
  if (!text) return "";

  return text
    // Remove headers
    .replace(/^#+\s+/gm, "")
    // Remove bold/italic
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Remove links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // Remove inline code
    .replace(/`([^`]+)`/g, "$1")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove blockquotes
    .replace(/^\s*>\s+/gm, "")
    // Remove lists
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    // Remove horizontal rules
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")
    // Remove extra whitespace and newlines
    .replace(/\s+/g, " ")
    .trim();
}
