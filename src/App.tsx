import Feed from "./components/Feed";
import Nav from "./components/Nav";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <div>
        <Nav />
        <Feed />
      </div>
    </AuthProvider>
  );
}

export default App;
