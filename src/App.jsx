import { MainLayout } from "./components/layout";
import { Router } from "./router";
import { LoginProvider } from "./components/login";
import "./App.css";

function App() {
  return (
    <LoginProvider>
      <MainLayout>
        <Router />
      </MainLayout>
    </LoginProvider>
  );
}

export default App;
