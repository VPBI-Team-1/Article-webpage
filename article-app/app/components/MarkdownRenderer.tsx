import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 mt-6 mb-3">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-5 mb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-800">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-800">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 py-1 italic text-gray-600 my-4">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 rounded px-1.5 py-0.5 font-mono text-sm text-red-600">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm my-4 font-mono">
      {children}
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {children}
    </a>
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}
