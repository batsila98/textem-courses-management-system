import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from 'renderer/pages/Auth/Auth';
import Students from 'renderer/pages/Students/Students';
import CreateStudent from 'renderer/pages/CreateStudent/CreateStudent';
import SingleStudent from 'renderer/pages/SingleStudent/SingleStudent';
import Courses from 'renderer/pages/Courses/Courses';
import CreateCourse from 'renderer/pages/CreateCourse/CreateCourse';
import SingleCourse from 'renderer/pages/SingleCourse/SingleCourse';
import Invoices from 'renderer/pages/Invoices/Invoices';
import CreateInvoice from 'renderer/pages/CreateInvoice/CreateInvoice';
import SingleInvoice from 'renderer/pages/SingleInvoice/SingleInvoice';
import Payments from 'renderer/pages/Payments/Payments';
import CreatePayment from 'renderer/pages/CreatePayment/CreatePayment';
import SinglePayment from 'renderer/pages/SinglePayment/SinglePayment';
import Teachers from 'renderer/pages/Teachers/Teachers';
import SingleTeacher from 'renderer/pages/SingleTeacher/SingleTeacher';
import CreateTeacher from 'renderer/pages/CreateTeacher/CreateTeacher';
import Dashboard from 'renderer/pages/Dashboard/Dashboard';
import ModalMessage from 'renderer/components/ModalMessage/ModalMessage';
import RouteGuard from 'renderer/components/RouteGuard/RouteGuard';
import Settings from 'renderer/pages/Settings/Settings';
import SingleUser from 'renderer/pages/SingleUser/SingleUser';
import LayoutSidebar from 'renderer/layouts/LayoutSidebar/LayoutSidebar';
import './App.scss';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RouteGuard>
                <LayoutSidebar />
              </RouteGuard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/create" element={<CreateStudent />} />
            <Route path="students/:id" element={<SingleStudent />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/create" element={<CreateCourse />} />
            <Route path="courses/:id" element={<SingleCourse />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/create" element={<CreateInvoice />} />
            <Route path="invoices/:id" element={<SingleInvoice />} />
            <Route path="payments" element={<Payments />} />
            <Route path="payments/create" element={<CreatePayment />} />
            <Route path="payments/:id" element={<SinglePayment />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/create" element={<CreateTeacher />} />
            <Route path="teachers/:id" element={<SingleTeacher />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users/:id" element={<SingleUser />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
      <ModalMessage />
    </>
  );
}
