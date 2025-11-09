export enum MessageSender {
  USER = 'user',
  AI = 'ai',
}

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
}

export interface UserProfile {
  professionalBackground: string;
  domainExpertise: string;
  targetRoles: string[];
  careerAspirations: string;
}

export interface User {
  id: string;
  email: string;
  profile: UserProfile;
}