import React, { FC, ReactNode } from 'react';

interface GuideLayoutProps {
  children: ReactNode;
}

/**
 * Layout component for guide pages (full screen without header/footer)
 */
const GuideLayout: FC<GuideLayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default GuideLayout;