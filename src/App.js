import Vehicle from "./components/vehicle";
import VehicleDetails from "./components/vehicleDetails";

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vehicle/>}/>
          <Route path="/details" element={<VehicleDetails/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Vehicle/>
      <VehicleDetails/> */}
    </div>
  );
}

export default App;
