import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Portfolio from "./pages/Landing.jsx";
import Intro from "./components/Intro.jsx";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
      <BrowserRouter>
        {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
        <Routes>
          <Route path="/" element={<Portfolio introDone={!showIntro} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
