import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Message, MessageSender } from '../types';
import { AiIcon, SendIcon, UserIcon } from './icons';
import { initializeChat } from '../services/geminiService';
import { GREETING_MESSAGE, PROFILE_UPDATED_GREETING } from '../constants';
import type { Chat } from '@google/genai';
import { AuthContext } from '../contexts/AuthContext';

const ChatInterface: React.FC = () => {
  const { user } = useContext(AuthContext);
  const userProfile = user!.profile;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-greeting',
      text: GREETING_MESSAGE,
      sender: MessageSender.AI,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [interviewPrepStarted, setInterviewPrepStarted] = useState(false);


  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isProfileSet = userProfile && !!userProfile.domainExpertise;

  useEffect(() => {
    // Initialize or re-initialize the chat session when the profile changes.
    if (userProfile) {
        chatRef.current = initializeChat(userProfile);
    }
    
    // If a profile has been set, reset the chat with a new greeting.
    if(isProfileSet) {
      setMessages([
        {
          id: 'profile-updated-greeting',
          text: PROFILE_UPDATED_GREETING,
          sender: MessageSender.AI,
        }
      ]);
      setPlanGenerated(false);
      setInterviewPrepStarted(false);
    } else {
        setMessages([
            {
              id: 'initial-greeting',
              text: GREETING_MESSAGE,
              sender: MessageSender.AI,
            },
          ]);
    }
  }, [userProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: MessageSender.USER,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      if (!chatRef.current) {
        throw new Error("Chat session not initialized.");
      }
      const response = await chatRef.current.sendMessage({ message: userMessage.text });
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: MessageSender.AI,
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      const planPrompt = "Using my profile, generate a structured 'AI Contribution Plan'. Explain why my knowledge is crucial, outline my next steps, and conclude by recommending specific job platforms where I can find opportunities.";
      if (messageText.includes("AI Contribution Plan")) {
        setPlanGenerated(true);
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, something went wrong. Please try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSendMessage(input);
  };
  
  const handleGeneratePlan = () => {
    const planPrompt = "Using my profile, generate a structured 'AI Contribution Plan'. Explain why my knowledge is crucial, outline my next steps, and conclude by recommending specific job platforms where I can find opportunities.";
    handleSendMessage(planPrompt);
  };

  const handleInterviewPrep = () => {
    const interviewPrompt = "That's helpful! Now, can you help me prepare for interviews for these kinds of roles? Please structure your advice based on a standard interview rubric.";
    handleSendMessage(interviewPrompt);
    setInterviewPrepStarted(true);
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 max-w-2xl ${
              msg.sender === MessageSender.USER ? 'ml-auto justify-end' : 'mr-auto'
            }`}
          >
            {msg.sender === MessageSender.AI && (
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center">
                <AiIcon className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`rounded-2xl p-4 text-white shadow-md ${
                msg.sender === MessageSender.USER
                  ? 'bg-blue-600 rounded-br-none'
                  : 'bg-gray-700 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
            {msg.sender === MessageSender.USER && (
              <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center">
                <AiIcon className="w-5 h-5 text-white" />
              </div>
            <div className="bg-gray-700 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-0"></span>
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
        )}
        {error && <div className="text-red-400 text-center p-2 rounded-lg bg-red-900/50">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700 bg-gray-800 space-y-3">
        {isProfileSet && (
            <div className="flex justify-center">
                {!planGenerated ? (
                  <button 
                      onClick={handleGeneratePlan}
                      disabled={isLoading}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                      Generate My AI Contribution Plan
                  </button>
                ) : !interviewPrepStarted ? (
                  <button
                    onClick={handleInterviewPrep}
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    Help me prepare for interviews
                  </button>
                ) : null}
            </div>
        )}
         {!isProfileSet && (
          <div className="text-center text-xs text-gray-400">
            Please complete your profile using the icon in the top right to get personalized guidance.
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isProfileSet ? "Ask how your expertise can be used..." : "Tell me about your experience..."}
            disabled={isLoading}
            className="flex-1 w-full bg-gray-700 border border-gray-600 rounded-full py-3 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-300"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
