import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AttendanceManagement from '../pages/AttendanceManagement';
import EduJournal from '../pages/EduJournal';
import TimeTable from '../pages/TimeTable';
import Main from '../pages/Main';
import Admin from '../pages/Admin';
import Layout from '../components/Layout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path="/TimeTable"
          element={
            <Layout>
              <TimeTable />
            </Layout>
          }
        />
        <Route
          path="/EduJournal"
          element={
            <Layout>
              <EduJournal />
            </Layout>
          }
        />
        <Route
          path="/AttendanceManagement"
          element={
            <Layout>
              <AttendanceManagement />
            </Layout>
          }
        />
        <Route
          path="/Admin"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
