import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    ChevronRight,
    Plus,
    Trash2,
    Upload,
    Car,
    Truck,
    Building2,
    Lock, Eye, EyeOff,FileCheck, X, Undo2
} from "lucide-react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const AUTH_TOKEN = 'hardcoded-token-123456';

interface TokenEntry {
    amount: string;
    date: string;
    utr: string;
    payment_method: string;

}

interface FormData {
    // Section 1
    srNo: string;
    date: string;
    pan: string;
    aadhar: string;
    phone: string;
    email: string;

    // Section 2
    investmentAs: string;
    panTanNo: string;
    panTanDoc: File | null;
    aadharNo: string;
    aadharDoc: File | null;
    gstNo: string;
    gstDoc: File | null;
    investmentValue: string;
    investmentDate: string;
    finalRefNo: string;
    tokenEntries: TokenEntry[];
    cancelledChequeDoc: File | null;
    rentAccountNumber: string;
    rentIfsc: string;
    rentBankName: string;
    rentBranch: string;

    // Section 3
    notaryAgreementDoc: File | null;
    stampPaperDoc: File | null;
    invoiceDoc: File | null;
    courierTrackingNumber: string;
    courierTrackingDoc: File | null;

    // Section 4
    firstRentDate: string;
    nextRentDate: string;
    lastRentDate: string;
    latestRentReceiptDoc: File | null;

    // Section 5
    vehicleTrackingUrl: string;
}

const SummaryModal = ({ data, onConfirm, onCancel }: { data: FormData, onConfirm: () => void, onCancel: () => void }) => {
    // Helper to display data row
    const DataRow = ({ label, value, isFile, isUrl }: { label: string, value: string | File | null, isFile?: boolean, isUrl?: boolean }) => (
        <div className="py-2 border-b border-slate-50 last:border-0 min-h-[50px] flex flex-col justify-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            {isFile ? (
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold truncate">
                    {value && value instanceof File ? <><FileCheck size={14} className="text-emerald-500 shrink-0" /> {value.name}</> : <span className="text-slate-300">Not Uploaded</span>}
                </div>
            ) : isUrl ? (
                <a href={typeof value === 'string' ? value : '#'} target="_blank" rel="noreferrer" className="text-indigo-600 text-xs font-bold underline truncate block">{typeof value === 'string' ? value : '—'}</a>
            ) : (
                <p className="text-xs font-bold text-slate-700 break-words">{typeof value === 'string' ? value : '—'}</p>
            )}
        </div>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <h4 className="text-[10px] font-black text-white bg-slate-800 px-3 py-1.5 rounded-lg mb-4 uppercase inline-block tracking-widest">{title}</h4>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
            <div className="bg-white w-full max-w-7xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase">Review Record Details</h3>
                        <p className="text-xs font-bold text-slate-400">Please verify all fields before saving.</p>
                    </div>
                    <button onClick={onCancel} className="p-3 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Col 1: Basic & Investment Info */}
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="1. Identity & Contact" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="Sr No" value={data.srNo} />
                                    <DataRow label="Date" value={data.date} />
                                    <DataRow label="PAN" value={data.pan} />
                                    <DataRow label="Aadhar" value={data.aadharNo} />
                                    <DataRow label="Phone" value={data.phone} />
                                    <DataRow label="Email" value={data.email} />
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="2. Investment Profile" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="Invest As" value={data.investmentAs} />
                                    <DataRow label="Inv. Value" value={data.investmentValue} />
                                    <DataRow label="Inv. Date" value={data.investmentDate} />
                                    <DataRow label="Final Ref" value={data.finalRefNo} />
                                    <div className="col-span-2 mt-2 pt-2 border-t border-slate-100">
                                        <p className="text-[9px] font-black text-indigo-400 uppercase mb-2">IDs</p>
                                        <div className="grid grid-cols-2 gap-x-4">
                                            <DataRow label="Inv. Aadhar" value={data.aadharNo} />
                                            <DataRow label="Inv. PAN/TAN" value={data.panTanNo} />
                                            <DataRow label="Inv. GST" value={data.gstNo} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Col 2: Banking & Tokens */}
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="3. Banking Details" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="Bank Name" value={data.rentBankName} />
                                    <DataRow label="Branch" value={data.rentBranch} />
                                    <DataRow label="Account No" value={data.rentAccountNumber} />
                                    <DataRow label="IFSC" value={data.rentIfsc} />
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="4. Token Payments" />
                                {data.tokenEntries.length > 0 && data.tokenEntries[0].amount ? (
                                    <div className="space-y-3">
                                        {data.tokenEntries.map((t, i) => (
                                            <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400">{t.date || 'No Date'}</p>
                                                    <p className="text-xs font-black text-slate-700">₹ {t.amount || '0'}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase"> {t.payment_method.replace('_', ' ')}
</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Ref</p>
                                                    <p className="text-[10px] font-bold text-indigo-600">{t.utr || '-'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-400 font-bold italic">No token entries added.</p>
                                )}
                            </div>
                        </div>

                        {/* Col 3: Documents, Legal, Schedule */}
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="5. Document Checklist" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="PAN Doc" value={data.panTanDoc} isFile />
                                    <DataRow label="Aadhar Doc" value={data.aadharDoc} isFile />
                                    <DataRow label="GST Doc" value={data.gstDoc} isFile />
                                    <DataRow label="Cancelled Chq" value={data.cancelledChequeDoc} isFile />
                                    <DataRow label="Notary Agree." value={data.notaryAgreementDoc} isFile />
                                    <DataRow label="Stamp Paper" value={data.stampPaperDoc} isFile />
                                    <DataRow label="Invoice" value={data.invoiceDoc} isFile />
                                    <DataRow label="Courier Doc" value={data.courierTrackingDoc} isFile />
                                    <DataRow label="Rent Receipt" value={data.latestRentReceiptDoc} isFile />
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="6. Logistics & Schedule" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="First Rent" value={data.firstRentDate} />
                                    <DataRow label="Next Rent" value={data.nextRentDate} />
                                    <DataRow label="Last Rent" value={data.lastRentDate} />
                                    <DataRow label="Courier Track" value={data.courierTrackingNumber} />
                                    <div className="col-span-2">
                                        <DataRow label="Vehicle Tracking URL" value={data.vehicleTrackingUrl} isUrl />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t flex gap-4 bg-slate-50">
                    <button onClick={onCancel} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all">
                        Back to Edit
                    </button>
                    <button onClick={onConfirm} className="flex-[2] py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                        <FileCheck size={18} /> Confirm & Save Database
                    </button>
                </div>
            </div>
        </div>
    );
};
    
// --- Login Component ---
const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@gmail.com' && password === 'admin123') {
            onLogin();
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-4">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Admin Portal</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" required placeholder="admin@gmail.com" className="w-full px-6 py-5 bg-slate-50 rounded-2xl outline-none font-bold" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="relative">
                        <input type={showPass ? "text" : "password"} required placeholder="••••••••" className="w-full px-6 py-5 bg-slate-50 rounded-2xl outline-none font-bold" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {error && <p className="text-rose-500 text-xs font-black text-center uppercase">{error}</p>}
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg">Unlock Registry</button>
                </form>
            </div>
        </div>
    );
};

const InvestmentRegistryForm: React.FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [showSummary, setShowSummary] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        // Section 1
        srNo: "",
        date: "",
        pan: "",
        aadhar: "",
        phone: "",
        email: "",

        // Section 2
        investmentAs: "",
        panTanNo: "",
        panTanDoc: null,
        aadharNo: "",
        aadharDoc: null,
        gstNo: "",
        gstDoc: null,
        investmentValue: "",
        investmentDate: "",
        finalRefNo: "",
        tokenEntries: [{ amount: "", payment_method: "", date: "", utr: "" }],
        cancelledChequeDoc: null,
        rentAccountNumber: "",
        rentIfsc: "",
        rentBankName: "",
        rentBranch: "",

        // Section 3
        notaryAgreementDoc: null,
        stampPaperDoc: null,
        invoiceDoc: null,
        courierTrackingNumber: "",
        courierTrackingDoc: null,

        // Section 4
        firstRentDate: "",
        nextRentDate: "",
        lastRentDate: "",
        latestRentReceiptDoc: null,

        // Section 5
        vehicleTrackingUrl: "",
    });

    

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (name: keyof FormData) => 
        (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            setFormData((prev) => ({ ...prev, [name]: file }));
        };

    const addTokenEntry = () => {
        setFormData((prev) => ({
            ...prev,
            tokenEntries: [...prev.tokenEntries, { amount: "", payment_method:"", date: "", utr: "" }],
        }));
    };

    const removeTokenEntry = (index: number) => {
        const updated = [...formData.tokenEntries];
        updated.splice(index, 1);
        setFormData((prev) => ({ ...prev, tokenEntries: updated }));
    };

    const handleTokenChange = (
        index: number,
        field: keyof TokenEntry,
        value: string
    ) => {
        const updated = [...formData.tokenEntries];
        updated[index] = { ...updated[index], [field]: value };
        setFormData((prev) => ({ ...prev, tokenEntries: updated }));
    };

    const handleOpenSummary = (e: FormEvent) => {
        e.preventDefault();
        setShowSummary(true);
    };

const [isSaving, setIsSaving] = useState(false);
    const handleConfirmSave = async () => {

        if (isSaving) return;
        setIsSaving(true);
        const apiUrl = "http://localhost:8000/api/admin-database"; // change to your domain late.r
         
        const form = new FormData();

        // Normal text & number fields
        form.append("srNo", formData.srNo);
        form.append("date", formData.date);
        form.append("pan", formData.pan);
        form.append("aadhar", formData.aadhar);
        form.append("phone", formData.phone);
        form.append("email", formData.email);

        form.append("investmentAs", formData.investmentAs);
        form.append("panTanNo", formData.panTanNo);
        form.append("aadharNo", formData.aadharNo);
        form.append("gstNo", formData.gstNo);

        form.append("investmentValue", formData.investmentValue);
        form.append("investmentDate", formData.investmentDate);
        form.append("finalRefNo", formData.finalRefNo);

        form.append("rentAccountNumber", formData.rentAccountNumber);
        form.append("rentIfsc", formData.rentIfsc);
        form.append("rentBankName", formData.rentBankName);
        form.append("rentBranch", formData.rentBranch);

        form.append("firstRentDate", formData.firstRentDate);
        form.append("nextRentDate", formData.nextRentDate);
        form.append("lastRentDate", formData.lastRentDate);

        form.append("vehicleTrackingUrl", formData.vehicleTrackingUrl);
        form.append("courierTrackingNumber", formData.courierTrackingNumber);

        // Token entries array
        formData.tokenEntries.forEach((t, index) => {
            form.append(`tokenEntries[${index}][amount]`, t.amount);
            form.append(`tokenEntries[${index}][date]`, t.date);
            form.append(`tokenEntries[${index}][payment_method]`, t.payment_method);
            form.append(`tokenEntries[${index}][utr]`, t.utr);
        });

        // File uploads
        if (formData.panTanDoc) form.append("panTanDoc", formData.panTanDoc);
        if (formData.aadharDoc) form.append("aadharDoc", formData.aadharDoc);
        if (formData.gstDoc) form.append("gstDoc", formData.gstDoc);
        if (formData.cancelledChequeDoc) form.append("cancelledChequeDoc", formData.cancelledChequeDoc);
        if (formData.notaryAgreementDoc) form.append("notaryAgreementDoc", formData.notaryAgreementDoc);
        if (formData.stampPaperDoc) form.append("stampPaperDoc", formData.stampPaperDoc);
        if (formData.invoiceDoc) form.append("invoiceDoc", formData.invoiceDoc);
        if (formData.courierTrackingDoc) form.append("courierTrackingDoc", formData.courierTrackingDoc);
        if (formData.latestRentReceiptDoc) form.append("latestRentReceiptDoc", formData.latestRentReceiptDoc);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
  },
                body: form
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                alert("Upload failed");
                return;
            }

            alert("Investment saved successfully");
            console.log(data);
            setFormData({
                // Section 1
                srNo: "",
                date: "",
                pan: "",
                aadhar: "",
                phone: "",
                email: "",

                // Section 2
                investmentAs: "",
                panTanNo: "",
                panTanDoc: null,
                aadharNo: "",
                aadharDoc: null,
                gstNo: "",
                gstDoc: null,
                investmentValue: "",
                investmentDate: "",
                finalRefNo: "",
                tokenEntries: [{ amount: "",payment_method:"", date: "", utr: "" }],
                cancelledChequeDoc: null,
                rentAccountNumber: "",
                rentIfsc: "",
                rentBankName: "",
                rentBranch: "",

                // Section 3
                notaryAgreementDoc: null,
                stampPaperDoc: null,
                invoiceDoc: null,
                courierTrackingNumber: "",
                courierTrackingDoc: null,

                // Section 4
                firstRentDate: "",
                nextRentDate: "",
                lastRentDate: "",
                latestRentReceiptDoc: null,

                // Section 5
                vehicleTrackingUrl: "",
            });
            setShowSummary(false);
            navigate('/admin/dashboard');   

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8000/api/admin-database"; // change to your domain later

    const form = new FormData();

    // Normal text & number fields
    form.append("srNo", formData.srNo);
    form.append("date", formData.date);
    form.append("pan", formData.pan);
    form.append("aadhar", formData.aadhar);
    form.append("phone", formData.phone);
    form.append("email", formData.email);

    form.append("investmentAs", formData.investmentAs);
    form.append("panTanNo", formData.panTanNo);
    form.append("aadharNo", formData.aadharNo);
    form.append("gstNo", formData.gstNo);

    form.append("investmentValue", formData.investmentValue);
    form.append("investmentDate", formData.investmentDate);
    form.append("finalRefNo", formData.finalRefNo);

    form.append("rentAccountNumber", formData.rentAccountNumber);
    form.append("rentIfsc", formData.rentIfsc);
    form.append("rentBankName", formData.rentBankName);
    form.append("rentBranch", formData.rentBranch);

    form.append("firstRentDate", formData.firstRentDate);
    form.append("nextRentDate", formData.nextRentDate);
    form.append("lastRentDate", formData.lastRentDate);

    form.append("vehicleTrackingUrl", formData.vehicleTrackingUrl);
    form.append("courierTrackingNumber", formData.courierTrackingNumber);

    // Token entries array
    formData.tokenEntries.forEach((t, index) => {
        form.append(`tokenEntries[${index}][amount]`, t.amount);
        form.append(`tokenEntries[${index}][date]`, t.date);
        form.append(`tokenEntries[${index}][utr]`, t.utr);
        form.append(`tokenEntries[${index}][payment_method]`, t.payment_method);
    });

    // File uploads
    if (formData.panTanDoc) form.append("panTanDoc", formData.panTanDoc);
    if (formData.aadharDoc) form.append("aadharDoc", formData.aadharDoc);
    if (formData.gstDoc) form.append("gstDoc", formData.gstDoc);
    if (formData.cancelledChequeDoc) form.append("cancelledChequeDoc", formData.cancelledChequeDoc);
    if (formData.notaryAgreementDoc) form.append("notaryAgreementDoc", formData.notaryAgreementDoc);
    if (formData.stampPaperDoc) form.append("stampPaperDoc", formData.stampPaperDoc);
    if (formData.invoiceDoc) form.append("invoiceDoc", formData.invoiceDoc);
    if (formData.courierTrackingDoc) form.append("courierTrackingDoc", formData.courierTrackingDoc);
    if (formData.latestRentReceiptDoc) form.append("latestRentReceiptDoc", formData.latestRentReceiptDoc);

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
    'Accept': 'application/json',
            },
            credentials: 'include',
            body: form
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            alert("Upload failed");
            return;
        }

        alert("Investment saved successfully");
        console.log(data);

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
};



    return (
        <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col">

                
                <div className="flex items-center justify-between px-10 py-6 border-b border-slate-50 bg-white">
                   
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="text-white w-5 h-5" />
                        </div>
                        
                        <div>
                            <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                                Investment Registry
                            </h1>
                        </div>
                    </div>
                     <Link 
                            to="/admin/dashboard"
                            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg hover:bg-indigo-700 transition-all">
                              <Undo2 size={16} /> Back to Dashboard
                            </Link>
                </div>

                {showSummary && (
                    <SummaryModal
                        data={formData}
                        onConfirm={handleConfirmSave}
                        onCancel={() => setShowSummary(false)}
                    />
                )}

                <form onSubmit={handleOpenSummary} className="p-8 lg:p-12 space-y-12">
                    {/* SECTION 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">
                                1. Basic Details
                            </h2>
                            <p className="text-xs text-slate-400 font-medium">
                                Identification and primary contact details.
                            </p>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Sr. No.
                                    </label>
                                    <input
                                        name="srNo"
                                        type="text"
                                        placeholder="001"
                                        value={formData.srNo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-bold"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Date
                                    </label>
                                    <input
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        PAN
                                    </label>
                                    <input
                                        name="pan"
                                        type="text"
                                        placeholder="ABCDE1234F"
                                        value={formData.pan}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold tracking-wider"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Aadhar
                                    </label>
                                    <input
                                        name="aadhar"
                                        type="text"
                                        placeholder="XXXX-XXXX-XXXX"
                                        value={formData.aadhar}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Phone No.
                                    </label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 00000 00000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="client@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">
                                2. Investment Details
                            </h2>
                            <p className="text-xs text-slate-400 font-medium">
                                Investment mode, supporting documents and payment breakup.
                            </p>
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            {/* Investment As */}
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-2 block">
                                    Investment As
                                </label>
                                <input
                                        name="investmentAs"
                                        type="text"
                                        placeholder="Full name "
                                        value={formData.investmentAs}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                
                                
                           
                            </div>

                            {/* PAN/TAN + Aadhar + GST + Uploads */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* PAN/TAN */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        PAN/TAN
                                    </label>
                                    <input
                                        name="panTanNo"
                                        type="text"
                                        value={formData.panTanNo}
                                        onChange={handleChange}
                                        placeholder="ABCDE1234F"
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                    <input
                                        id="panTanDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("panTanDoc")}
                                    />
                                    <label
                                        htmlFor="panTanDoc"
                                        className="mt-2 w-full px-4 py-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.panTanDoc
                                                ? formData.panTanDoc.name
                                                : "Upload PAN/TAN Doc"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>

                                {/* Aadhar */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Aadhar
                                    </label>
                                    <input
                                        name="aadharNo"
                                        type="text"
                                        value={formData.aadharNo}
                                        onChange={handleChange}
                                        placeholder="XXXX-XXXX-XXXX"
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                    <input
                                        id="aadharDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("aadharDoc")}
                                    />
                                    <label
                                        htmlFor="aadharDoc"
                                        className="mt-2 w-full px-4 py-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.aadharDoc
                                                ? formData.aadharDoc.name
                                                : "Upload Aadhar Doc"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>

                                {/* GST */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        GST
                                    </label>
                                    <input
                                        name="gstNo"
                                        type="text"
                                        value={formData.gstNo}
                                        onChange={handleChange}
                                        placeholder="22AAAAA0000A1Z5"
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                    <input
                                        id="gstDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("gstDoc")}
                                    />
                                    <label
                                        htmlFor="gstDoc"
                                        className="mt-2 w-full px-4 py-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.gstDoc
                                                ? formData.gstDoc.name
                                                : "Upload GST Doc"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                            </div>

                            {/* Investment value / dates / ref */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Investment Value
                                    </label>
                                    <input
                                        name="investmentValue"
                                        type="number"
                                        placeholder="₹ 0.00"
                                        value={formData.investmentValue}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-black text-indigo-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Date of Investment
                                    </label>
                                    <input
                                        name="investmentDate"
                                        type="date"
                                        value={formData.investmentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Final Ref No.
                                    </label>
                                    <input
                                        name="finalRefNo"
                                        type="text"
                                        placeholder="Final UTR / Ref No."
                                        value={formData.finalRefNo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold tracking-wider"
                                    />
                                </div>
                            </div>

                            {/* Token payments */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                                        Token Amounts / Partial Payments
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addTokenEntry}
                                        className="flex items-center gap-1 text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all"
                                    >
                                        <Plus size={14} /> Add Payment Entry
                                    </button>
                                </div>
                                {formData.tokenEntries.map((entry, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-10 gap-3 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100"
                                    >
                                        <div className="md:col-span-4">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                                Token Amount
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="₹ Amount"
                                                value={entry.amount}
                                                onChange={(e) =>
                                                    handleTokenChange(index, "amount", e.target.value)
                                                }
                                                className="w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-bold"
                                            />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                value={entry.date}
                                                onChange={(e) =>
                                                    handleTokenChange(index, "date", e.target.value)
                                                }
                                                className="w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold"
                                            />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                                UTR / Ref No.
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="UTR / Ref"
                                                value={entry.utr}
                                                onChange={(e) =>
                                                    handleTokenChange(index, "utr", e.target.value)
                                                }
                                                className="w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold"
                                            />
                                        </div>
                                        <div className="md:col-span-4">
                                                <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                                    Payment Method
                                                </label>

                                                <select
                                                    value={entry.payment_method || ""}
                                                    onChange={(e) =>
                                                    handleTokenChange(index, "payment_method", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold"
                                                >
                                                    <option value="">Select Payment Method</option>
                                                    <option value="upi">UPI</option>
                                                    <option value="bank_transfer">Bank Transfer</option>
                                                    <option value="cash">Cash</option>
                                                    <option value="cheque">Cheque</option>
                                                </select>
                                            </div>
                                        
                                        <div className="md:col-span-1 flex justify-center pb-1">
                                            {formData.tokenEntries.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTokenEntry(index)}
                                                    className="p-2 text-rose-400 hover:text-rose-600 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cancelled Cheque + Bank details */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Cancelled Cheque
                                    </label>
                                    <input
                                        id="cancelledChequeDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("cancelledChequeDoc")}
                                    />
                                    <label
                                        htmlFor="cancelledChequeDoc"
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.cancelledChequeDoc
                                                ? formData.cancelledChequeDoc.name
                                                : "Upload Cancelled Cheque"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Rent A/C Number
                                    </label>
                                    <input
                                        name="rentAccountNumber"
                                        type="text"
                                        value={formData.rentAccountNumber}
                                        onChange={handleChange}
                                        placeholder="0000000000"
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-bold tracking-wider"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        IFSC
                                    </label>
                                    <input
                                        name="rentIfsc"
                                        type="text"
                                        value={formData.rentIfsc}
                                        onChange={handleChange}
                                        placeholder="SBIN0000000"
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-bold uppercase"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Bank Name
                                    </label>
                                    <input
                                        name="rentBankName"
                                        type="text"
                                        value={formData.rentBankName}
                                        onChange={handleChange}
                                        placeholder="Bank Name"
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Branch
                                    </label>
                                    <input
                                        name="rentBranch"
                                        type="text"
                                        value={formData.rentBranch}
                                        onChange={handleChange}
                                        placeholder="Branch Name"
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">
                                3. Legal & Courier
                            </h2>
                            <p className="text-xs text-slate-400 font-medium">
                                Agreements, invoices and courier tracking.
                            </p>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Notary */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Notary Agreement
                                    </label>
                                    <input
                                        id="notaryAgreementDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("notaryAgreementDoc")}
                                    />
                                    <label
                                        htmlFor="notaryAgreementDoc"
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.notaryAgreementDoc
                                                ? formData.notaryAgreementDoc.name
                                                : "Upload Notary Agreement"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>

                                {/* Stamp paper */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Stamp Paper
                                    </label>
                                    <input
                                        id="stampPaperDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("stampPaperDoc")}
                                    />
                                    <label
                                        htmlFor="stampPaperDoc"
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.stampPaperDoc
                                                ? formData.stampPaperDoc.name
                                                : "Upload Stamp Paper"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Invoice */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Invoice
                                    </label>
                                    <input
                                        id="invoiceDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("invoiceDoc")}
                                    />
                                    <label
                                        htmlFor="invoiceDoc"
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.invoiceDoc
                                                ? formData.invoiceDoc.name
                                                : "Upload Invoice"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>

                                {/* Courier + doc */}
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Courier Tracking Number
                                    </label>
                                    <div className="relative mb-2">
                                        <input
                                            name="courierTrackingNumber"
                                            type="text"
                                            placeholder="Tracking Number"
                                            value={formData.courierTrackingNumber}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl outline-none font-semibold pl-12"
                                        />
                                        <Truck
                                            size={18}
                                            className="absolute left-4 top-4 text-slate-300"
                                        />
                                    </div>
                                    <input
                                        id="courierTrackingDoc"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange("courierTrackingDoc")}
                                    />
                                    <label
                                        htmlFor="courierTrackingDoc"
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                    >
                                        <span className="truncate">
                                            {formData.courierTrackingDoc
                                                ? formData.courierTrackingDoc.name
                                                : "Upload Courier Doc"}
                                        </span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">
                                4. Rent Schedule
                            </h2>
                            <p className="text-xs text-slate-400 font-medium">
                                Payout dates and latest rent receipt.
                            </p>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        First Rent Date
                                    </label>
                                    <input
                                        name="firstRentDate"
                                        type="date"
                                        value={formData.firstRentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Next Rent Date
                                    </label>
                                    <input
                                        name="nextRentDate"
                                        type="date"
                                        value={formData.nextRentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-indigo-50 rounded-2xl outline-none font-bold text-indigo-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Last Rent Date
                                    </label>
                                    <input
                                        name="lastRentDate"
                                        type="date"
                                        value={formData.lastRentDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                    Latest Rent Receipt
                                </label>
                                <input
                                    id="latestRentReceiptDoc"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange("latestRentReceiptDoc")}
                                />
                                <label
                                    htmlFor="latestRentReceiptDoc"
                                    className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500"
                                >
                                    <span className="truncate">
                                        {formData.latestRentReceiptDoc
                                            ? formData.latestRentReceiptDoc.name
                                            : "Upload Latest Rent Receipt"}
                                    </span>
                                    <Upload size={16} className="text-indigo-500" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">
                                5. Vehicle Allocation
                            </h2>
                            <p className="text-xs text-slate-400 font-medium">
                                Share the live tracking URL with the investor.
                            </p>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                    Vehicle Tracking URL
                                </label>
                                <div className="relative">
                                    <input
                                        name="vehicleTrackingUrl"
                                        type="url"
                                        placeholder="https://tracking.example.com/id"
                                        value={formData.vehicleTrackingUrl}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl outline-none font-semibold pl-12 text-indigo-500 underline"
                                    />
                                    <Car
                                        size={18}
                                        className="absolute left-4 top-4 text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                        
                            className={`px-12 py-5 rounded-3xl font-black text-sm flex items-center gap-3 transition-all ${
                                
                                    "bg-indigo-600 text-white hover:scale-[1.03] shadow-xl shadow-indigo-200"
                                    
                            }`}
                        >
                            Save Record Entry <ChevronRight size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );  
};

export default InvestmentRegistryForm;