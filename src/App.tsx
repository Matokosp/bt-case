import { Home, User, Albums } from './pages/index';
import { Breadcrumbs } from './sections/Breadcrumbs/Breadcrumbs';
// @ts-ignore
import StoreProvider from './store/StoreProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user/:id" element={<User />} />
          <Route path="user/:id/album/:albumId" element={<Albums />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
