import { useState, useRef, useEffect } from "react";

export default function DoctorChatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Tell me your symptoms." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/suggest-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom: userInput }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.suggestion }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">AI Doctor Bot</h2>
      <div className="chat-box border p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "bot" ? "text-left mb-2" : "text-right mb-2"}
          >
            <p
              className={
                msg.role === "bot"
                  ? "bg-gray-200 p-2 rounded"
                  : "bg-blue-500 text-white p-2 rounded inline-block"
              }
            >
              {msg.text}
            </p>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="text-left mb-2">
            <p className="bg-gray-200 p-2 rounded inline-flex items-center animate-waving-dots">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="flex">
        <input
          className="flex-1 border p-2 rounded bg-blue-100 focus:bg-blue-200 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your symptoms..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 ml-2 rounded"
        >
          Send
        </button>
      </div>

      {/* Regular <style> for plain React */}
      <style>{`
        .animate-waving-dots {
          display: inline-flex;
          align-items: center;
        }
        .dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin: 0 1px;
          background-color: #4b5563;
          border-radius: 50%;
          animation: wave 1.2s infinite;
        }
        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes wave {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
