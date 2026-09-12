import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Overview from "./pages/Overview";
import Conversations from "./pages/Conversations";
import Analytics from "./pages/Analytics";
import Agents from "./pages/Agents";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
