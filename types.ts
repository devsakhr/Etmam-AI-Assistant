export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  url: string;
  description: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string for display and API context
  timestamp: Date;
  suggestedProducts?: Product[]; // List of products to display as cards
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
