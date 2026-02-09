import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Portfolio from "./pages/Landing.jsx";
import Loader from "./components/Loader.jsx";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
      <BrowserRouter>
        {showLoader && <Loader onFinish={() => setShowLoader(false)} />}
        <Routes>
          <Route path="/" element={<Portfolio LoaderDone={!showLoader} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
