// src/components/RepoDetails.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { RootState } from '../../store';

/**
 * Компонент для отображения деталей выбранного репозитория.
 */
export const RepoDetails: React.FC = () => {
  const selectedRepo = useSelector((state: RootState) => state.repos.selectedRepo);

  if (!selectedRepo) return null;

  return (
    <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#70b2cc33', height: '90vh' }}>
      <Typography variant="h5">{selectedRepo.name}</Typography>
      <Typography variant="body1">{selectedRepo.description}</Typography>
      <Typography variant="body2">License: {selectedRepo.license ? selectedRepo.license.name : 'None'}</Typography>
    </Paper>
  );
};

