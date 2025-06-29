export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-16 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              &copy; {year} PDF Zenith. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
