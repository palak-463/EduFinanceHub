import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './guards/ProtectedRoute';
import AppLayout from './layout/AppLayout';
import Blank from './views/Blank/Blank';
import Dashboard from './views/Dashboard/Dashboard';
import Expense from './views/Expense/Expense';
import Goal from './views/Goal/Goal';
import Home from './views/Home/Home';
import Income from './views/Income/Income';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
import Register from './views/Register/Register';
import Scholarship from './views/Scholarship/Scholarship'
import MeritBased from './views/Scholarship/MeritBased';
import NeedBased from './views/Scholarship/NeedBased';
import InternationalBased from './views/Scholarship/InternatinalBased';
import MinorityBased from './views/Scholarship/MinorityBased';
import ResearchBased from './views/Scholarship/ResearchBased';
import ViewUserScholarships from './views/Scholarship/ViewUserScholarships';
import Investments from './views/Investments/Investments';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path="/" element={<ProtectedRoute/>} >
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='/incomes' element={<Income />} />
            <Route path='/expenses' element={<Expense />} />
            <Route path='/goals' element={<Goal />} />
            <Route path='/commons' element={<Blank />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/scholarship' element={<Scholarship />} /> {/* Route for AppS component */}
            <Route index element={<Dashboard />} />
            <Route path='/merit-based-scholarships' element={<MeritBased/>}/>
            <Route path='/need-based-scholarships' element={<NeedBased/>}/>
            <Route path='/international-based-scholarships' element={<InternationalBased/>}/>
            <Route path='/minority-based-scholarships' element={<MinorityBased/>}/>
            <Route path='/research-based-scholarships' element={<ResearchBased/>}/>
            <Route path='/view-scholarships' element={<ViewUserScholarships/>}/>
            <Route path='/investments' element={<Investments/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
