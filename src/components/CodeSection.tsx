"use client";

/**
 * Code section — Cursor IDE style.
 * Dark green-grey editor (#2e3d37), syntax-style colors, line numbers, tabs, breadcrumbs, status bar.
 * Content left-aligned like an open editor.
 */

const PLACEHOLDER_CODE = [
  { tokens: [{ type: "keyword", text: "const" }, { type: "plain", text: " " }, { type: "name", text: "projects" }, { type: "plain", text: " = " }, { type: "string", text: '"Project 1"' }, { type: "plain", text: ", " }, { type: "string", text: '"Project 2"' }, { type: "plain", text: ";" }] },
  { tokens: [{ type: "keyword", text: "export" }, { type: "plain", text: " " }, { type: "keyword", text: "default" }, { type: "plain", text: " " }, { type: "name", text: "projects" }, { type: "plain", text: ";" }] },
];

function CodeLine({ line, lineNum }: { line: typeof PLACEHOLDER_CODE[0]; lineNum: number }) {
  return (
    <div className="flex w-full">
      <span
        className="select-none pr-6 text-right font-mono text-sm"
        style={{ color: "#6b7b6b", minWidth: "3ch" }}
        aria-hidden
      >
        {lineNum}
      </span>
      <code className="flex-1 font-mono text-sm leading-relaxed">
        {line.tokens.map((t, i) => (
          <span
            key={i}
            style={{
              color:
                t.type === "keyword"
                  ? "#c586c0"
                  : t.type === "string"
                    ? "#ce9178"
                    : t.type === "name"
                      ? "#9cdcfe"
                      : "#d4d4d4",
            }}
          >
            {t.text}
          </span>
        ))}
      </code>
    </div>
  );
}

export default function CodeSection() {
  return (
    <section
      id="code"
      className="relative w-full font-mono"
      style={{
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
      }}
    >
      {/* Menu bar */}
      <div
        className="flex items-center gap-4 px-4 py-2 text-xs"
        style={{ backgroundColor: "#252526", color: "#cccccc" }}
      >
        <span>Cursor</span>
        <span>File</span>
        <span>Edit</span>
        <span>Selection</span>
        <span>View</span>
        <span>Go</span>
        <span>Run</span>
        <span>Terminal</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      {/* Tab bar + breadcrumbs */}
      <div
        className="flex flex-col border-b"
        style={{ backgroundColor: "#252526", borderColor: "#3c3c3c" }}
      >
        <div className="flex items-center gap-1 px-2 pt-2">
          <span className="text-xs" style={{ color: "#858585" }}>
            src &gt; components &gt;
          </span>
          <span className="text-xs" style={{ color: "#cccccc" }}>
            hobby-projects.ts
          </span>
        </div>
        <div className="mt-1 flex">
          <div
            className="flex items-center gap-2 border-t-2 px-3 py-2 text-sm"
            style={{
              backgroundColor: "#2e3d37",
              borderColor: "#2e3d37",
              color: "#cccccc",
            }}
          >
            <span style={{ color: "#ce9178" }}>hobby-projects.ts</span>
          </div>
          <div
            className="flex items-center gap-2 border-t-2 px-3 py-2 text-sm"
            style={{
              backgroundColor: "#252526",
              borderColor: "transparent",
              color: "#858585",
            }}
          >
            CodeSection.test.tsx
          </div>
        </div>
      </div>

      {/* Editor: line numbers + code, left-aligned */}
      <h2 className="sr-only">Code</h2>
      <div
        className="flex"
        style={{
          backgroundColor: "#2e3d37",
          minHeight: "280px",
        }}
      >
        <div className="w-full max-w-4xl py-4 pl-6 pr-8">
          {PLACEHOLDER_CODE.map((line, i) => (
            <CodeLine key={i} line={line} lineNum={i + 1} />
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between gap-4 px-4 py-1.5 text-xs"
        style={{ backgroundColor: "#252526", color: "#cccccc" }}
      >
        <div className="flex items-center gap-4">
          <span style={{ color: "#858585" }}>main* alex-web</span>
          <span>0 Δ 0</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>TypeScript</span>
        </div>
      </div>
    </section>
  );
}
