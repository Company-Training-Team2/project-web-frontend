// Renders the AI service's reply text. The assistant is instructed (see
// ai-service/main.py SYSTEM_INSTRUCTION) to send vendor images as Markdown
// `![alt](url)` and emphasis as `**bold**`. No markdown library is in this
// project yet, so this does the minimal parsing needed for those two cases
// instead of pulling one in for two token types.
import Image from "next/image";
import { Fragment } from "react";

const IMAGE_PATTERN = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

function renderBold(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-b-${i}`}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={`${keyPrefix}-t-${i}`}>{part}</Fragment>
    )
  );
}

export default function AiMessageText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, lineIndex) => {
        const key = `l-${lineIndex}`;
        const nodes: React.ReactNode[] = [];
        let lastIndex = 0;

        // `matchAll` (unlike `exec` in a loop) doesn't mutate the shared
        // regex's `lastIndex`, so it's safe to reuse the module-level
        // pattern across renders.
        for (const match of line.matchAll(IMAGE_PATTERN)) {
          if (match.index > lastIndex) {
            nodes.push(renderBold(line.slice(lastIndex, match.index), `${key}-${lastIndex}`));
          }
          const [, alt, url] = match;
          nodes.push(
            <Image
              key={`${key}-img-${match.index}`}
              src={url}
              alt={alt || "vendor"}
              width={240}
              height={160}
              unoptimized
              className="mt-1 h-40 w-full max-w-[240px] rounded-lg object-cover"
            />
          );
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < line.length) {
          nodes.push(renderBold(line.slice(lastIndex), `${key}-${lastIndex}`));
        }

        return line.trim() === "" ? (
          <br key={key} />
        ) : (
          <p key={key} className="leading-[1.6]">
            {nodes}
          </p>
        );
      })}
    </div>
  );
}
