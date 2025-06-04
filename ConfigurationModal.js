import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';

import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckIcon from '@mui/icons-material/Check';

const icons = {
  1: <SearchIcon />,
  2: <SettingsIcon />,
  3: <ArticleIcon />,
  4: <AssessmentIcon />,
};

const StepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  color: theme.palette.common.white,
  display: 'flex',
  height: 40,
  width: 40,
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  '&.active': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.completed': {
    backgroundColor: '#2e7d32',
  },
}));

export default function CustomStepIcon(props) {
  const { active, completed, icon, className } = props;

  return (
    <StepIconRoot className={clsx(className, { active, completed })}>
      {completed ? <CheckIcon /> : icons[icon]}
    </StepIconRoot>
  );
}
