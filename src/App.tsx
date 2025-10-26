import { Route, Switch } from 'wouter';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ClientPortal } from './pages/ClientPortal';
import { AITools } from './pages/AITools';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/portal" component={ClientPortal} />
          <Route path="/ai-tools" component={AITools} />
          <Route path="/">
            <Header />
            <Home />
            <Chatbot />
          </Route>
          <Route>
            <Header />
            <div className="min-h-screen flex items-center justify-center px-4">
              <div className="text-center space-y-4">
                <h1 className="text-6xl font-bold text-gradient">404</h1>
                <p className="text-xl text-text-secondary">Page not found</p>
                <a href="/" className="inline-block">
                  <button className="btn-primary">Go Home</button>
                </a>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
