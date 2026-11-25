import React, { useState } from "react";
import { ChevronRight, CheckCircle2, Lock, Building2 } from "lucide-react";

interface FormData {
  name: string;
  pan: string;
  aadhaar: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  submission_date: string;
  invoice_number: string;
}

interface FormErrors {
  [key: string]: string;
}

const SubmissionForm: React.FC = () => {
  const API_BASE = "http://127.0.0.1:8000/api";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    name: "",
    pan: "",
    aadhaar: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    submission_date: "",
    invoice_number: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email === 'admin@gmail.com' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Submission saved successfully!");
        setFormData({
          name: "",
          pan: "",
          aadhaar: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          submission_date: "",
          invoice_number: "",
        });
        setErrors({});
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'errors' in error) {
        const errorObj = error as Error & { errors: FormErrors };
        setErrors(errorObj.errors);
      } else if (error instanceof Error) {
        alert(error.message || "Error submitting form");
      } else {
        alert("Error submitting form");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
        <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <Lock className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Admin Access</h2>
          </div>
          <div className="space-y-4" onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="john@gmail.com" 
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
              onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
            />
            <input 
              type="password" 
              placeholder="........" 
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
              onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
            />
            {loginError && <p className="text-red-500 text-xs font-bold text-center">{loginError}</p>}
            <button onClick={handleLogin} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-10 py-6 border-b border-slate-50 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <h1 className="text-lg font-black text-slate-900">Investor Portal</h1>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="text-slate-400 hover:text-red-500 font-bold text-[10px] tracking-widest uppercase"
          >
            Logout
          </button>
        </div>

        {successMessage && (
          <div className="mx-8 mt-8 lg:mx-12 lg:mt-12 mb-6 rounded-2xl border-2 border-green-200 bg-green-50 px-6 py-4 text-green-700 font-semibold">
            {successMessage}
          </div>
        )}
        
        <div className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Section */}
            <div className="space-y-6">
              <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">KYC Documents</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Full Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Legal Name"
                    className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none font-semibold transition-all"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500 ml-1">{errors.name}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">PAN (ABCDE1234F)</label>
                    <input
                      name="pan"
                      maxLength={10}
                      type="text"
                      value={formData.pan}
                      onChange={handleChange}
                      className={`w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 outline-none font-semibold transition-all ${
                        formData.pan && formData.pan.length === 10 ? 'border-green-500' : 'border-transparent focus:border-indigo-500'
                      }`}
                    />
                    {formData.pan && formData.pan.length === 10 && (
                      <CheckCircle2 size={16} className="absolute right-4 top-10 text-green-500" />
                    )}
                    {errors.pan && <p className="mt-1 text-xs text-red-500 ml-1">{errors.pan}</p>}
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Or provide</span>
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Aadhaar (12 Digits)</label>
                    <input
                      name="aadhaar"
                      maxLength={12}
                      type="text"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      className={`w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 outline-none font-semibold transition-all ${
                        formData.aadhaar && formData.aadhaar.length === 12 ? 'border-green-500' : 'border-transparent focus:border-indigo-500'
                      }`}
                    />
                    {formData.aadhaar && formData.aadhaar.length === 12 && (
                      <CheckCircle2 size={16} className="absolute right-4 top-10 text-green-500" />
                    )}
                    {errors.aadhaar && <p className="mt-1 text-xs text-red-500 ml-1">{errors.aadhaar}</p>}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div className="space-y-6 lg:border-l lg:border-slate-100 lg:pl-12">
              <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Additional Details</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none outline-none font-semibold"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 ml-1">{errors.email}</p>}
                <input
                  name="phone"
                  type="tel"
                  maxLength={10}
                  placeholder="Mobile"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none outline-none font-semibold"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500 ml-1">{errors.phone}</p>}
                {/* Date and Invoice Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Reg. Date</label>
                    <input
                      name="submission_date"
                      type="date"
                      value={formData.submission_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none outline-none font-semibold text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Invoice #</label>
                    <input
                      name="invoice_number"
                      type="text"
                      placeholder="INV-001"
                      value={formData.invoice_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none outline-none font-semibold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none outline-none font-semibold"
                  />
                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-none outline-none font-semibold"
                  />
                </div>
              </div>

              <div className={`mt-8 p-8 rounded-[2rem] transition-all duration-500 ${
                !isSubmitting ? 'bg-indigo-600 shadow-xs shadow-indigo-100' : 'bg-slate-50 border border-dashed '
              }`}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                    !isSubmitting ? 'bg-white text-indigo-600 hover:scale-[1.02] shadow-xs' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Onboarding'} <ChevronRight size={18}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;