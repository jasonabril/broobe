import { MainLayout } from "./components/layout";
import { Router } from "./router";
import { LoginProvider } from "./components/login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <MainLayout>
          <Router />
        </MainLayout>
      </LoginProvider>
    </div>
  );
}

export default App;
