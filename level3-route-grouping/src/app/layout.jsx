

export default function RootLayout({ children, parallelRoute }) {
  return (
    <html lang="en">
      <body>
        {children}
        {parallelRoute}
      </body>
    </html>
  );
}
