const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="flex min-h-screen max-w-[110rem] justify-center bg-primary-foreground">
    {children}
  </main>
);

export default MainLayout;
