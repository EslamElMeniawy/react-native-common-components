// Mock implementation of PaperPortal for testing
import * as React from 'react';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  return <>{children}</>;
};

export default Portal;
