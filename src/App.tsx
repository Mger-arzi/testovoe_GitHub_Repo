import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, styled, Paper } from '@mui/material';
import { store } from './store';
import { RepoDetails } from './components/RepoDetails/RepoDetails';
import { RepoTable } from './components/RepoTable/RepoTable';
import s from './App.module.css';
/**
 * Основной компонент приложения.
 */
export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [sortDirection, setSortDirection] = useState('desc');
  const [page, setPage] = useState(1);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <Provider store={store}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <form onSubmit={handleSearch} className={s.form}>
              <TextField
                className={s.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search repositories"
              />
              <Button className={s.button} type="submit">Search</Button>
            </form>
            <div className={s.direction}>
              <FormControl>
                <InputLabel >Sort by</InputLabel>
                <Select style={{ marginTop: '10px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value as string)}>
                  <MenuItem value="stars">Stars</MenuItem>
                  <MenuItem value="forks">Forks</MenuItem>
                  <MenuItem value="updated">Updated At</MenuItem>
                </Select>
              </FormControl>
              <FormControl >
                <InputLabel>Direction</InputLabel>
                <Select style={{ marginTop: '10px' }} value={sortDirection} onChange={(e) => setSortDirection(e.target.value as string)}>
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Item>
          <Grid item xs={12}>
            <Item>
              <RepoTable
                query={query}
                sortBy={sortBy}
                sortDirection={sortDirection}
                page={page}
                setPage={setPage}
              />
            </Item>

          </Grid>
        </Grid>

        <Grid item xs={4}>
          <RepoDetails />

        </Grid>



      </Grid>

    </Provider >
  );
};

