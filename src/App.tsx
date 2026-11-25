import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from 'axios'; // ✅ add this

// --- Page Imports ---
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Vehicles from "./pages/Vehicles";
import NotFound from "./pages/NotFound";
import TC from "./pages/Terms&Condition";
import Desclaimer from "./pages/Desclaimer";
import PP from "./pages/PrivacyPolicy";
import Career from "@/pages/career";
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import DatabaseForm from "./pages/admin/DatabaseForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/InvestorWebsite/pages/Home";
import ContactForm from "@/components/ui/contact";
import FleetOperations from "@/pages/FleetOperations"

// ✅ Restore token on every page load/refresh
const savedToken = localStorage.getItem('admin_token');
if (savedToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}

const App = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Helmet>
                    <title>EV Fleet Solutions for Businesses in India | Invest with SpeedForce EV</title>
                    <meta
                        name="description"
                        content="End-to-end EV fleet solutions for businesses in India. SpeedForce EV offers electric vehicle leasing, fleet management, and investment opportunities with full operational support."
                    />
                </Helmet>

                <Routes>
                    {/* Main Landing Page */}
                    <Route path="/" element={<Index />} />

                    {/* Core Content Pages */}
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactForm />} />

                    {/* Vehicle Routes */}
                    <Route path="/vehicles" element={<Vehicles />} />

                    {/* Fleet & Investment */}
                    <Route path="/fleet-investment" element={<Home />} />

                    {/* Fleet Operations */}
                    <Route path="/fleet-operations" element={<FleetOperations />} />

                    {/* Legal & Utility */}
                    <Route path="/TC" element={<TC />} />
                    <Route path="/disclaimer" element={<Desclaimer />} />
                    <Route path="/PP" element={<PP />} />

                    {/* Career */}
                    <Route path="/career" element={<Career />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin/database-form" element={
                        <ProtectedRoute>
                            <DatabaseForm />
                        </ProtectedRoute>
                    } />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default App;