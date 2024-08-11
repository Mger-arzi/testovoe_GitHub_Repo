import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchReposParams, Repo, RepoState } from '../types/type';


/**
 * Async thunk для загрузки репозиториев с GitHub API.
 * @param {FetchReposParams} params - Параметры запроса.
 * @returns {Promise} - Промис с данными репозиториев.
 */
export const fetchRepos = createAsyncThunk<Repo[], FetchReposParams>(
  'repos/fetchRepos',
  async (params) => {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params,
      headers: {
        Authorization: `gh token`,
      },
    });
    return response.data.items;
  }
);

const repoSlice = createSlice({
  name: 'repos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedRepo: null,
    totalCount: 0,
  } as RepoState,
  reducers: {
    setSelectedRepo: (state, action: PayloadAction<Repo | null>) => {
      state.selectedRepo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedRepo } = repoSlice.actions;
export const repoReducer = repoSlice.reducer;
