const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="flex min-h-screen max-w-[110rem] justify-center bg-slate-50 dark:bg-slate-900">
    {children}
  </main>
);

export default MainLayout;
