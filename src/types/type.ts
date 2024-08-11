export interface Repo {
  id: number;
  name: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  description: string;

  license: {
    name: string;
  } | null;
}

export interface RepoState {
  items: Repo[];
  loading: boolean;
  error?: string | null;
  selectedRepo: Repo | null;
  totalCount: number;
}

export interface FetchReposParams {
  q: string;
  sort: string;
  order: string;
  page: number;
  per_page: number;
}
