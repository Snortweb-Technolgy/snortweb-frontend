import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import DOMPurify from 'dompurify';
import { useApp } from "../../context/AppContext";

export default function Chatbot() {
  const { t, language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load welcome message when language changes or chat is initialized
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: "Namaste! Main Snortweb ka AI assistant hoon 👋 / Welcome to Snortweb Technology! What are you looking for today?",
        isBot: true,
        options: [
          "Secure Web Development 🌐",
          "Cyber Security Audits 🛡️",
          "Cloud Architectures ☁️",
          "UI/UX & Branding 🎨"
        ],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Scroll to bottom when messages list updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e, textParam = null) => {
    if (e) e.preventDefault();
    const messageText = textParam !== null ? textParam : inputMsg;
    if (messageText.trim() === "" || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      text: messageText,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (textParam === null) setInputMsg("");
    setIsLoading(true);

    try {
      const { data } = await api.post("/chat", {
        message: userMessage.text,
        language: language
      });

      const sanitizedReply = DOMPurify.sanitize(data.reply);

      const botMessage = {
        id: `bot-${Date.now()}`,
        text: sanitizedReply,
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot response error:", error);
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: language === "hi" 
          ? "माफ़ कीजिये, सर्वर से कनेक्ट करने में कोई समस्या हुई है। कृपया बाद में प्रयास करें।"
          : "Sorry, I am having trouble connecting to the server. Please try again later.",
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLangToggle = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* 1. Floating Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="snortwebtechnology ai"
        className="w-14 h-14 rounded-full bg-[#C8A15A] hover:bg-[#b08c4b] dark:bg-[#C8A15A] text-slate-950 flex items-center justify-center shadow-[0_4px_24px_rgba(200,161,90,0.4)] cursor-pointer relative"
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Active dot indicator */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 2. Expanded Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-18 right-0 w-[350px] max-w-[calc(100vw-2rem)] h-[460px] bg-[#151619]/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-[101]"
          >
            {/* Header */}
            <div className="bg-[#1A1B20] border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C8A15A]/15 border border-[#C8A15A]/30 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-[#C8A15A]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-white/90">
                    {t("chat_header")}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono-code font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>

              {/* Chat language selector widget */}
              <div className="flex items-center gap-1 bg-black/35 border border-white/5 rounded px-1.5 py-0.5 text-[9px] font-mono-code text-white/50 select-none">
                <Globe className="w-3 h-3" />
                <button
                  onClick={() => handleLangToggle("en")}
                  className={`px-1 rounded-sm transition-colors cursor-pointer ${language === "en" ? "text-[#C8A15A] font-bold bg-white/5" : ""}`}
                >
                  EN
                </button>
                <span>|</span>
                <button
                  onClick={() => handleLangToggle("hi")}
                  className={`px-1 rounded-sm transition-colors cursor-pointer ${language === "hi" ? "text-[#C8A15A] font-bold bg-white/5" : ""}`}
                >
                  हिं
                </button>
              </div>
            </div>

            {/* Message Thread Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#151619] to-black/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[85%] ${msg.isBot ? "self-start text-left" : "self-end flex-row-reverse text-right ml-auto"}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${
                    msg.isBot 
                      ? "bg-slate-800 text-[#C8A15A] border border-white/5" 
                      : "bg-[#C8A15A]/15 text-[#C8A15A] border border-[#C8A15A]/20"
                  }`}>
                    {msg.isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  </div>
                  <div className="space-y-1 max-w-full">
                    <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed select-text ${
                      msg.isBot
                        ? "bg-slate-900/60 border border-white/5 text-white/95 rounded-tl-sm"
                        : "bg-[#C8A15A] text-slate-950 rounded-tr-sm font-medium"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.options && (
                      <div className="flex flex-wrap gap-2 pt-1 pb-1">
                        {msg.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(null, opt)}
                            className="text-[10px] px-3 py-1.5 rounded-full border border-[#C8A15A]/30 bg-black/40 text-white/90 hover:bg-[#C8A15A] hover:text-black transition-colors cursor-pointer whitespace-nowrap"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    <span className="text-[8px] text-white/40 font-mono-code block px-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 max-w-[85%] self-start text-left">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-[#C8A15A] border border-white/5 flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-slate-900/60 border border-white/5 p-3 rounded-2xl rounded-tl-sm text-white/95 flex items-center gap-1.5 py-4 min-w-[50px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A15A] animate-[bounce_1s_infinite_100ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A15A] animate-[bounce_1s_infinite_200ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A15A] animate-[bounce_1s_infinite_300ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Footer */}
            <form onSubmit={handleSend} className="bg-[#1A1B20] border-t border-white/10 p-3 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={t("chat_placeholder")}
                className="flex-1 bg-black/50 border border-white/5 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none focus:border-[#C8A15A] transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || inputMsg.trim() === ""}
                className="w-9 h-9 rounded-xl bg-[#C8A15A] disabled:bg-slate-800 text-slate-950 disabled:text-white/30 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
