import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrganizationsPage from './pages/OrganizationsPage';
import EmployeesPage from './pages/EmployeesPage';
import useGlobalStyles from './styles/globalStyles';

function App() {
    useGlobalStyles();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<OrganizationsPage />} />
                <Route path="/employees/:organizationId" element={<EmployeesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
