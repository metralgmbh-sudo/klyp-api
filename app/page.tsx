"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await res.json();
      setReply(data.reply || "No response");
    } catch (err) {
      setReply("Error connecting to AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>KLYP AI</h1>

      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div style={{ marginTop: 20 }}>
          <strong>KLYP:</strong>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}