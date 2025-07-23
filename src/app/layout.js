import { AuthProvider } from "../components/AuthProvider";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-blue-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
