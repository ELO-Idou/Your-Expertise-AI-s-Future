import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { UserProfile } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function formatProfileForSystemInstruction(profile: UserProfile): string {
    if (!profile || !profile.domainExpertise) return "User has not completed their profile yet.";

    return `
--- USER PROFILE ---
Experience Summary: ${profile.professionalBackground || 'Not provided'}
Domain Expertise: ${profile.domainExpertise || 'Not provided'}
Target AI Lab Roles: ${profile.targetRoles.join(', ') || 'Not specified'}
Career Aspirations: ${profile.careerAspirations || 'Not provided'}
--- END USER PROFILE ---
    `;
}


export function initializeChat(profile: UserProfile): Chat {
  const profileContext = formatProfileForSystemInstruction(profile);
  const fullSystemInstruction = `${SYSTEM_INSTRUCTION}\n${profileContext}`;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: fullSystemInstruction,
    },
  });
}