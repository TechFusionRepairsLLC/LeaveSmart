import axios from 'axios';
import { getAuthTokens } from './auth';

const API_URL = 'http://localhost:8000';

export interface ChecklistItem {
  id?: number;
  text: string;
  completed: boolean;
}

export interface Checklist {
  id?: number;
  title: string;
  description?: string;
  items: ChecklistItem[];
}

export const fetchChecklists = async () => {
  const tokens = await getAuthTokens();
  if (!tokens) throw new Error('Not authenticated');

  const response = await axios.get(`${API_URL}/checklists`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  return response.data;
};