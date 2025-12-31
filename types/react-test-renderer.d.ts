declare module 'react-test-renderer' {
  import * as React from 'react';

  export interface ReactTestInstance {
    type: any;
    props: Record<string, any>;
    parent: ReactTestInstance | null;
    children: Array<ReactTestInstance | string>;
    find(predicate: (node: ReactTestInstance) => boolean): ReactTestInstance;
    findByType(type: any): ReactTestInstance;
    findAll(
      predicate: (node: ReactTestInstance) => boolean,
      options?: { deep?: boolean }
    ): ReactTestInstance[];
    findAllByType(type: any, options?: { deep?: boolean }): ReactTestInstance[];
  }

  export interface ReactTestRenderer {
    root: ReactTestInstance;
    toJSON(): any;
    update(nextElement: React.ReactElement): void;
    unmount(): void;
  }

  export function act<T>(callback: () => T): T;
  export function create(
    element: React.ReactElement,
    options?: { createNodeMock?: (element: React.ReactElement) => any }
  ): ReactTestRenderer;

  const ReactTestRendererDefault: {
    create: typeof create;
    act: typeof act;
  };

  export default ReactTestRendererDefault;
}
