import axios from 'axios';

const GITHUB_API = 'https://api.github.com/search/repositories';

export const fetchRepositories = async (query: string, page: number = 1, token?: string) => {
  const headers = token ? { Authorization: `token ${token}` } : {};
  
  try {
    const response = await axios.get(GITHUB_API, {
      params: {
        q: query,
        sort: 'stars',
        order: 'asc',
        page: page,
      },
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  }
};
