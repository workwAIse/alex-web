import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import ChatModal from "./ChatModal";

vi.mock("lottie-react", () => ({ default: () => null }));

/* Mock fetch globally */
const mockFetch = vi.fn();
beforeEach(() => {
  mockFetch.mockReset();
  global.fetch = mockFetch;
});

/* Mock framer-motion to avoid animation issues in tests */
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  motion: {
    div: ({
      children,
      onClick,
      className,
      style,
    }: {
      children: React.ReactNode;
      onClick?: React.MouseEventHandler;
      className?: string;
      style?: React.CSSProperties;
    }) => (
      <div onClick={onClick} className={className} style={style}>
        {children}
      </div>
    ),
  },
}));

describe("ChatModal", () => {
  const defaultProps = {
    jobTitle: "Senior Engineer — Company A",
    onClose: vi.fn(),
  };

  it("renders the macOS window chrome with site title", () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          response: "Some response",
          threadId: "thread_123",
        }),
    });

    render(<ChatModal {...defaultProps} />);
    expect(screen.getByText("alexb-ai.vercel.app")).toBeDefined();
  });

  it("auto-sends the default prompt on mount when initialPrompt is not provided", () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          response: "Some response",
          threadId: "thread_123",
        }),
    });

    render(<ChatModal {...defaultProps} />);

    // The auto-prompt message should appear in the chat
    expect(
      screen.getByText("Tell me more about Senior Engineer — Company A"),
    ).toBeDefined();

    // Fetch should have been called with the default prompt
    expect(mockFetch).toHaveBeenCalledWith("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Tell me more about Senior Engineer — Company A",
        threadId: null,
      }),
    });
  });

  it("auto-sends initialPrompt when provided", () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          response: "Some response",
          threadId: "thread_123",
        }),
    });

    render(
      <ChatModal
        {...defaultProps}
        initialPrompt="What was the tech stack for this project?"
      />,
    );

    expect(screen.getByText("What was the tech stack for this project?")).toBeDefined();
    expect(mockFetch).toHaveBeenCalledWith("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "What was the tech stack for this project?",
        threadId: null,
      }),
    });
  });

  it("renders the input field for follow-up questions", () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          response: "Some response",
          threadId: "thread_123",
        }),
    });

    render(<ChatModal {...defaultProps} />);
    const input = screen.getByPlaceholderText("Ask a follow-up...");
    expect(input).toBeDefined();
  });

  it("calls onClose when Escape is pressed", () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          response: "Some response",
          threadId: "thread_123",
        }),
    });

    render(<ChatModal {...defaultProps} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when close button (red dot) is clicked", () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          response: "Some response",
          threadId: "thread_123",
        }),
    });

    render(<ChatModal {...defaultProps} />);
    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
