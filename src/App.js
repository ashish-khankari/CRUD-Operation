import Form from "./Components/Form/Form";
import User from "./Components/User/User";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/userDetails" element={<User/>}/>
      </Routes>
  
    </div>
  );
}

export default App;
