import { useEffect, useState } from 'react';

import {fetchRepositories } from '../../../api'

const RepositoryList = () => {
  const [repositories, setRepositories] = useState<any[]>([]);

  useEffect(() => {
    const getRepositories = async () => {
      try {
        const data = await fetchRepositories('javascript', 1, 'ACCESS_TOKEN');
        setRepositories(data.items);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    getRepositories();
  }, []);

  return (
    <div>
      <h1>Репозитории</h1>
      {repositories.length > 0 ? (
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      ) : (
        <p>По такому запросу репозитории не найдены</p>
      )}
    </div>
  );
};

export default RepositoryList;
