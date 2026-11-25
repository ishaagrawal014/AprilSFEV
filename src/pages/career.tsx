import React, { useState, useRef } from 'react';
import { Briefcase, MapPin, Clock, IndianRupee, ChevronRight, CheckCircle2, Upload, FileText, X, AlertCircle, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EMAILJS_SERVICE_ID = 'service_sjyr2ng';
const EMAILJS_TEMPLATE_ID = 'template_fqov269';
const EMAILJS_PUBLIC_KEY = 'x7kOeMkhqo_nfwkcS';
const API_URL = 'https://www.speedforceev.in/api/career/store';

const FormInput = ({ name, value, onChange, errors, type = "text", placeholder, isSelect = false, options = [], isTextArea = false }) => {
    const hasError = errors[name];

    const baseStyle = `w-full p-4 rounded-lg border transition-all text-base outline-none appearance-none bg-white ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]'
        }`;

    return (
        <div className= "flex flex-col gap-1 relative" >
        {
            isSelect?(
                <div className = "relative group" >
                    <select name={ name } value = { value } onChange = { onChange } className = {`${baseStyle} cursor-pointer pr-10`} >
        <option value="" disabled className = "bg-[#1a73e8] text-white font-bold p-2" >
            { placeholder }
            </option>
    {
        options.map(opt => (
            <option key= { opt } value = { opt } className = "text-gray-800 py-2" > { opt } </option>
        ))
    }
    </select>
        < div className = "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#1a73e8]" >
            <ChevronDown size={ 18 } />
                </div>
                </div>
            ) : isTextArea ? (
    <textarea name= { name } value = { value } onChange = { onChange } placeholder = { placeholder } rows = "3" className = {`${baseStyle} resize-none`} />
            ) : (
    <input type= { type } name = { name } value = { value } onChange = { onChange } placeholder = { placeholder } className = { baseStyle } />
            )}
{
    hasError && (
        <span className="text-red-500 text-xs font-bold ml-1 mt-1 flex items-center gap-1" >
            <AlertCircle size={ 12 } /> {Array.isArray(hasError) ? hasError[0] : hasError}
                </span>
            )
}
</div>
    );
};

const CareersPage = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        positionApplied: '',
        totalExperience: '',
        keySkills: '',
        qualification: '',
        company: '',
        noticePeriod: '',
        currentCtc: '',   // ← NEW
        expectedCtc: '',  // ← NEW
        message: ''
    });

    const fileInputRef = useRef(null);

    const jobs = [
        {
            id: 1,
            title: "Branch Manager - Sales",
            location: "Surat, Pune, Mumbai, Thane, Vapi",
            experience: "4–7 Years",
            ctc: "₹6-7LPA (Fixed) + High Performance Incentives",
            type: "Full-Time",
            requirements: [
                "Revenue & Target Management: Own and consistently achieve branch sales targets (monthly and quarterly) by driving revenue through Relationship Manager team performance and individual sales closures, ensuring sustained business growth in the EV rental segment.",

                "Drive business growth in EV leasing and rental by onboarding fleet partners, aggregators, and corporate clients while building local partnerships to expand EV adoption within the assigned territory.",
                "Support high-value deal closures by personally managing key clients such as fleet operators, business owners, and institutional partners while building a strong EV ecosystem network.",
                "Identify high-potential markets, develop lead generation strategies, and enhance brand visibility through targeted on-ground expansion initiatives.",
                "4–7 years of experience in Sales, B2B Sales, Financial Products, Fleet, Mobility, or Leasing with at least 2–3 years in a team leadership role.",
                "Prior experience in Insurance, Banking, NBFC, or Financial Products."
            ]
        },
        {
            id: 2,
            title: "Relationship Manager – Business Development",
            location: "Vadodara, Gujarat",
            experience: "2–5 Years",
            ctc: "₹3LPA (Fixed) + Up to ₹50,000/month Incentives",
            type: "Full-Time",
            requirements: [
                "Graduate/Postgraduate in BBA, MBA, B.Com, or Marketing",
                "Experience in high-ticket sales or investor handling",
                "Ability to generate 70% of leads through personal networking",
                "Deep understanding of investment concepts and ROI-based selling",
                "Excellent communication, negotiation, and closing abilities"
            ]
        }
    ];

    const experienceOptions = ["Fresher", "2+", "2.5", "5", "10+"];
    const noticePeriodOptions = ["Immediate", "15 Days", "30 Days", "45 Days+"];

    const validateForm = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Invalid email format";
        }
        if (!formData.phone) {
            tempErrors.phone = "Phone is required";
        } else if (!phoneRegex.test(formData.phone)) {
            tempErrors.phone = "Enter a valid 10-digit number";
        }
        if (!formData.city.trim()) tempErrors.city = "City is required";
        if (!formData.positionApplied.trim()) tempErrors.positionApplied = "Position is required";
        if (!formData.qualification.trim()) tempErrors.qualification = "Qualification is required";
        if (!formData.totalExperience) tempErrors.totalExperience = "Experience is required";
        if (!formData.company.trim()) tempErrors.company = "Company is required";
        if (!formData.noticePeriod) tempErrors.noticePeriod = "Select notice period";
        if (!formData.keySkills.trim()) tempErrors.keySkills = "Key skills are required";
        // currentCtc and expectedCtc are now optional, but if filled, must be numbers
        const numberRegex = /^\d+(\.\d+)?$/;
        if (formData.currentCtc.trim() && !numberRegex.test(formData.currentCtc.trim())) {
            tempErrors.currentCtc = "Current CTC must be a number";
        }
        if (formData.expectedCtc.trim() && !numberRegex.test(formData.expectedCtc.trim())) {
            tempErrors.expectedCtc = "Expected CTC must be a number";
        }
        if (!selectedFile) tempErrors.file = "Please upload your resume";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setSubmitError("File size exceeds 5MB limit.");
                return;
            }
            setSelectedFile(file);
            const newErrors = { ...errors };
            delete newErrors.file;
            setErrors(newErrors);
            setSubmitError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const payload = new FormData();
            Object.keys(formData).forEach(key => payload.append(key, formData[key]));
            payload.append('resume', selectedFile);

            const uploadResponse = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: payload,
            });

            if (!uploadResponse.ok) throw new Error('Submission failed.');

            const emailParams = { ...formData, resume_filename: selectedFile.name };
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY);

            setIsSubmitted(true);
        } catch (err) {
            setSubmitError(err.message || 'Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openJobForm = (job) => {
        setSelectedJob(job);
        setFormData(prev => ({ ...prev, positionApplied: job.title }));
        setIsSubmitted(false);
        setErrors({});
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    return (
        <>
        <Header />
        < div className = "min-h-screen bg-gray-50 pb-20 font-sans" >
            {/* Hero */ }
            < div className = "relative text-white py-28 px-6 text-center overflow-hidden" >
                <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80" alt = "EV careers hero" className = "absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/55" />
                        <div className="relative z-10" >
                            <p className="text-white font-bold tracking-widest text-sm uppercase mb-3 opacity-80" > We Are Hiring </p>
                                < h1 className = "text-4xl md:text-5xl font-bold mb-4 text-white" > Join Our Team & Build the Future </h1>
                                    < p className = "max-w-2xl mx-auto text-lg opacity-85" > Join SpeedForce EV, India's leading EV fleet ecosystem enabler.</p>
                                        </div>
                                        </div>

                                        < div className = "max-w-6xl mx-auto px-6 mt-10" >
                                            {!selectedJob ? (
                                                <div className= "space-y-6" >
                                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2" > <Briefcase /> Current Openings</h2 >
                                                {
                                                    jobs.map((job) => (
                                                        <div key= { job.id } className = "bg-white rounded-xl shadow-sm border p-6 hover:border-blue-300 transition-all" >
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" >
                                                    <div className="space-y-2" >
                                                    <span className="bg-blue-50 text-[#1a73e8] text-xs font-bold px-3 py-1 rounded-full uppercase" > { job.type } </span>
                                                    < h3 className = "text-xl font-bold text-gray-900" > { job.title } </h3>
                                                    < div className = "flex flex-wrap gap-4 text-gray-600 text-sm" >
                                                    <span className="flex items-center gap-1 font-semibold text-green-600" > <IndianRupee size={ 16} /> { job.ctc } </span>
                                                    </div>
                                                    </div>
                                                    < button onClick = {() => openJobForm(job)} className = "bg-[#1a73e8] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2" >
                                                        View Details < ChevronRight size = { 18} />
                                                            </button>
                                                            </div>
                                                            </div>
                            ))}
</div>
                    ) : (
    <div className= "bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100" >
    <div className="p-8 md:p-12" >
        <div className="flex justify-between items-start mb-10" >
            <div>
            <h2 className="text-3xl font-bold text-gray-900" > { selectedJob.title } </h2>
                < p className = "text-gray-500 mt-1 flex items-center gap-2" > <MapPin size={ 16 } /> {selectedJob.location}</p >
                    </div>
                    < button onClick = {() => setSelectedJob(null)} className = "text-gray-400 hover:text-gray-600 p-2" > <X size={ 28 } /></button >
                        </div>

                        < div className = "grid lg:grid-cols-5 gap-12" >
                            <div className="lg:col-span-2" >
                                <h4 className="text-lg font-bold text-gray-800 mb-4 underline decoration-blue-500 underline-offset-8" > Requirements </h4>
                                    < ul className = "space-y-4" >
                                    {
                                        selectedJob.requirements.map((req, index) => (
                                            <li key= { index } className = "flex items-start gap-3 text-gray-600 text-sm" >
                                            <CheckCircle2 className="text-green-500 mt-1 shrink-0" size = { 18} /> { req }
                                            </li>
                                        ))
                                    }
                                        </ul>
                                        </div>

                                        < div className = "lg:col-span-3" >
                                            {!isSubmitted ? (
                                                <div className= "bg-white rounded-2xl p-8 border border-gray-200 shadow-sm" >
                                                <form onSubmit={ handleSubmit } className = "space-y-5" >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" >
                                                        <FormInput name="fullName" value = { formData.fullName } onChange = { handleInputChange } errors = { errors } placeholder = "Full Name *" />
                                                            <FormInput name="email" type = "email" value = { formData.email } onChange = { handleInputChange } errors = { errors } placeholder = "Email *" />
                                                                <FormInput name="phone" value = { formData.phone } onChange = { handleInputChange } errors = { errors } placeholder = "Phone *" />
                                                                    <FormInput name="city" value = { formData.city } onChange = { handleInputChange } errors = { errors } placeholder = "City *" />
                                                                        <FormInput name="positionApplied" value = { formData.positionApplied } onChange = { handleInputChange } errors = { errors } placeholder = "Position *" />
                                                                            <FormInput name="qualification" value = { formData.qualification } onChange = { handleInputChange } errors = { errors } placeholder = "Qualification *" />
                                                                                <FormInput
                                                            name="totalExperience"
value = { formData.totalExperience }
onChange = { handleInputChange }
errors = { errors }
placeholder = "Total Experience *"
isSelect = { true}
options = { experienceOptions }
    />
    <FormInput name="company" value = { formData.company } onChange = { handleInputChange } errors = { errors } placeholder = "Prev / Current Company *" />
        <FormInput
                                                            name="noticePeriod"
value = { formData.noticePeriod }
onChange = { handleInputChange }
errors = { errors }
placeholder = "Notice Period *"
isSelect = { true}
options = { noticePeriodOptions }
    />
    <FormInput name="keySkills" value = { formData.keySkills } onChange = { handleInputChange } errors = { errors } placeholder = "Key Skills *" />

        {/* ── NEW: Current CTC & Expected CTC ── */ }
        < FormInput
name = "currentCtc"
value = { formData.currentCtc }
onChange = { handleInputChange }
errors = { errors }
placeholder = "Current CTC (e.g. 3.5 LPA)"
    />
    <FormInput
                                                            name="expectedCtc"
value = { formData.expectedCtc }
onChange = { handleInputChange }
errors = { errors }
placeholder = "Expected CTC (e.g. 5 LPA)"
    />
    </div>

    < FormInput name = "message" value = { formData.message } onChange = { handleInputChange } errors = { errors } placeholder = "Message (Optional)" isTextArea />

        {/* File Upload */ }
        < div className = "space-y-2" >
            <input type="file" ref = { fileInputRef } onChange = { handleFileChange } className = "hidden" accept = ".pdf,.doc,.docx" />
                <div
                                                            onClick={ () => fileInputRef.current.click() }
className = {`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${errors.file ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-400'}`}
                                                        >
    {
        selectedFile?(
                                                                <div className = "flex items-center justify-center gap-2" >
                <FileText className="text-blue-500" />
    <p className="text-sm font-bold text-gray-800" > { selectedFile.name } </p>
        </div>
                                                            ) : (
    <div className= "flex flex-col items-center gap-2" >
    <Upload className="text-gray-400" />
        <p className="text-gray-500" > Upload Resume * <span className="text-xs" > (PDF / DOC, Max 5MB)</span></p >
            </div>
                                                            )}
</div>
{ errors.file && <p className="text-red-500 text-xs font-bold text-center" > { errors.file } </p> }
</div>

{ submitError && <p className="text-red-600 bg-red-50 p-3 rounded-lg text-center text-sm font-bold border border-red-200" > { submitError } </p> }

<button
                                                        type="submit"
disabled = { isSubmitting }
className = "w-full py-4 rounded-xl font-bold text-white bg-[#22C55E] hover:bg-green-600 transition-colors shadow-lg shadow-green-200 disabled:opacity-50"
    >
    { isSubmitting? 'Submitting Application...': 'Submit Application' }
    </button>
    </form>
    </div>
                                        ) : (
    <div className= "text-center py-20 bg-green-50 rounded-2xl border border-green-100" >
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" >
        <CheckCircle2 className="text-green-600" size = { 40} />
            </div>
            < h4 className = "text-2xl font-bold text-gray-900" > Application Submitted! </h4>
                < p className = "text-gray-600 mt-2" > Thank you for your interest.We'll get back to you soon.</p>
                    < button onClick = {() => { setSelectedJob(null); setIsSubmitted(false); }} className = "mt-8 px-8 py-3 bg-white border border-gray-200 rounded-lg text-blue-600 font-bold hover:bg-gray-50 transition-all" >
                        View Other Jobs
                            </button>
                            </div>
                                        )}
</div>
    </div>
    </div>
    </div>
                    )}
</div>
    </div>
    < Footer />
    </>
    );
};

export default CareersPage;