// ChatWidget.tsx (React + Tailwind) — UI-only
import { useState } from "react";
import { MessageCircle, X, Paperclip, Maximize2, Minimize2 } from "lucide-react";

const sampleMessages = [
  { id: 1, from: "bot", text: "Hi! Need help with the dashboard?" },
  { id: 2, from: "user", text: "Show me top selling products." },
  { id: 3, from: "bot", text: "Sure — open the Products tab and sort by revenue." },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const[isMaximized ,setIsMaximized] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: input }]);
    setInput("");
    // design-only: optionally show a fake bot reply for demo
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "bot", text: "Thanks — this is a UI demo reply." },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-xl text-white ring-2 ring-offset-2 ring-offset-transparent hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Panel */}
      {open && (
        <div 
  className={`fixed z-50 rounded-xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden transition-all duration-300 ${
    isMaximized 
      ? "bottom-10 right-10 w-[80vw] h-[80vh]"  // customization for chat area maximize
      : "right-6 bottom-20 w-[360px] max-w-full"
  }`}
>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-br from-purple-600 to-pink-500 text-white">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-white/20 flex items-center justify-center text-sm font-bold">AI</div>
              <div>
                <div className="text-sm font-semibold">Assistant (Design Demo)</div>
                <div className="text-xs opacity-80">This is a UI-only mock</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
  <button 
    onClick={() => setIsMaximized(!isMaximized)} 
    aria-label={isMaximized ? "Minimize chat" : "Maximize chat"} 
    className="p-1 rounded-md hover:bg-white/20"
  >
    {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
  </button>
  <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 rounded-md hover:bg-white/20">
    <X className="w-4 h-4" />
  </button>
</div>
          </div>

          {/* Messages */}
          <div 
  className={`overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-white to-white ${
    isMaximized ? "h-[calc(100vh-180px)]" : "max-h-72"
  }`}
>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] px-3 py-2 rounded-lg text-sm ${
                    m.from === "user"
                      ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-gray-100 transition "
            aria-label="Attach image"
            >
              <Paperclip className="w-5 h-5 text-gray-500"/>
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message (design only)..."
              className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={send}
              className="rounded-md bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
