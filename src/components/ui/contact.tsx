// // import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// // import { Send, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
// // import { toast } from "sonner";
// // import { useNavigate } from 'react-router-dom';
// // import { State, City, IState, ICity } from 'country-state-city';
// // import emailjs from '@emailjs/browser';
// // import { OtpVerification } from "@/pages/InvestorWebsite/components/contact/OTP";

// // const API_BASE_URL = "https://speedforceev.in/api/v1";

// // // ✅ EmailJS config — fill these in with your Service ID, Template ID and Public Key
// // // from https://dashboard.emailjs.com/admin
// // const EMAILJS_SERVICE_ID = "service_6k06y1j";
// // const EMAILJS_TEMPLATE_ID = "template_eu38m2e";
// // const EMAILJS_PUBLIC_KEY = "weK32YcmGsZZhdIwx";

// // interface FleetFormData {
// //     name: string;
// //     isFleetOwner: string;
// //     companyName: string;
// //     email: string;
// //     phone: string;
// //     state: string;
// //     city: string;
// //     customCity: string;
// //     vehicleCategory: string;
// //     fleetSize: string;
// // }

// // type Step = "form" | "otp" | "success";

// // const ContactForm: React.FC = () => {
// //     const navigate = useNavigate();
// //     const countryCode = 'IN';

// //     const initialState: FleetFormData = {
// //         name: '',
// //         isFleetOwner: '',
// //         companyName: '',
// //         email: '',
// //         phone: '',
// //         state: '',
// //         city: '',
// //         customCity: '',
// //         vehicleCategory: '',
// //         fleetSize: '1 - 10 Vehicles',
// //     };

// //     const [formData, setFormData] = useState<FleetFormData>(initialState);
// //     const [states, setStates] = useState<IState[]>([]);
// //     const [cities, setCities] = useState<ICity[]>([]);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [step, setStep] = useState<Step>("form");
// //     const [otpValue, setOtpValue] = useState("");
// //     const [otpError, setOtpError] = useState("");

// //     const vehicleCategories = ["HIGH SPEED", "LOW SPEED", "L5 CARGO", "L5 PASSENGER"];

// //     useEffect(() => {
// //         setStates(State.getStatesOfCountry(countryCode));
// //     }, []);

// //     useEffect(() => {
// //         if (formData.state) {
// //             setCities(City.getCitiesOfState(countryCode, formData.state));
// //         } else {
// //             setCities([]);
// //         }
// //     }, [formData.state]);

// //     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => {
// //             const next = { ...prev, [name]: value };
// //             if (name === 'state') { next.city = ''; next.customCity = ''; }
// //             if (name === 'city' && value !== 'OTHER') { next.customCity = ''; }
// //             return next;
// //         });
// //     };

// //     const handleCheckboxChange = (value: string) => {
// //         setFormData(prev => ({ ...prev, isFleetOwner: value }));
// //     };

// //     // ✅ Normalize phone — always clean 10 digits, no prefix here
// //     const cleanPhone = () => formData.phone.replace(/\D/g, "").slice(-10);

// //     // ✅ Resolve the human-readable state name and final city (handles the "Other" case)
// //     const resolveStateName = () => states.find(s => s.isoCode === formData.state)?.name || formData.state;
// //     const resolveCity = () => formData.city === 'OTHER' ? formData.customCity : formData.city;

// //     const handleSubmit = async (e: FormEvent) => {
// //         e.preventDefault();

// //         if (!formData.isFleetOwner) {
// //             toast.error("Please select if you are a fleet owner.");
// //             return;
// //         }

// //         // ✅ Validate phone is 10 digits
// //         if (cleanPhone().length !== 10) {
// //             toast.error("Please enter a valid 10-digit mobile number.");
// //             return;
// //         }

// //         setIsSubmitting(true);

// //         try {
// //             const stateName = resolveStateName();

// //             const response = await fetch(`${API_BASE_URL}/fleet-inquiry`, {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                     "Accept": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                     name: formData.name,
// //                     isFleetOwner: formData.isFleetOwner,
// //                     companyName: formData.companyName || null,
// //                     email: formData.email,
// //                     phone: cleanPhone(),           // ✅ Send clean 10 digits, backend adds +91
// //                     state: stateName,
// //                     city: formData.city || null,
// //                     customCity: formData.city === 'OTHER' ? formData.customCity : null,
// //                     vehicleCategory: formData.vehicleCategory,
// //                     vehicleModel: null,
// //                     fleetSize: formData.fleetSize,
// //                 }),
// //             });

// //             if (!response.ok) {
// //                 const err = await response.json();
// //                 // ✅ Show validation errors if present
// //                 if (err.errors) {
// //                     const firstError = Object.values(err.errors)[0] as string[];
// //                     throw new Error(firstError[0]);
// //                 }
// //                 throw new Error(err.msg || "Failed to send OTP.");
// //             }

// //             setStep("otp");
// //             toast.success("OTP sent to your mobile number!");

// //         } catch (error: any) {
// //             toast.error(error.message || "Submission failed. Please try again.");
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     const handleVerifyOtp = async () => {
// //         if (!otpValue || otpValue.length !== 6) {
// //             setOtpError("Please enter a valid 6-digit OTP.");
// //             return;
// //         }

// //         setIsSubmitting(true);
// //         setOtpError("");

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/verify-fleet-otp`, {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                     "Accept": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                     phone: cleanPhone(),           // ✅ Send clean 10 digits, backend adds +91
// //                     otp: otpValue,
// //                 }),
// //             });

// //             if (!response.ok) {
// //                 const err = await response.json();
// //                 throw new Error(err.msg || "Invalid OTP.");
// //             }

// //             // ✅ OTP verified — fire an EmailJS notification with the lead details.
// //             // Wrapped in its own try/catch so an EmailJS hiccup never blocks the
// //             // success screen (the backend has already recorded the verified lead).
// //             try {
// //                 await emailjs.send(
// //                     EMAILJS_SERVICE_ID,
// //                     EMAILJS_TEMPLATE_ID,
// //                     {
// //                         name: formData.name,
// //                         is_fleet_owner: formData.isFleetOwner,
// //                         company_name: formData.companyName || "N/A",
// //                         email: formData.email,
// //                         phone: `+91 ${cleanPhone()}`,
// //                         state: resolveStateName(),
// //                         city: resolveCity(),
// //                         vehicle_category: formData.vehicleCategory,
// //                         fleet_size: formData.fleetSize,
// //                     },
// //                     EMAILJS_PUBLIC_KEY
// //                 );
// //             } catch (emailError) {
// //                 console.error("EmailJS notification failed:", emailError);
// //             }

// //             setStep("success");

// //             setTimeout(() => {
// //                 setFormData(initialState);
// //                 setStep("form");
// //                 setOtpValue("");
// //                 setOtpError("");
// //             }, 4000);

// //         } catch (error: any) {
// //             setOtpError(error.message || "Invalid OTP. Please try again.");
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
// //             <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

// //                 {/* Left Sidebar */}
// //                 <div className="md:w-[35%] bg-[#64748b] p-10 text-white flex flex-col justify-between relative">
// //                     <div>
// //                         <button
// //                             onClick={() => navigate(-1)}
// //                             className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white transition-all group"
// //                         >
// //                             <div className="p-2 rounded-full border border-white/20 group-hover:bg-white/10">
// //                                 <ArrowLeft size={20} />
// //                             </div>
// //                             <span className="text-sm font-medium">Back</span>
// //                         </button>

// //                         <img
// //                             src="/images/EV LOGO.png"
// //                             alt="SpeedForce EV"
// //                             className="h-12 w-auto bg-white rounded-full px-1 py-1 mb-4"
// //                         />
// //                         <p className="text-white text-sm mb-10 opacity-90">
// //                             Institutional EV Fleet Operations across India.
// //                         </p>

// //                         <div className="space-y-8">
// //                             <div>
// //                                 <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Support Email</p>
// //                                 <a href="mailto:support@speedforceev.in" className="text-base font-bold text-white hover:underline">
// //                                     support@speedforceev.in
// //                                 </a>
// //                             </div>
// //                             <div>
// //                                 <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Direct Line</p>
// //                                 <a href="tel:+918866812888" className="text-base font-bold text-white hover:underline">
// //                                     +91 88668 12888
// //                                 </a>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className="pt-6 border-t border-white/20 flex items-center space-x-2 text-white/60">
// //                         <ShieldCheck size={14} />
// //                         <span className="text-[9px] uppercase tracking-widest">Verified Fleet Partner</span>
// //                     </div>
// //                 </div>

// //                 {/* Right Area */}
// //                 <div className="md:w-[65%] p-8 md:p-12 bg-white flex flex-col justify-center">

// //                     {/* FORM STEP */}
// //                     {step === "form" && (
// //                         <>
// //                             <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Inquiry Form</h3>
// //                             <form onSubmit={handleSubmit} className="space-y-5">
// //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

// //                                     <div className="md:col-span-2">
// //                                         <input
// //                                             name="name" required className="form-input"
// //                                             placeholder="Full Name" value={formData.name}
// //                                             onChange={handleChange}
// //                                         />
// //                                     </div>

// //                                     <input
// //                                         name="email" type="email" required className="form-input"
// //                                         placeholder="Official Email" value={formData.email}
// //                                         onChange={handleChange}
// //                                     />

// //                                     {/* ✅ Phone — 10 digits only, no +91 prefix needed from user */}
// //                                     <input
// //                                         name="phone" type="tel" required className="form-input"
// //                                         placeholder="10-digit Mobile Number"
// //                                         value={formData.phone}
// //                                         onChange={(e) => {
// //                                             const val = e.target.value.replace(/\D/g, "").slice(0, 10);
// //                                             setFormData(prev => ({ ...prev, phone: val }));
// //                                         }}
// //                                         maxLength={10}
// //                                     />

// //                                     <div className="md:col-span-2 bg-slate-50 px-6 py-4 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
// //                                         <label className="text-[10px] font-black text-slate-500 uppercase block mb-2 tracking-wider">
// //                                             Are you a fleet owner?
// //                                         </label>
// //                                         <div className="flex items-center space-x-12">
// //                                             {['Yes', 'No'].map(val => (
// //                                                 <label key={val} className="flex items-center space-x-3 cursor-pointer">
// //                                                     <input
// //                                                         type="checkbox"
// //                                                         className="w-5 h-5 accent-[#22C55E]"
// //                                                         checked={formData.isFleetOwner === val}
// //                                                         onChange={() => handleCheckboxChange(val)}
// //                                                     />
// //                                                     <span className="text-sm font-bold text-slate-700">{val}</span>
// //                                                 </label>
// //                                             ))}
// //                                         </div>
// //                                     </div>

// //                                     <div className="md:col-span-2">
// //                                         <input
// //                                             name="companyName" className="form-input"
// //                                             placeholder="Company Name (optional)"
// //                                             value={formData.companyName} onChange={handleChange}
// //                                         />
// //                                     </div>

// //                                     <div className="space-y-1">
// //                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">State</label>
// //                                         <select name="state" required className="form-input bg-white"
// //                                             value={formData.state} onChange={handleChange}>
// //                                             <option value="">Select State</option>
// //                                             {states.map(s => (
// //                                                 <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
// //                                             ))}
// //                                         </select>
// //                                     </div>

// //                                     <div className="space-y-1">
// //                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">City</label>
// //                                         <select name="city" required className="form-input bg-white"
// //                                             value={formData.city} onChange={handleChange}
// //                                             disabled={!formData.state}>
// //                                             <option value="">Select City</option>
// //                                             {cities.map(c => (
// //                                                 <option key={`${c.name}-${c.latitude}`} value={c.name}>{c.name}</option>
// //                                             ))}
// //                                             <option value="OTHER">Other / Not Listed</option>
// //                                         </select>
// //                                     </div>

// //                                     {formData.city === 'OTHER' && (
// //                                         <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
// //                                             <input
// //                                                 name="customCity" required
// //                                                 className="form-input border-green-200 bg-green-50/30"
// //                                                 placeholder="Type your City/Town name"
// //                                                 value={formData.customCity} onChange={handleChange}
// //                                             />
// //                                         </div>
// //                                     )}

// //                                     <div className="space-y-1">
// //                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Vehicle Category</label>
// //                                         <select name="vehicleCategory" required className="form-input bg-white"
// //                                             value={formData.vehicleCategory} onChange={handleChange}>
// //                                             <option value="">Select Category</option>
// //                                             {vehicleCategories.map(cat => (
// //                                                 <option key={cat} value={cat}>{cat}</option>
// //                                             ))}
// //                                         </select>
// //                                     </div>

// //                                     <div className="space-y-1">
// //                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Fleet Size</label>
// //                                         <select name="fleetSize" className="form-input font-bold"
// //                                             value={formData.fleetSize} onChange={handleChange}>
// //                                             <option>1 - 10 Vehicles</option>
// //                                             <option>11 - 50 Vehicles</option>
// //                                             <option>50 + Vehicles</option>
// //                                         </select>
// //                                     </div>
// //                                 </div>

// //                                 <button
// //                                     type="submit" disabled={isSubmitting}
// //                                     className="w-full bg-[#22C55E] hover:bg-green-600 text-white font-black py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 mt-4"
// //                                 >
// //                                     {isSubmitting
// //                                         ? <><Loader2 size={16} className="animate-spin" /><span className="uppercase tracking-widest text-sm">Sending...</span></>
// //                                         : <><span className="uppercase tracking-widest text-sm">Send Info</span><Send size={16} /></>
// //                                     }
// //                                 </button>
// //                             </form>
// //                         </>
// //                     )}

// //                     {/* OTP STEP */}
// //                     {step === "otp" && (
// //                         <div className="w-full max-w-sm mx-auto">
// //                             <OtpVerification
// //                                 phone={`+91 ${cleanPhone()}`}
// //                                 value={otpValue}
// //                                 onChange={(val) => { setOtpValue(val); setOtpError(""); }}
// //                                 onSubmit={handleVerifyOtp}
// //                                 onResend={() => setStep("form")}
// //                                 loading={isSubmitting}
// //                                 error={otpError}
// //                             />
// //                         </div>
// //                     )}

// //                     {/* SUCCESS STEP */}
// //                     {step === "success" && (
// //                         <div className="text-center space-y-6 py-10">
// //                             <div className="flex justify-center">
// //                                 <CheckCircle2 size={70} className="text-[#22C55E]" />
// //                             </div>
// //                             <div>
// //                                 <h2 className="text-3xl font-extrabold text-slate-900">Thank You!</h2>
// //                                 <p className="text-slate-600 font-medium mt-2">We will contact you shortly.</p>
// //                             </div>
// //                             <div className="pt-6 w-32 mx-auto">
// //                                 <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
// //                                     <div className="h-full bg-[#22C55E] animate-[progress_4s_linear]" />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>

// //             <style>{`
// //                 .form-input {
// //                     width: 100%;
// //                     background: #f8fafc;
// //                     padding: 0.85rem 1.25rem;
// //                     border-radius: 0.75rem;
// //                     border: 1px solid #e2e8f0;
// //                     outline: none;
// //                     transition: all 0.2s;
// //                     font-size: 0.875rem;
// //                     height: 50px;
// //                 }
// //                 .form-input:focus {
// //                     border-color: #22C55E;
// //                     box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.05);
// //                 }
// //                 @keyframes progress { from { width: 0%; } to { width: 100%; } }
// //             `}</style>
// //         </div>
// //     );
// // };

// // export default ContactForm;


// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import { Send, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
// import { toast } from "sonner";
// import { useNavigate } from 'react-router-dom';
// import { State, City, IState, ICity } from 'country-state-city';
// import emailjs from '@emailjs/browser';
// import { OtpVerification } from "@/pages/InvestorWebsite/components/contact/OTP";

// const API_BASE_URL = "https://speedforceev.in/api/v1";

// // ✅ EmailJS config — fill these in with your Service ID, Template ID and Public Key
// // from https://dashboard.emailjs.com/admin
// const EMAILJS_SERVICE_ID = "service_6k06y1j";
// const EMAILJS_TEMPLATE_ID = "template_eu38m2e";
// const EMAILJS_PUBLIC_KEY = "weK32YcmGsZZhdIwx";

// interface FleetFormData {
//     name: string;
//     isFleetOwner: string;
//     companyName: string;
//     email: string;
//     phone: string;
//     state: string;
//     city: string;
//     customCity: string;
//     vehicleCategory: string;
//     fleetSize: string;
// }

// type Step = "form" | "otp" | "success";

// const ContactForm: React.FC = () => {
//     const navigate = useNavigate();
//     const countryCode = 'IN';

//     const initialState: FleetFormData = {
//         name: '',
//         isFleetOwner: '',
//         companyName: '',
//         email: '',
//         phone: '',
//         state: '',
//         city: '',
//         customCity: '',
//         vehicleCategory: '',
//         fleetSize: '1 - 10 Vehicles',
//     };

//     const [formData, setFormData] = useState<FleetFormData>(initialState);
//     const [states, setStates] = useState<IState[]>([]);
//     const [cities, setCities] = useState<ICity[]>([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [step, setStep] = useState<Step>("form");
//     const [otpValue, setOtpValue] = useState("");
//     const [otpError, setOtpError] = useState("");

//     const vehicleCategories = ["HIGH SPEED", "LOW SPEED", "L5 CARGO", "L5 PASSENGER"];

//     useEffect(() => {
//         setStates(State.getStatesOfCountry(countryCode));
//     }, []);

//     useEffect(() => {
//         if (formData.state) {
//             setCities(City.getCitiesOfState(countryCode, formData.state));
//         } else {
//             setCities([]);
//         }
//     }, [formData.state]);

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => {
//             const next = { ...prev, [name]: value };
//             if (name === 'state') { next.city = ''; next.customCity = ''; }
//             if (name === 'city' && value !== 'OTHER') { next.customCity = ''; }
//             return next;
//         });
//     };

//     const handleCheckboxChange = (value: string) => {
//         setFormData(prev => ({ ...prev, isFleetOwner: value }));
//     };

//     // ✅ Normalize phone — always clean 10 digits, no prefix here
//     const cleanPhone = () => formData.phone.replace(/\D/g, "").slice(-10);

//     // ✅ Resolve the human-readable state name and final city (handles the "Other" case)
//     const resolveStateName = () => states.find(s => s.isoCode === formData.state)?.name || formData.state;
//     const resolveCity = () => formData.city === 'OTHER' ? formData.customCity : formData.city;

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         if (!formData.isFleetOwner) {
//             toast.error("Please select if you are a fleet owner.");
//             return;
//         }

//         // ✅ Validate phone is 10 digits
//         if (cleanPhone().length !== 10) {
//             toast.error("Please enter a valid 10-digit mobile number.");
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const stateName = resolveStateName();

//             const response = await fetch(`${API_BASE_URL}/fleet-inquiry`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: formData.name,
//                     isFleetOwner: formData.isFleetOwner,
//                     companyName: formData.companyName || null,
//                     email: formData.email,
//                     phone: cleanPhone(),           // ✅ Send clean 10 digits, backend adds +91
//                     state: stateName,
//                     city: formData.city || null,
//                     customCity: formData.city === 'OTHER' ? formData.customCity : null,
//                     vehicleCategory: formData.vehicleCategory,
//                     vehicleModel: null,
//                     fleetSize: formData.fleetSize,
//                 }),
//             });

//             if (!response.ok) {
//                 const err = await response.json();
//                 // ✅ Show validation errors if present
//                 if (err.errors) {
//                     const firstError = Object.values(err.errors)[0] as string[];
//                     throw new Error(firstError[0]);
//                 }
//                 throw new Error(err.msg || "Failed to send OTP.");
//             }

//             setStep("otp");
//             toast.success("OTP sent to your mobile number!");

//         } catch (error: any) {
//             toast.error(error.message || "Submission failed. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleVerifyOtp = async () => {
//         if (!otpValue || otpValue.length !== 6) {
//             setOtpError("Please enter a valid 6-digit OTP.");
//             return;
//         }

//         setIsSubmitting(true);
//         setOtpError("");

//         try {
//             const response = await fetch(`${API_BASE_URL}/verify-fleet-otp`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//                 body: JSON.stringify({
//                     phone: cleanPhone(),           // ✅ Send clean 10 digits, backend adds +91
//                     otp: otpValue,
//                 }),
//             });

//             if (!response.ok) {
//                 const err = await response.json();
//                 throw new Error(err.msg || "Invalid OTP.");
//             }

//             // ✅ OTP verified — fire an EmailJS notification with the lead details.
//             // Wrapped in its own try/catch so an EmailJS hiccup never blocks the
//             // success screen (the backend has already recorded the verified lead).
//             try {
//                 await emailjs.send(
//                     EMAILJS_SERVICE_ID,
//                     EMAILJS_TEMPLATE_ID,
//                     {
//                         from_name: formData.name,
//                         is_fleet_owner: formData.isFleetOwner,
//                         company_name: formData.companyName || "N/A",
//                         from_email: formData.email,
//                         phone: `+91 ${cleanPhone()}`,
//                         state: resolveStateName(),
//                         city: resolveCity(),
//                         vehicle_category: formData.vehicleCategory,
//                         vehicle_model: "N/A",
//                         budget_slab: formData.fleetSize,
//                     },
//                     EMAILJS_PUBLIC_KEY
//                 );
//             } catch (emailError) {
//                 console.error("EmailJS notification failed:", emailError);
//             }

//             setStep("success");

//             setTimeout(() => {
//                 setFormData(initialState);
//                 setStep("form");
//                 setOtpValue("");
//                 setOtpError("");
//             }, 4000);

//         } catch (error: any) {
//             setOtpError(error.message || "Invalid OTP. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
//             <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

//                 {/* Left Sidebar */}
//                 <div className="md:w-[35%] bg-[#64748b] p-10 text-white flex flex-col justify-between relative">
//                     <div>
//                         <button
//                             onClick={() => navigate(-1)}
//                             className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white transition-all group"
//                         >
//                             <div className="p-2 rounded-full border border-white/20 group-hover:bg-white/10">
//                                 <ArrowLeft size={20} />
//                             </div>
//                             <span className="text-sm font-medium">Back</span>
//                         </button>

//                         <img
//                             src="/images/EV LOGO.png"
//                             alt="SpeedForce EV"
//                             className="h-12 w-auto bg-white rounded-full px-1 py-1 mb-4"
//                         />
//                         <p className="text-white text-sm mb-10 opacity-90">
//                             Institutional EV Fleet Operations across India.
//                         </p>

//                         <div className="space-y-8">
//                             <div>
//                                 <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Support Email</p>
//                                 <a href="mailto:support@speedforceev.in" className="text-base font-bold text-white hover:underline">
//                                     support@speedforceev.in
//                                 </a>
//                             </div>
//                             <div>
//                                 <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Direct Line</p>
//                                 <a href="tel:+918866812888" className="text-base font-bold text-white hover:underline">
//                                     +91 88668 12888
//                                 </a>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="pt-6 border-t border-white/20 flex items-center space-x-2 text-white/60">
//                         <ShieldCheck size={14} />
//                         <span className="text-[9px] uppercase tracking-widest">Verified Fleet Partner</span>
//                     </div>
//                 </div>

//                 {/* Right Area */}
//                 <div className="md:w-[65%] p-8 md:p-12 bg-white flex flex-col justify-center">

//                     {/* FORM STEP */}
//                     {step === "form" && (
//                         <>
//                             <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Inquiry Form</h3>
//                             <form onSubmit={handleSubmit} className="space-y-5">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                                     <div className="md:col-span-2">
//                                         <input
//                                             name="name" required className="form-input"
//                                             placeholder="Full Name" value={formData.name}
//                                             onChange={handleChange}
//                                         />
//                                     </div>

//                                     <input
//                                         name="email" type="email" required className="form-input"
//                                         placeholder="Official Email" value={formData.email}
//                                         onChange={handleChange}
//                                     />

//                                     {/* ✅ Phone — 10 digits only, no +91 prefix needed from user */}
//                                     <input
//                                         name="phone" type="tel" required className="form-input"
//                                         placeholder="10-digit Mobile Number"
//                                         value={formData.phone}
//                                         onChange={(e) => {
//                                             const val = e.target.value.replace(/\D/g, "").slice(0, 10);
//                                             setFormData(prev => ({ ...prev, phone: val }));
//                                         }}
//                                         maxLength={10}
//                                     />

//                                     <div className="md:col-span-2 bg-slate-50 px-6 py-4 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
//                                         <label className="text-[10px] font-black text-slate-500 uppercase block mb-2 tracking-wider">
//                                             Are you a fleet owner?
//                                         </label>
//                                         <div className="flex items-center space-x-12">
//                                             {['Yes', 'No'].map(val => (
//                                                 <label key={val} className="flex items-center space-x-3 cursor-pointer">
//                                                     <input
//                                                         type="checkbox"
//                                                         className="w-5 h-5 accent-[#22C55E]"
//                                                         checked={formData.isFleetOwner === val}
//                                                         onChange={() => handleCheckboxChange(val)}
//                                                     />
//                                                     <span className="text-sm font-bold text-slate-700">{val}</span>
//                                                 </label>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div className="md:col-span-2">
//                                         <input
//                                             name="companyName" className="form-input"
//                                             placeholder="Company Name (optional)"
//                                             value={formData.companyName} onChange={handleChange}
//                                         />
//                                     </div>

//                                     <div className="space-y-1">
//                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">State</label>
//                                         <select name="state" required className="form-input bg-white"
//                                             value={formData.state} onChange={handleChange}>
//                                             <option value="">Select State</option>
//                                             {states.map(s => (
//                                                 <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     <div className="space-y-1">
//                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">City</label>
//                                         <select name="city" required className="form-input bg-white"
//                                             value={formData.city} onChange={handleChange}
//                                             disabled={!formData.state}>
//                                             <option value="">Select City</option>
//                                             {cities.map(c => (
//                                                 <option key={`${c.name}-${c.latitude}`} value={c.name}>{c.name}</option>
//                                             ))}
//                                             <option value="OTHER">Other / Not Listed</option>
//                                         </select>
//                                     </div>

//                                     {formData.city === 'OTHER' && (
//                                         <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
//                                             <input
//                                                 name="customCity" required
//                                                 className="form-input border-green-200 bg-green-50/30"
//                                                 placeholder="Type your City/Town name"
//                                                 value={formData.customCity} onChange={handleChange}
//                                             />
//                                         </div>
//                                     )}

//                                     <div className="space-y-1">
//                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Vehicle Category</label>
//                                         <select name="vehicleCategory" required className="form-input bg-white"
//                                             value={formData.vehicleCategory} onChange={handleChange}>
//                                             <option value="">Select Category</option>
//                                             {vehicleCategories.map(cat => (
//                                                 <option key={cat} value={cat}>{cat}</option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     <div className="space-y-1">
//                                         <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Fleet Size</label>
//                                         <select name="fleetSize" className="form-input font-bold"
//                                             value={formData.fleetSize} onChange={handleChange}>
//                                             <option>1 - 10 Vehicles</option>
//                                             <option>11 - 50 Vehicles</option>
//                                             <option>50 + Vehicles</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <button
//                                     type="submit" disabled={isSubmitting}
//                                     className="w-full bg-[#22C55E] hover:bg-green-600 text-white font-black py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 mt-4"
//                                 >
//                                     {isSubmitting
//                                         ? <><Loader2 size={16} className="animate-spin" /><span className="uppercase tracking-widest text-sm">Sending...</span></>
//                                         : <><span className="uppercase tracking-widest text-sm">Send Info</span><Send size={16} /></>
//                                     }
//                                 </button>
//                             </form>
//                         </>
//                     )}

//                     {/* OTP STEP */}
//                     {step === "otp" && (
//                         <div className="w-full max-w-sm mx-auto">
//                             <OtpVerification
//                                 phone={`+91 ${cleanPhone()}`}
//                                 value={otpValue}
//                                 onChange={(val) => { setOtpValue(val); setOtpError(""); }}
//                                 onSubmit={handleVerifyOtp}
//                                 onResend={() => setStep("form")}
//                                 loading={isSubmitting}
//                                 error={otpError}
//                             />
//                         </div>
//                     )}

//                     {/* SUCCESS STEP */}
//                     {step === "success" && (
//                         <div className="text-center space-y-6 py-10">
//                             <div className="flex justify-center">
//                                 <CheckCircle2 size={70} className="text-[#22C55E]" />
//                             </div>
//                             <div>
//                                 <h2 className="text-3xl font-extrabold text-slate-900">Thank You!</h2>
//                                 <p className="text-slate-600 font-medium mt-2">We will contact you shortly.</p>
//                             </div>
//                             <div className="pt-6 w-32 mx-auto">
//                                 <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
//                                     <div className="h-full bg-[#22C55E] animate-[progress_4s_linear]" />
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <style>{`
//                 .form-input {
//                     width: 100%;
//                     background: #f8fafc;
//                     padding: 0.85rem 1.25rem;
//                     border-radius: 0.75rem;
//                     border: 1px solid #e2e8f0;
//                     outline: none;
//                     transition: all 0.2s;
//                     font-size: 0.875rem;
//                     height: 50px;
//                 }
//                 .form-input:focus {
//                     border-color: #22C55E;
//                     box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.05);
//                 }
//                 @keyframes progress { from { width: 0%; } to { width: 100%; } }
//             `}</style>
//         </div>
//     );
// };

// export default ContactForm;




import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Send, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { State, City, IState, ICity } from 'country-state-city';
import emailjs from '@emailjs/browser';

const API_BASE_URL = "https://speedforceev.in/api/v1";

// ✅ EmailJS config — fill these in with your Service ID, Template ID and Public Key
// from https://dashboard.emailjs.com/admin
const EMAILJS_SERVICE_ID = "service_6k06y1j";
const EMAILJS_TEMPLATE_ID = "template_eu38m2e";
const EMAILJS_PUBLIC_KEY = "weK32YcmGsZZhdIwx";

interface FleetFormData {
    name: string;
    isFleetOwner: string;
    companyName: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    customCity: string;
    vehicleCategory: string;
    fleetSize: string;
}

const ContactForm: React.FC = () => {
    const navigate = useNavigate();
    const countryCode = 'IN';

    const initialState: FleetFormData = {
        name: '',
        isFleetOwner: '',
        companyName: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        customCity: '',
        vehicleCategory: '',
        fleetSize: '1 - 10 Vehicles',
    };

    const [formData, setFormData] = useState<FleetFormData>(initialState);
    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const vehicleCategories = ["HIGH SPEED", "LOW SPEED", "L5 CARGO", "L5 PASSENGER"];

    useEffect(() => {
        setStates(State.getStatesOfCountry(countryCode));
    }, []);

    useEffect(() => {
        if (formData.state) {
            setCities(City.getCitiesOfState(countryCode, formData.state));
        } else {
            setCities([]);
        }
    }, [formData.state]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const next = { ...prev, [name]: value };
            if (name === 'state') { next.city = ''; next.customCity = ''; }
            if (name === 'city' && value !== 'OTHER') { next.customCity = ''; }
            return next;
        });
    };

    const handleCheckboxChange = (value: string) => {
        setFormData(prev => ({ ...prev, isFleetOwner: value }));
    };

    // ✅ Normalize phone — always clean 10 digits, no prefix here
    const cleanPhone = () => formData.phone.replace(/\D/g, "").slice(-10);

    // ✅ Resolve the human-readable state name and final city (handles the "Other" case)
    const resolveStateName = () => states.find(s => s.isoCode === formData.state)?.name || formData.state;
    const resolveCity = () => formData.city === 'OTHER' ? formData.customCity : formData.city;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.isFleetOwner) {
            toast.error("Please select if you are a fleet owner.");
            return;
        }

        if (cleanPhone().length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/fleet-inquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    isFleetOwner: formData.isFleetOwner,
                    companyName: formData.companyName || null,
                    email: formData.email,
                    phone: cleanPhone(),
                    state: resolveStateName(),
                    city: formData.city || null,
                    customCity: formData.city === "OTHER" ? formData.customCity : null,
                    vehicleCategory: formData.vehicleCategory,
                    vehicleModel: null,
                    fleetSize: formData.fleetSize,
                }),
            });

            let result: any = {};
            try {
                result = await response.json();
            } catch {
                // Some APIs return an empty response body on success.
            }

            if (!response.ok) {
                if (result.errors) {
                    const firstError = Object.values(result.errors)[0] as string[];
                    throw new Error(firstError?.[0] || "Please check the form fields.");
                }
                throw new Error(result.msg || result.message || "Failed to submit inquiry.");
            }

            // Notify by email immediately after the API accepts the inquiry.
            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        from_name: formData.name,
                        is_fleet_owner: formData.isFleetOwner,
                        company_name: formData.companyName || "N/A",
                        from_email: formData.email,
                        phone: `+91 ${cleanPhone()}`,
                        state: resolveStateName(),
                        city: resolveCity(),
                        vehicle_category: formData.vehicleCategory,
                        vehicle_model: "N/A",
                        budget_slab: formData.fleetSize,
                    },
                    EMAILJS_PUBLIC_KEY
                );
            } catch (emailError) {
                console.error("EmailJS notification failed:", emailError);
                toast.error("Inquiry submitted, but the email notification could not be sent.");
            }

            setSubmitted(true);
            toast.success("Inquiry submitted successfully.");

            setTimeout(() => {
                setFormData(initialState);
                setSubmitted(false);
            }, 4000);
        } catch (error: any) {
            toast.error(error.message || "Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

                {/* Left Sidebar */}
                <div className="md:w-[35%] bg-[#64748b] p-10 text-white flex flex-col justify-between relative">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white transition-all group"
                        >
                            <div className="p-2 rounded-full border border-white/20 group-hover:bg-white/10">
                                <ArrowLeft size={20} />
                            </div>
                            <span className="text-sm font-medium">Back</span>
                        </button>

                        <img
                            src="/images/EV LOGO.png"
                            alt="SpeedForce EV"
                            className="h-12 w-auto bg-white rounded-full px-1 py-1 mb-4"
                        />
                        <p className="text-white text-sm mb-10 opacity-90">
                            Institutional EV Fleet Operations across India.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Support Email</p>
                                <a href="mailto:support@speedforceev.in" className="text-base font-bold text-white hover:underline">
                                    support@speedforceev.in
                                </a>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Direct Line</p>
                                <a href="tel:+918866812888" className="text-base font-bold text-white hover:underline">
                                    +91 88668 12888
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/20 flex items-center space-x-2 text-white/60">
                        <ShieldCheck size={14} />
                        <span className="text-[9px] uppercase tracking-widest">Verified Fleet Partner</span>
                    </div>
                </div>

                {/* Right Area */}
                <div className="md:w-[65%] p-8 md:p-12 bg-white flex flex-col justify-center">

                    {/* FORM STEP */}
                    {!submitted && (
                        <>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Inquiry Form</h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <div className="md:col-span-2">
                                        <input
                                            name="name" required className="form-input"
                                            placeholder="Full Name" value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <input
                                        name="email" type="email" required className="form-input"
                                        placeholder="Official Email" value={formData.email}
                                        onChange={handleChange}
                                    />

                                    {/* ✅ Phone — 10 digits only, no +91 prefix needed from user */}
                                    <input
                                        name="phone" type="tel" required className="form-input"
                                        placeholder="10-digit Mobile Number"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                            setFormData(prev => ({ ...prev, phone: val }));
                                        }}
                                        maxLength={10}
                                    />

                                    <div className="md:col-span-2 bg-slate-50 px-6 py-4 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
                                        <label className="text-[10px] font-black text-slate-500 uppercase block mb-2 tracking-wider">
                                            Are you a fleet owner?
                                        </label>
                                        <div className="flex items-center space-x-12">
                                            {['Yes', 'No'].map(val => (
                                                <label key={val} className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 accent-[#22C55E]"
                                                        checked={formData.isFleetOwner === val}
                                                        onChange={() => handleCheckboxChange(val)}
                                                    />
                                                    <span className="text-sm font-bold text-slate-700">{val}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <input
                                            name="companyName" className="form-input"
                                            placeholder="Company Name (optional)"
                                            value={formData.companyName} onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">State</label>
                                        <select name="state" required className="form-input bg-white"
                                            value={formData.state} onChange={handleChange}>
                                            <option value="">Select State</option>
                                            {states.map(s => (
                                                <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">City</label>
                                        <select name="city" required className="form-input bg-white"
                                            value={formData.city} onChange={handleChange}
                                            disabled={!formData.state}>
                                            <option value="">Select City</option>
                                            {cities.map(c => (
                                                <option key={`${c.name}-${c.latitude}`} value={c.name}>{c.name}</option>
                                            ))}
                                            <option value="OTHER">Other / Not Listed</option>
                                        </select>
                                    </div>

                                    {formData.city === 'OTHER' && (
                                        <div className="md:col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <input
                                                name="customCity" required
                                                className="form-input border-green-200 bg-green-50/30"
                                                placeholder="Type your City/Town name"
                                                value={formData.customCity} onChange={handleChange}
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Vehicle Category</label>
                                        <select name="vehicleCategory" required className="form-input bg-white"
                                            value={formData.vehicleCategory} onChange={handleChange}>
                                            <option value="">Select Category</option>
                                            {vehicleCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Fleet Size</label>
                                        <select name="fleetSize" className="form-input font-bold"
                                            value={formData.fleetSize} onChange={handleChange}>
                                            <option>1 - 10 Vehicles</option>
                                            <option>11 - 50 Vehicles</option>
                                            <option>50 + Vehicles</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="w-full bg-[#22C55E] hover:bg-green-600 text-white font-black py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 mt-4"
                                >
                                    {isSubmitting
                                        ? <><Loader2 size={16} className="animate-spin" /><span className="uppercase tracking-widest text-sm">Sending...</span></>
                                        : <><span className="uppercase tracking-widest text-sm">Send Info</span><Send size={16} /></>
                                    }
                                </button>
                            </form>
                        </>
                    )}
                    {/* SUCCESS STEP */}
                    {submitted && (
                        <div className="text-center space-y-6 py-10">
                            <div className="flex justify-center">
                                <CheckCircle2 size={70} className="text-[#22C55E]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold text-slate-900">Thank You!</h2>
                                <p className="text-slate-600 font-medium mt-2">We will contact you shortly.</p>
                            </div>
                            <div className="pt-6 w-32 mx-auto">
                                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#22C55E] animate-[progress_4s_linear]" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .form-input {
                    width: 100%;
                    background: #f8fafc;
                    padding: 0.85rem 1.25rem;
                    border-radius: 0.75rem;
                    border: 1px solid #e2e8f0;
                    outline: none;
                    transition: all 0.2s;
                    font-size: 0.875rem;
                    height: 50px;
                }
                .form-input:focus {
                    border-color: #22C55E;
                    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.05);
                }
                @keyframes progress { from { width: 0%; } to { width: 100%; } }
            `}</style>
        </div>
    );
};

export default ContactForm;

