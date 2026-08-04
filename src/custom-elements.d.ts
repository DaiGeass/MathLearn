import type React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'math-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          class?: string;
          'read-only'?: string | boolean;
          ref?: React.Ref<HTMLElement>;
        };
      }
    }
  }

  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        class?: string;
        'read-only'?: string | boolean;
        ref?: React.Ref<HTMLElement>;
      };
    }
  }
}

export {};