// External imports.
import * as React from 'react';
import { Portal as PaperPortal } from 'react-native-paper';

// Types imports.
interface PortalProps {
  children: React.ReactNode;
}

/**
 * Wrapper around react-native-paper Portal for testability.
 * This can be mocked in tests while maintaining the same API.
 */
const Portal: React.FC<PortalProps> = ({ children }) => {
  return <PaperPortal>{children}</PaperPortal>;
};

export default Portal;
