import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from './Page';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Header from './Header';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Page />}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
