import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos, setSelectedRepo } from '../../features/repoSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,

} from '@mui/material';
import { RootState } from '../../store';
import s from './RepoTable.module.css';
interface RepoTableProps {
  query: string;
  sortBy: string;
  sortDirection: string;
  page: number;
  setPage: (page: number) => void;
}

/**
 * Компонент для отображения таблицы репозиториев.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.query - Запрос для поиска.
 * @param {string} props.sortBy - Параметр сортировки.
 * @param {string} props.sortDirection - Направление сортировки.
 * @param {number} props.page - Текущая страница.
 * @param {function} props.setPage - Функция для установки страницы.
 */
export const RepoTable: React.FC<RepoTableProps> = ({ query, sortBy, sortDirection, page, setPage }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    dispatch(fetchRepos({ q: query, sort: sortBy, order: sortDirection, page, per_page: 7 }));
  }, [dispatch, query, sortBy, sortDirection, page]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;

  return (
    <div className={s.app}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: '#dddd' }}>
              <TableCell>Name</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Forks</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((repo) => (
              <TableRow key={repo.id} onClick={() => dispatch(setSelectedRepo(repo))}>
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.language}</TableCell>
                <TableCell>{repo.forks_count}</TableCell>
                <TableCell>{repo.stargazers_count}</TableCell>
                <TableCell>{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{ marginTop: '10px' }}
        count={10}

        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
      />
    </div>
  );
};

