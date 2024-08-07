import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OrganizationsPage from './pages/OrganizationsPage';
import EmployeesPage from './pages/EmployeesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OrganizationsPage/>}/>
                <Route path="/employees/:id" element={<EmployeesPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
