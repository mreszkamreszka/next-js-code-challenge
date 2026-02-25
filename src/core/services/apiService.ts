const API_BASEURL = 'https://pokeapi.co/api/v2';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

const api = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${API_BASEURL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data };
    } catch (error: any) {
      console.error('Error fetching data:', error);
      return { data: null as any, error: error.message };
    }
  },
};

export default api;
