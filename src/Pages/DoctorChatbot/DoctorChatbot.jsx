import { useState, useRef, useEffect } from "react";

export default function DoctorChatbot() {
  const [messages, setMessages] = useState([
  { role: "bot", text: "Hi! Tell me your symptoms." }
]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input) return;

    setMessages([...messages, { role: "user", text: input }]);
    const userInput = input;
    setInput("");

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
    }
  };

  return (
    <div className="chatbot-container max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">AI Doctor Bot</h2>
      <div className="chat-box border p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "bot" ? "text-left mb-2" : "text-right mb-2"}>
            <p className={msg.role === "bot" ? "bg-gray-200 p-2 rounded" : "bg-green-400 text-white p-2 rounded inline-block"}>
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your symptoms..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
