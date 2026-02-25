const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <main className="flex min-h-screen max-w-[110rem] justify-center bg-primary-foreground">
      <div className="w-full pt-16">{children}</div>
    </main>
  </>
);

export default MainLayout;
