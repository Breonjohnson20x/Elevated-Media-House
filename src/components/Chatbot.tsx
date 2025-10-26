import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const knowledgeBase: Record<string, string> = {
  pricing: "We offer three packages: Basic ($50-$75), Pro ($150-$200), and Deluxe ($300-$500). All packages are one-time payments with lifetime distribution. The Pro package is our most popular option and includes professional cover art design and playlist pitching.",
  packages: "Basic includes distribution to 150+ platforms, metadata optimization, and email support. Pro adds cover art design, playlist pitching, and priority support. Deluxe includes everything plus comprehensive marketing, monthly analytics, and VIP support.",
  distribution: "Distribution typically takes 7-14 days. We recommend submitting releases 3-4 weeks before your target date. We distribute to 150+ platforms including Spotify, Apple Music, Amazon, Tidal, YouTube Music, and more.",
  timeline: "Submit your music → We review and optimize metadata (2-3 days) → Distribution to platforms (7-14 days) → Your music goes live → Ongoing support and analytics.",
  ownership: "Yes! You keep 100% ownership of your masters and compositions. We simply distribute your music - you retain all rights and royalties forever.",
  playlists: "While we can't guarantee placements, our Pro and Deluxe packages include strategic pitching to 500+ verified curators. Our success rate is significantly higher than DIY submissions.",
  marketing: "Pro and Deluxe packages include marketing support: 30-day timelines, pre-save campaigns, social media content, and release strategy consultations.",
  support: "Basic: Email support (24-48 hours). Pro: Priority email & chat (12 hours). Deluxe: VIP support including phone, email, and chat with dedicated account manager.",
  ai: "All packages include access to our AI Powerhouse Toolkit with 7 tools: Cover Art Generator, Marketing Copy Writer, Release Strategy Assistant, Metadata Optimizer, Analytics Insights, Social Content Generator, and Music Recommendations Engine.",
  payment: "We accept all major credit cards through secure Stripe payment processing. Payment is due before distribution begins. All sales are one-time payments with no recurring fees.",
  refunds: "We offer refunds if we haven't started distribution yet. Once your music is submitted to platforms, refunds are not available. Contact support for specific cases.",
  contact: "Email us at breonjohnson20x@gmail.com or use the support chat in your dashboard after signing up.",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! I'm your Elevated Media House assistant. Ask me anything about our services, pricing, or the distribution process!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('pricing')) {
      return knowledgeBase.pricing;
    }
    if (lowerQuestion.includes('package') || lowerQuestion.includes('plan')) {
      return knowledgeBase.packages;
    }
    if (lowerQuestion.includes('distribution') || lowerQuestion.includes('distribute') || lowerQuestion.includes('platform')) {
      return knowledgeBase.distribution;
    }
    if (lowerQuestion.includes('timeline') || lowerQuestion.includes('how long') || lowerQuestion.includes('process')) {
      return knowledgeBase.timeline;
    }
    if (lowerQuestion.includes('ownership') || lowerQuestion.includes('rights') || lowerQuestion.includes('keep') || lowerQuestion.includes('own')) {
      return knowledgeBase.ownership;
    }
    if (lowerQuestion.includes('playlist') || lowerQuestion.includes('curator') || lowerQuestion.includes('guarantee')) {
      return knowledgeBase.playlists;
    }
    if (lowerQuestion.includes('marketing') || lowerQuestion.includes('promote') || lowerQuestion.includes('campaign')) {
      return knowledgeBase.marketing;
    }
    if (lowerQuestion.includes('support') || lowerQuestion.includes('help') || lowerQuestion.includes('contact')) {
      return knowledgeBase.support;
    }
    if (lowerQuestion.includes('ai') || lowerQuestion.includes('tool')) {
      return knowledgeBase.ai;
    }
    if (lowerQuestion.includes('payment') || lowerQuestion.includes('pay')) {
      return knowledgeBase.payment;
    }
    if (lowerQuestion.includes('refund') || lowerQuestion.includes('cancel')) {
      return knowledgeBase.refunds;
    }
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('email')) {
      return knowledgeBase.contact;
    }

    return "I'm not sure about that specific question, but I'd love to help! You can ask me about pricing, packages, distribution process, ownership rights, playlists, marketing, AI tools, or support. Or email us at breonjohnson20x@gmail.com for personalized assistance.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const answer = findAnswer(input);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary-hover text-background rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-[600px] bg-surface border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-hover p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-background">
              <Sparkles className="w-5 h-5" />
              <div>
                <div className="font-bold">Elevated Assistant</div>
                <div className="text-xs opacity-90">Always here to help</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-background hover:opacity-80 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-background'
                      : 'bg-surface border border-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border bg-surface">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
