import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import MainLayout from "./MainLayout";
import Introduction from "./Introduction";
import AttackTargets from "./AttackTargets";
import PhishingAttacks from "./PhishingAttacks";
import MalwareInfection from "./MalwareInfection";
import CodeInjection from "./CodeInjection";
import IotAttack from "./IotAttack";
import LoginPageDesktop from "./pages/Desktop/LoginPageDesktop";
import SignUpDesktop from "./pages/Desktop/SignUpDesktop";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import Login from "./Login";
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          {/* Public Authentication routes - accessible only when NOT logged in */}
          <Route path="/login" element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } />
          <Route path="/signup" element={
            <AuthRoute>
              <SignUpDesktop />
            </AuthRoute>
          } />
          
          {/* Protected layout routes */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Homepage />} />
          </Route>
          
          {/* Protected main layout routes */}
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/introduction-cybersecurity" element={<Introduction />} />
            <Route path="/attack-targets-cybersecurity" element={<AttackTargets />} />
            <Route path="/phishing-attacks-cybersecurity" element={<PhishingAttacks />} />
            <Route path="/malware-infections-cybersecurity" element={<MalwareInfection />} />
            <Route path="/code-injection-cybersecurity" element={<CodeInjection />} />
            <Route path="/iot-attacks-cybersecurity" element={<IotAttack />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;