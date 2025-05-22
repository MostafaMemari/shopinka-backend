import { ReactNode } from 'react';

export default function TopbarContainer({ children }: { children: ReactNode }) {
  return (
    <header>
      <div className="fixed left-0 right-0 top-0 z-30 bg-muted">{children}</div>
    </header>
  );
}
