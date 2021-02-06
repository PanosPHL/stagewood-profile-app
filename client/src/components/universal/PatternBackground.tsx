import React from 'react';
import { makeStyles } from '@material-ui/core';
import background from '../../assets/bg-pattern-tile.svg';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${background})`,
    backgroundPositionX: '200px',
    backgroundSize: '1000px',
  },
  container: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));

export enum PageType {
  Auth = 'auth',
  Home = 'home',
}

interface PatternBackgroundProps {
  pageType: PageType;
}

const PatternBackground: React.FC<PatternBackgroundProps> = ({
  pageType,
  children,
}) => {
  const { background, container } = useStyles();

  if (pageType === PageType.Auth) {
    return (
      <div className={background}>
        <section className={container}>{children}</section>
      </div>
    );
  } else {
    return (
      <div className={background}>
        <div className={container}>{children}</div>
      </div>
    );
  }
};

export default PatternBackground;
