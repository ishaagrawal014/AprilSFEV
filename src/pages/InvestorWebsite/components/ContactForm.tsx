// import { useState, useMemo } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { track } from "@/pages/InvestorWebsite/lib/api";
// import ThankYou from "@/pages/InvestorWebsite/pages/ThankYou";
// import { LeadForm, type LeadFormValues as BaseLeadFormValues } from "@/pages/InvestorWebsite/components/contact/Form";
// import { OtpVerification } from "@/pages/InvestorWebsite/components/contact/OTP";
// import statesData from "@/pages/InvestorWebsite/data/state-city.json"; // <- Your JSON file

// // Extended interface with city and state
// interface LeadFormValues extends BaseLeadFormValues {
//   city: string;
//   state: string;
// }

// type Step = "form" | "otp" | "success";

// const initialValues: LeadFormValues = {
//   name: "",
//   phone: "",
//   email: "",
//   investmentSlab: "",
//   city: "",
//   state: "",
// };

// const API_BASE_URL = "https://www.speedforceev.in/api/v1";

// export default function ContactForm() {
//   const { toast } = useToast();

//   // Form State
//   const [step, setStep] = useState<Step>("form");
//   const [formValues, setFormValues] = useState<LeadFormValues>(initialValues);
//   const [formError, setFormError] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [otpValue, setOtpValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [phoneForOtp, setPhoneForOtp] = useState("");
//   const [cities, setCities] = useState<string[]>([]);

//   // Helper functions
//   const cleanPhone = (v: string) => v.replace(/\D/g, "").slice(-10);

//   const validatePhone = (phone: string): boolean => {
//     const cleaned = cleanPhone(phone);
//     return cleaned.length === 10 && /^[6-9]/.test(cleaned);
//   };

//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validateForm = (v: LeadFormValues): string => {
//     if (!v.name.trim()) return "Please enter your name";
//     if (!v.phone) return "Phone number is required";
//     if (!validatePhone(v.phone)) {
//       return "Please enter a valid 10-digit Indian mobile number (starting with 6-9)";
//     }
//     if (!v.email) return "Email is required";
//     if (!validateEmail(v.email)) return "Please enter a valid email address";
//     if (!v.investmentSlab) return "Please select an investment amount";
//     return "";
//   };

//   const formatDisplayPhone = (phone: string) => {
//     const cleaned = cleanPhone(phone);
//     return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
//   };

//   const sanitizedPhone = useMemo(
//     () => cleanPhone(formValues.phone),
//     [formValues.phone]
//   );

//   const displayPhone = phoneForOtp
//     ? formatDisplayPhone(phoneForOtp)
//     : sanitizedPhone
//     ? `+91 ${sanitizedPhone.slice(0, 5)} ${sanitizedPhone.slice(5)}`
//     : "+91";

//   // Handle field changes
//   const handleFieldChange = (field: keyof LeadFormValues, value: string) => {
//     setFormValues((prev) => ({ ...prev, [field]: value }));
//     if (formError) setFormError("");
//   };

//   const handlePhoneChange = (value: string) => {
//     const digits = value.replace(/\D/g, "");
//     const limited = digits.slice(0, 10);
//     handleFieldChange("phone", limited);
//   };

//   // State & City handlers
//   const handleStateChange = (value: string) => {
//     handleFieldChange("state", value);
//     handleFieldChange("city", "");
//     setCities(statesData[value] || []);
//   };

//   const handleCityChange = (value: string) => {
//     handleFieldChange("city", value);
//   };

//   // Handle form submission - Send OTP
//   const handleFormSubmit = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();
//     if (loading) return;

//     const validationMessage = validateForm(formValues);
//     if (validationMessage) {
//       setFormError(validationMessage);
//       return;
//     }

//     setFormError("");
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/mail`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formValues.name,
//           email: formValues.email,
//           phone: `+91${sanitizedPhone}`,
//           money_slab: formValues.investmentSlab,
//           city: formValues.city,
//           state: formValues.state,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setFormError(data.msg || "Failed to send OTP. Please try again.");
//         return;
//       }

//       setPhoneForOtp(`+91${sanitizedPhone}`);
//       setStep("otp");
//       toast({ title: "OTP Sent", description: `Sent to ${displayPhone}` });
//     } catch (error) {
//       console.error("OTP Error:", error);
//       setFormError("Unable to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = async () => {
//     if (loading || otpValue.length !== 6) return;
//     setLoading(true);
//     setOtpError("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/verifyotp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: phoneForOtp,
//           otp: otpValue,
//           type: "mail", // ✅ required by VerifyOTPRequest
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setOtpError(data.msg || "Invalid verification code. Please try again.");
//         return;
//       }

//       track("otp_verified", {
//         slab: formValues.investmentSlab,
//         state: formValues.state,
//         city: formValues.city,
//       });

//       setStep("success");
//       toast({
//         title: "Verification Successful!",
//         description: "Thank you! We'll contact you soon.",
//       });
//     } catch (error) {
//       console.error("Verification Error:", error);
//       setOtpError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show thank you page on success
//   if (step === "success") {
//     return <ThankYou setStep={setStep} />;
//   }

//   return (
//     <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur">
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-70 pointer-events-none" />
//       <div className="relative p-6 md:p-8 transition-all duration-500 min-h-[420px] flex items-center">
//         {step === "form" && (
//           <form onSubmit={handleFormSubmit} className="w-full space-y-6">
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold text-foreground mb-2">
//                 Get in Touch
//               </h2>
//               <p className="text-muted-foreground">
//                 Fill out the form and we'll contact you shortly
//               </p>
//             </div>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 value={formValues.name}
//                 onChange={(e) => handleFieldChange("name", e.target.value)}
//                 className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 placeholder="Enter your full name *"
//                 required
//                 disabled={loading}
//               />

//               <input
//                 type="tel"
//                 value={formValues.phone}
//                 onChange={(e) => handlePhoneChange(e.target.value)}
//                 maxLength={10}
//                 className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 placeholder="10-digit mobile number *"
//                 required
//                 disabled={loading}
//               />
//               {formValues.phone && !validatePhone(formValues.phone) && (
//                 <p className="mt-1 text-sm text-amber-600">
//                   Please enter a valid Indian mobile number (starts with 6-9)
//                 </p>
//               )}

//               <input
//                 type="email"
//                 value={formValues.email}
//                 onChange={(e) => handleFieldChange("email", e.target.value)}
//                 className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 placeholder="Enter your email *"
//                 required
//                 disabled={loading}
//               />

//               <select
//                 value={formValues.investmentSlab}
//                 onChange={(e) =>
//                   handleFieldChange("investmentSlab", e.target.value)
//                 }
//                 className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 required
//                 disabled={loading}
//               >
//                 <option value="">Select investment amount *</option>
//                 <option value="2.5 Lacs">2.5 Lakhs</option>
//                 <option value="5 Lacs">5 Lakhs</option>
//                 <option value="10 Lacs">10 Lakhs</option>
//                 <option value="15-20 Lacs">15-20 Lakhs</option>
//                 <option value="20-30 Lacs">20-30 Lakhs</option>
//                 <option value="30-40 Lacs">30-40 Lakhs</option>
//                 <option value="40-50 Lacs">40-50 Lakhs</option>
//                 <option value="50+ Lacs">50+ Lakhs</option>
//               </select>

//               {/* State Dropdown */}
//               <select
//                 value={formValues.state}
//                 onChange={(e) => handleStateChange(e.target.value)}
//                 className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//                 disabled={loading}
//               >
//                 <option value="">Select State *</option>
//                 {Object.keys(statesData).map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </select>

//               {/* City Dropdown */}
//               <select
//                 value={formValues.city}
//                 onChange={(e) => handleCityChange(e.target.value)}
//                 className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={loading || !formValues.state}
//               >
//                 <option value="">
//                   {formValues.state ? "Select City *" : "Select State first"}
//                 </option>
//                 {cities.map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {formError && (
//               <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
//                 <p className="text-red-600 dark:text-red-400 text-sm font-medium">
//                   {formError}
//                 </p>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed text-gray-200"
//                   : "bg-blue-500 hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md active:scale-95"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
//                   Sending OTP...
//                 </span>
//               ) : (
//                 "Send OTP"
//               )}
//             </button>

//             <p className="text-xs text-center text-muted-foreground mt-4">
//               By submitting this form, you agree to our Privacy Policy and
//               consent to being contacted by our team.
//             </p>
//           </form>
//         )}

//         {step === "otp" && (
//           <OtpVerification
//             phone={displayPhone}
//             value={otpValue}
//             onChange={(val) => {
//               setOtpValue(val);
//               setOtpError("");
//             }}
//             onSubmit={handleVerifyOtp}
//             onResend={() => {
//               setStep("form");
//               toast({
//                 title: "Returning to form...",
//                 description: "You can retry sending OTP",
//               });
//             }}
//             loading={loading}
//             error={otpError}
//             className="w-full"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import emailjs from "@emailjs/browser";

import ThankYou from "@/pages/InvestorWebsite/pages/ThankYou";
import type { LeadFormValues as BaseLeadFormValues } from "@/pages/InvestorWebsite/components/contact/Form";
import statesData from "@/pages/InvestorWebsite/data/state-city.json";

interface LeadFormValues extends BaseLeadFormValues {
  city: string;
  state: string;
}

type Step = "form" | "success";

const initialValues: LeadFormValues = {
  name: "",
  phone: "",
  email: "",
  investmentSlab: "",
  city: "",
  state: "",
};

// Replace these with the values from your EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_6k06y1j";
const EMAILJS_TEMPLATE_ID = "template_t23krsm";
const EMAILJS_PUBLIC_KEY = "weK32YcmGsZZhdIwx";

const cleanPhone = (value: string) => value.replace(/\D/g, "").slice(-10);
const validatePhone = (phone: string) => {
  const cleaned = cleanPhone(phone);
  return cleaned.length === 10 && /^[6-9]/.test(cleaned);
};
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ContactForm() {
  const [step, setStep] = useState<Step>("form");
  const [formValues, setFormValues] = useState<LeadFormValues>(initialValues);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const handleFieldChange = (field: keyof LeadFormValues, value: string) => {
    setFormValues((previous) => ({ ...previous, [field]: value }));
    setFormError("");
  };

  const handleStateChange = (value: string) => {
    setFormValues((previous) => ({ ...previous, state: value, city: "" }));
    setCities(statesData[value] || []);
    setFormError("");
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (loading) return;

    const phone = cleanPhone(formValues.phone);
    if (!formValues.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!validatePhone(phone)) {
      setFormError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!validateEmail(formValues.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!formValues.investmentSlab) {
      setFormError("Please select an investment amount.");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          phone: `+91${phone}`,
          investment_slab: formValues.investmentSlab,
          city: formValues.city,
          state: formValues.state,
          time: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStep("success");
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setFormError("Unable to submit your details right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return <ThankYou setStep={setStep} />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-70" />
      <div className="relative flex min-h-[420px] items-center p-6 transition-all duration-500 md:p-8">
        <form onSubmit={handleFormSubmit} className="w-full space-y-6">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground">
              Fill out the form and we&apos;ll contact you shortly.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={formValues.name}
              onChange={(event) => handleFieldChange("name", event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name *"
              autoComplete="name"
              required
              disabled={loading}
            />

            <input
              type="tel"
              value={formValues.phone}
              onChange={(event) =>
                handleFieldChange("phone", event.target.value.replace(/\D/g, "").slice(0, 10))
              }
              maxLength={10}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              placeholder="10-digit mobile number *"
              autoComplete="tel"
              required
              disabled={loading}
            />

            <input
              type="email"
              value={formValues.email}
              onChange={(event) => handleFieldChange("email", event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              placeholder="Enter your email *"
              autoComplete="email"
              required
              disabled={loading}
            />

            <select
              value={formValues.investmentSlab}
              onChange={(event) => handleFieldChange("investmentSlab", event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              required
              disabled={loading}
            >
              <option value="">Select investment amount *</option>
              <option value="2.5 Lacs">2.5 Lakhs</option>
              <option value="5 Lacs">5 Lakhs</option>
              <option value="10 Lacs">10 Lakhs</option>
              <option value="15-20 Lacs">15-20 Lakhs</option>
              <option value="20-30 Lacs">20-30 Lakhs</option>
              <option value="30-40 Lacs">30-40 Lakhs</option>
              <option value="40-50 Lacs">40-50 Lakhs</option>
              <option value="50+ Lacs">50+ Lakhs</option>
            </select>

            <select
              value={formValues.state}
              onChange={(event) => handleStateChange(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
              disabled={loading}
            >
              <option value="">Select State</option>
              {Object.keys(statesData).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <select
              value={formValues.city}
              onChange={(event) => handleFieldChange("city", event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-all focus:border-transparent focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading || !formValues.state}
            >
              <option value="">
                {formValues.state ? "Select City" : "Select State first"}
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {formError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{formError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg px-4 py-3 font-medium shadow-sm transition-all ${
              loading
                ? "cursor-not-allowed bg-gray-400 text-gray-200"
                : "bg-blue-500 text-white hover:opacity-90 hover:shadow-md active:scale-[0.99]"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By submitting this form, you agree to our Privacy Policy and consent to being contacted by our team.
          </p>
        </form>
      </div>
    </div>
  );
}
