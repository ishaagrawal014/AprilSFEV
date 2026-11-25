// import { useMemo, useState } from "react";
// import { LeadForm, type LeadFormValues } from "@/components/contact/Form";
// import { OtpVerification } from "@/components/contact/OTP";
// import { SuccessState } from "@/components/contact/Success";
// import { useToast } from "@/hooks/use-toast";
// import { track } from "@/lib/api"; // Removed 'api' import, kept 'track' if you still use it for analytics

// type Step = "form" | "otp" | "success";

// const initialValues: LeadFormValues = {
//     name: "",
//     phone: "",
//     email: "",
//     investmentSlab: "",
// };

// const phoneRegex = /^[6-9]\d{9}$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



// // API Configuration
// const API_BASE_URL = "https://localhost:7178/api/v1";

// export default function ContactForm() {
//     const { toast } = useToast();
//     const [step, setStep] = useState<Step>("form");
//     const [formValues, setFormValues] = useState<LeadFormValues>(initialValues);
//     const [formError, setFormError] = useState("");
//     const [otpError, setOtpError] = useState("");
//     const [otpValue, setOtpValue] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [phoneForOtp, setPhoneForOtp] = useState("");

//     const sanitizedPhone = useMemo(() => cleanPhone(formValues.phone), [formValues.phone]);
//     const displayPhone = phoneForOtp
//         ? formatDisplayPhone(phoneForOtp)
//         : sanitizedPhone
//             ? `+91 ${sanitizedPhone.slice(0, 5)} ${sanitizedPhone.slice(5)}`
//             : "+91";

//     const handleFieldChange = (field: keyof LeadFormValues, value: string) => {
//         setFormValues((prev) => ({ ...prev, [field]: value }));
//     };

//     const resetState = () => {
//         setFormError("");
//         setOtpError("");
//         setOtpValue("");
//     };

//     const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (loading) return;

//         const validationMessage = validateForm(formValues);
//         if (validationMessage) {
//             setFormError(validationMessage);
//             return;
//         }

//         resetState();
//         setLoading(true);

//         const formattedPhone = `+91${sanitizedPhone}`;

//         try {
//             track("otp_request_started", { slab: formValues.investmentSlab });

//             // 1. Send Payload to /api/v1/mail
//             const response = await fetch(`${API_BASE_URL}/mail`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: formValues.name,
//                     email: formValues.email,
//                     phone: formattedPhone,
//                     moneySlab: formValues.investmentSlab, // Mapped investmentSlab to moneySlab
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to send request. Please try again.");
//             }

//             toast({
//                 title: "OTP Sent",
//                 description: "Enter the 6-digit code we just sent to your phone.",
//             });

//             setPhoneForOtp(formattedPhone);
//             setStep("otp");
//         } catch (error) {
//             console.error(error);
//             setFormError(error instanceof Error ? error.message : "Unable to send OTP. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleVerifyOtp = async () => {
//         if (loading) return;
//         if (otpValue.length !== 6) {
//             setOtpError("Please enter the 6-digit OTP.");
//             return;
//         }

//         setLoading(true);
//         setOtpError("");

//         try {
//             // 2. Verify Payload at /api/v1/verifyotp
//             const response = await fetch(`${API_BASE_URL}/verifyotp`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     phone: phoneForOtp,
//                     otp: otpValue,
//                 }),
//             });

//             if (!response.ok) {
//                 // Try to parse error message from server if available
//                 let errorMessage = "OTP verification failed.";
//                 try {
//                     const errorData = await response.json();
//                     if (errorData.message) errorMessage = errorData.message;
//                 } catch (e) { /* ignore JSON parse error */ }

//                 throw new Error(errorMessage);
//             }

//             // If status is 200 OK
//             const data = await response.json();

//             // Assuming 200 means verified, but if your API returns { verified: boolean } inside 200:
//             // You might need: if (data.verified) { ... }
//             // For now, treating 200 OK as success based on standard REST practices.

//             track("otp_verified", { slab: formValues.investmentSlab });
//             setStep("success");
//             toast({
//                 title: "Verification Complete",
//                 description: "Thank you! Our team will reach out shortly.",
//             });

//         } catch (error) {
//             console.error(error);
//             setOtpError(error instanceof Error ? error.message : "Unable to verify OTP. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResendOtp = async () => {
//         if (loading) return;
//         resetState();
//         setLoading(true);

//         try {
//             // Re-using the mail endpoint for resend
//             const response = await fetch(`${API_BASE_URL}/mail`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: formValues.name,
//                     email: formValues.email,
//                     phone: phoneForOtp,
//                     moneySlab: formValues.investmentSlab,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error("Unable to resend OTP right now.");
//             }

//             track("otp_resent", { slab: formValues.investmentSlab });
//             toast({
//                 title: "OTP resent",
//                 description: "Please check your phone again.",
//             });
//         } catch (error) {
//             setOtpError(error instanceof Error ? error.message : "Unable to resend OTP right now.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur">
//             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-70 pointer-events-none" />
//             <div className="relative p-6 md:p-8 transition-all duration-500 min-h-[420px] flex items-center">
//                 {step === "form" && (
//                     <LeadForm
//                         values={formValues}
//                         onChange={handleFieldChange}
//                         onSubmit={handleFormSubmit}
//                         loading={loading}
//                         error={formError}
//                         className="w-full"
//                     />
//                 )}

//                 {step === "otp" && (
//                     <OtpVerification
//                         phone={displayPhone}
//                         value={otpValue}
//                         onChange={(value) => {
//                             setOtpValue(value);
//                             setOtpError("");
//                         }}
//                         onSubmit={handleVerifyOtp}
//                         onResend={handleResendOtp}
//                         loading={loading}
//                         error={otpError}
//                         className="w-full"
//                     />
//                 )}

//                 {step === "success" && <SuccessState name={formValues.name} className="w-full" />}
//             </div>
//         </div>
//     );
// }

// const cleanPhone = (value: string) => value.replace(/\D/g, "").slice(-10);

// const formatDisplayPhone = (value: string) => {
//     const digits = value.replace(/\D/g, "").slice(-10);
//     if (!digits) return "+91";
//     return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
// };

// const validateForm = (values: LeadFormValues) => {
//     if (!values.name || !values.phone || !values.email || !values.investmentSlab) {
//         return "Please fill in all required fields.";
//     }

//     const digits = cleanPhone(values.phone);

//     if (!phoneRegex.test(digits)) {
//         return "Enter a valid 10-digit Indian mobile number.";
//     }

//     if (!emailRegex.test(values.email)) {
//         return "Enter a valid email address.";
//     }

//     return "";
// };





import { useState } from "react";
import emailjs from "@emailjs/browser";

import { LeadForm, type LeadFormValues } from "@pages/InvestorWebsite/components/contact/Form";
import { SuccessState } from "@pages/InvestorWebsite/components/contact/Success";

const initialValues: LeadFormValues = {
  name: "",
  phone: "",
  email: "",
  investmentSlab: "",
};

const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [formValues, setFormValues] =
    useState<LeadFormValues>(initialValues);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (
    field: keyof LeadFormValues,
    value: string,
  ) => {
    setFormValues((previous) => ({ ...previous, [field]: value }));
    setFormError("");
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) return;

    const validationMessage = validateForm(formValues);
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    const serviceId = "service_6k06y1j";
    const templateId = "template_t23krsm";
    const publicKey = "weK32YcmGsZZhdIwx";

    if (!serviceId || !templateId || !publicKey) {
      setFormError(
        "The contact form is not configured yet. Please try again later.",
      );
      console.error("Missing EmailJS environment variables.");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const phoneDigits = cleanPhone(formValues.phone);
      const templateParams = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        phone: `+91${phoneDigits}`,
        investment_slab: formValues.investmentSlab,
        investmentSlab: formValues.investmentSlab,
        time: new Date().toLocaleString("en-IN"),
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      // Show the thank-you page immediately after EmailJS confirms success.
      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setFormError(
        "We couldn't submit your details. Please try again or contact us directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-70" />

      <div className="relative flex min-h-[420px] items-center p-6 transition-all duration-500 md:p-8">
        {submitted ? (
          <SuccessState
            name={formValues.name}
            className="w-full"
          />
        ) : (
          <LeadForm
            values={formValues}
            onChange={handleFieldChange}
            onSubmit={handleFormSubmit}
            loading={loading}
            error={formError}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
}

const cleanPhone = (value: string) =>
  value.replace(/\D/g, "").slice(-10);

const validateForm = (values: LeadFormValues) => {
  if (
    !values.name.trim() ||
    !values.phone.trim() ||
    !values.email.trim() ||
    !values.investmentSlab
  ) {
    return "Please fill in all required fields.";
  }

  if (!phoneRegex.test(cleanPhone(values.phone))) {
    return "Enter a valid 10-digit Indian mobile number.";
  }

  if (!emailRegex.test(values.email.trim())) {
    return "Enter a valid email address.";
  }

  return "";
};
