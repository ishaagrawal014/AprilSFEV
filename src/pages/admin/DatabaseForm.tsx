import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
    ChevronRight,
    Plus,
    Trash2,
    Upload,
    Car,
    Truck,
    Building2,
    Lock, Eye, EyeOff, FileCheck, X, Undo2, Loader2, UserPlus
} from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = "https://speedforceev.in/api";

// ─────────────────────────────────────────────────────────────────
// TOKEN HELPERS
// ─────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('admin_token') ?? '';
const saveToken = (token: string) => localStorage.setItem('admin_token', token);
const clearToken = () => localStorage.removeItem('admin_token');

// ─────────────────────────────────────────────────────────────────
// VALIDATION REGEXES
// ─────────────────────────────────────────────────────────────────
const PAN_REGEX    = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const AADHAR_REGEX = /^\d{4}[-\s]?\d{4}[-\s]?\d{4}$/;
const PHONE_REGEX  = /^[6-9]\d{9}$/;
const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IFSC_REGEX   = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const GST_REGEX    = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const URL_REGEX    = /^https?:\/\/.+/;

// ─────────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────────
interface TokenEntry {
    amount: string;
    date: string;
    utr: string;
    payment_method: string;
}

interface BankTransaction {
    amount: string;
    method: string;
    date: string;
    doc: File | null;
}

interface OtherDocEntry {
    label: string;
    file: File | null;
}

interface FormData {
    srNo: string;
    date: string;
    pan: string;
    aadhar: string;
    phone: string;
    email: string;
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
    bankTransactions: BankTransaction[];
    cancelledChequeDoc: File | null;
    rentAccountNumber: string;
    rentIfsc: string;
    rentBankName: string;
    rentBranch: string;
    notaryAgreementDoc: File | null;
    stampPaperDoc: File | null;
    invoiceDoc: File | null;
    courierTrackingNumber: string;
    courierTrackingDoc: File | null;
    otherDocs: OtherDocEntry[];
    firstRentDate: string;
    nextRentDate: string;
    lastRentDate: string;
    latestRentReceiptDoc: File | null;
    vehicleTrackingUrl: string;
    noOfVehicles: string;
    totalRentAmount: string;
    nextRentAfterTds: string;
    // Nominee Fields
    nomineeName: string;
    nomineeRelation: string;
    nomineePan: string;
    nomineeAadhar: string;
    nomineePanDoc: File | null;
    nomineeAadharDoc: File | null;
}

type Errors = Record<string, string>;

// ─────────────────────────────────────────────────────────────────
// VALIDATE FUNCTION
// ─────────────────────────────────────────────────────────────────
function validateForm(formData: FormData): Errors {
    const errors: Errors = {};

    if (!formData.srNo?.trim())
        errors.srNo = "Serial number is required.";
    if (!formData.date)
        errors.date = "Date is required.";
    if (!formData.pan?.trim())
        errors.pan = "PAN is required.";
    else if (!PAN_REGEX.test(formData.pan.trim().toUpperCase()))
        errors.pan = "Invalid PAN format (e.g. ABCDE1234F).";
    if (formData.aadhar?.trim() && !AADHAR_REGEX.test(formData.aadhar.trim()))
        errors.aadhar = "Invalid Aadhar — must be 12 digits.";
    if (!formData.phone?.trim())
        errors.phone = "Phone number is required.";
    else if (!PHONE_REGEX.test(formData.phone.replace(/\D/g, "")))
        errors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!formData.email?.trim())
        errors.email = "Email is required.";
    else if (!EMAIL_REGEX.test(formData.email.trim()))
        errors.email = "Enter a valid email address.";

    if (!formData.investmentAs?.trim())
        errors.investmentAs = "Investment name is required.";
    if (!formData.panTanNo?.trim())
        errors.panTanNo = "PAN/TAN number is required.";
    else if (!PAN_REGEX.test(formData.panTanNo.trim().toUpperCase()))
        errors.panTanNo = "Invalid PAN/TAN format (e.g. ABCDE1234F).";
    if (formData.aadharNo?.trim() && !AADHAR_REGEX.test(formData.aadharNo.trim()))
        errors.aadharNo = "Invalid Aadhar — must be 12 digits.";
    if (formData.gstNo?.trim() && !GST_REGEX.test(formData.gstNo.trim().toUpperCase()))
        errors.gstNo = "Invalid GST number format.";
    if (!formData.investmentValue || Number(formData.investmentValue) <= 0)
        errors.investmentValue = "Investment value must be greater than ₹0.";
    if (!formData.investmentDate)
        errors.investmentDate = "Date of investment is required.";
    if (!formData.finalRefNo?.trim())
        errors.finalRefNo = "Final UTR / Ref number is required.";

    const filledTokens = formData.tokenEntries.filter(e => e.amount || e.date || e.utr);
    if (filledTokens.length === 0) {
        errors.tokenEntries = "Add at least one token / partial payment entry.";
    } else {
        formData.tokenEntries.forEach((entry, i) => {
            if (!entry.amount || Number(entry.amount) <= 0)
                errors[`token_amount_${i}`] = `Payment #${i + 1}: amount required.`;
            if (!entry.date)
                errors[`token_date_${i}`] = `Payment #${i + 1}: date required.`;
            if (!entry.utr?.trim())
                errors[`token_utr_${i}`] = `Payment #${i + 1}: UTR / Ref required.`;
            if (!entry.payment_method)
                errors[`token_method_${i}`] = `Payment #${i + 1}: payment method required.`;
        });
    }

    if (!formData.rentAccountNumber?.trim())
        errors.rentAccountNumber = "Rent account number is required.";
    if (!formData.rentIfsc?.trim())
        errors.rentIfsc = "IFSC code is required.";
    else if (!IFSC_REGEX.test(formData.rentIfsc.trim().toUpperCase()))
        errors.rentIfsc = "Invalid IFSC format (e.g. SBIN0000000).";
    if (!formData.rentBankName?.trim())
        errors.rentBankName = "Bank name is required.";
    if (!formData.rentBranch?.trim())
        errors.rentBranch = "Branch name is required.";

    if (!formData.notaryAgreementDoc)
        errors.notaryAgreementDoc = "Notary agreement document is required.";
    if (!formData.stampPaperDoc)
        errors.stampPaperDoc = "Stamp paper document is required.";
    if (!formData.invoiceDoc)
        errors.invoiceDoc = "Invoice document is required.";
    if (!formData.courierTrackingNumber?.trim())
        errors.courierTrackingNumber = "Courier tracking number is required.";

    if (!formData.firstRentDate)
        errors.firstRentDate = "First rent date is required.";
    if (!formData.nextRentDate)
        errors.nextRentDate = "Next rent date is required.";
    else if (formData.firstRentDate && formData.nextRentDate < formData.firstRentDate)
        errors.nextRentDate = "Cannot be before first rent date.";
    if (!formData.lastRentDate)
        errors.lastRentDate = "Last rent date is required.";
    else if (formData.nextRentDate && formData.lastRentDate < formData.nextRentDate)
        errors.lastRentDate = "Cannot be before next rent date.";

    if (formData.vehicleTrackingUrl?.trim() && !URL_REGEX.test(formData.vehicleTrackingUrl.trim()))
        errors.vehicleTrackingUrl = "Enter a valid URL starting with http:// or https://.";

    if (!formData.noOfVehicles || Number(formData.noOfVehicles) < 1)
        errors.noOfVehicles = "At least 1 vehicle is required.";

    // Nominee validation (optional section, but if name entered, validate others)
    if (formData.nomineeName?.trim()) {
        if (!formData.nomineeRelation)
            errors.nomineeRelation = "Relation is required if nominee is provided.";
        if (formData.nomineePan?.trim() && !PAN_REGEX.test(formData.nomineePan.trim().toUpperCase()))
            errors.nomineePan = "Invalid PAN format (e.g. ABCDE1234F).";
        if (formData.nomineeAadhar?.trim() && !AADHAR_REGEX.test(formData.nomineeAadhar.trim()))
            errors.nomineeAadhar = "Invalid Aadhar — must be 12 digits.";
    }

    return errors;
}

// ─────────────────────────────────────────────────────────────────
// FIELD ERROR COMPONENT
// ─────────────────────────────────────────────────────────────────
const FieldError = ({ name, errors }: { name: string; errors: Errors }) =>
    errors[name] ? (
        <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1 flex items-center gap-1">
            <span className="text-rose-400">⚠</span> {errors[name]}
        </p>
    ) : null;

const inputCls = (base: string, hasError: boolean) =>
    `${base} ${hasError ? "ring-2 ring-rose-400 bg-rose-50" : ""}`;

const fileLabelCls = (base: string, hasError: boolean) =>
    `${base} ${hasError ? "ring-2 ring-rose-400 bg-rose-50 border-rose-300" : ""}`;

// ─────────────────────────────────────────────────────────────────
// BLANK FORM STATE
// ─────────────────────────────────────────────────────────────────
const blankForm: FormData = {
    srNo: "", date: "", pan: "", aadhar: "", phone: "", email: "",
    investmentAs: "", panTanNo: "", panTanDoc: null,
    aadharNo: "", aadharDoc: null, gstNo: "", gstDoc: null,
    investmentValue: "", investmentDate: "", finalRefNo: "",
    tokenEntries: [{ amount: "", payment_method: "", date: "", utr: "" }],
    bankTransactions: [{ amount: "", method: "", date: "", doc: null }],
    cancelledChequeDoc: null, rentAccountNumber: "", rentIfsc: "",
    rentBankName: "", rentBranch: "",
    notaryAgreementDoc: null, stampPaperDoc: null, invoiceDoc: null,
    courierTrackingNumber: "", courierTrackingDoc: null,
    otherDocs: [{ label: "", file: null }],
    firstRentDate: "", nextRentDate: "", lastRentDate: "",
    latestRentReceiptDoc: null, vehicleTrackingUrl: "",
    noOfVehicles: "1",
    totalRentAmount: "2200",
    nextRentAfterTds: "2156",
    nomineeName: "", nomineeRelation: "", nomineePan: "", nomineeAadhar: "",
    nomineePanDoc: null, nomineeAadharDoc: null,
};

// ─────────────────────────────────────────────────────────────────
// SUMMARY MODAL
// ─────────────────────────────────────────────────────────────────
const SummaryModal = ({ data, onConfirm, onCancel, isSaving }: {
    data: FormData;
    onConfirm: () => void;
    onCancel: () => void;
    isSaving: boolean;
}) => {
    const DataRow = ({ label, value, isFile, isUrl }: { label: string; value: string | File | null; isFile?: boolean; isUrl?: boolean }) => (
        <div className="py-2 border-b border-slate-50 last:border-0 min-h-[50px] flex flex-col justify-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            {isFile ? (
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold truncate">
                    {value && value instanceof File
                        ? <><FileCheck size={14} className="text-emerald-500 shrink-0" /> {value.name}</>
                        : <span className="text-slate-300">Not Uploaded</span>}
                </div>
            ) : isUrl ? (
                <a href={typeof value === 'string' ? value : '#'} target="_blank" rel="noreferrer"
                    className="text-indigo-600 text-xs font-bold underline truncate block">
                    {typeof value === 'string' ? value : '—'}
                </a>
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
                <div className="px-8 py-6 border-b flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase">Review Record Details</h3>
                        <p className="text-xs font-bold text-slate-400">Please verify all fields before saving.</p>
                    </div>
                    <button onClick={onCancel} className="p-3 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
                </div>
                <div className="p-8 overflow-y-auto flex-1 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="1. Identity & Contact" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="Sr No" value={data.srNo} />
                                    <DataRow label="Date" value={data.date} />
                                    <DataRow label="PAN" value={data.pan} />
                                    <DataRow label="Aadhar" value={data.aadhar} />
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
                            <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                                <SectionHeader title="Vehicle & Rent" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="No. of Vehicles" value={data.noOfVehicles} />
                                    <DataRow label="Total Rent" value={`₹ ${data.totalRentAmount}`} />
                                    <DataRow label="After TDS (2%)" value={`₹ ${data.nextRentAfterTds}`} />
                                </div>
                            </div>
                            {/* Nominee summary */}
                            {data.nomineeName && (
                                <div className="bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
                                    <SectionHeader title="Nominee" />
                                    <div className="grid grid-cols-2 gap-x-4">
                                        <DataRow label="Name" value={data.nomineeName} />
                                        <DataRow label="Relation" value={data.nomineeRelation} />
                                        <DataRow label="PAN" value={data.nomineePan} />
                                        <DataRow label="Aadhar" value={data.nomineeAadhar} />
                                    </div>
                                </div>
                            )}
                        </div>
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
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">{t.payment_method.replace('_', ' ')}</p>
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
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="5. Bank Transactions" />
                                {data.bankTransactions.length > 0 && data.bankTransactions[0].amount ? (
                                    <div className="space-y-3">
                                        {data.bankTransactions.map((tx, i) => (
                                            <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400">{tx.date || 'No Date'}</p>
                                                        <p className="text-xs font-black text-slate-700">₹ {tx.amount || '0'}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase">{tx.method}</p>
                                                    </div>
                                                    {tx.doc && (
                                                        <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
                                                            <FileCheck size={12} /> Doc
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-400 font-bold italic">No bank transactions added.</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="6. Document Checklist" />
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
                                    {data.nomineeName && <>
                                        <DataRow label="Nominee PAN" value={data.nomineePanDoc} isFile />
                                        <DataRow label="Nominee Aadhar" value={data.nomineeAadharDoc} isFile />
                                    </>}
                                </div>
                            </div>
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="7. Logistics & Schedule" />
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
                <div className="p-6 border-t flex gap-4 bg-slate-50">
                    <button onClick={onCancel} disabled={isSaving}
                        className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all disabled:opacity-50">
                        Back to Edit
                    </button>
                    <button onClick={onConfirm} disabled={isSaving}
                        className="flex-[2] py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSaving
                            ? <><Loader2 size={18} className="animate-spin" /> Saving...</>
                            : <><FileCheck size={18} /> Confirm & Save Database</>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────
// LOGIN COMPONENT
// ─────────────────────────────────────────────────────────────────
const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok || !data.token) {
                setError(data.message ?? 'Invalid credentials. Please try again.');
                return;
            }
            saveToken(data.token);
            onLogin();
        } catch {
            setError('Server error. Please check your connection.');
        } finally {
            setLoading(false);
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
                    <input type="email" required placeholder="admin@gmail.com"
                        className="w-full px-6 py-5 bg-slate-50 rounded-2xl outline-none font-bold"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="relative">
                        <input type={showPass ? "text" : "password"} required placeholder="••••••••"
                            className="w-full px-6 py-5 bg-slate-50 rounded-2xl outline-none font-bold"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {error && <p className="text-rose-500 text-xs font-black text-center uppercase">{error}</p>}
                    <button type="submit" disabled={loading}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? <><Loader2 size={18} className="animate-spin" /> Logging in...</> : 'Unlock Registry'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────
// MAIN FORM COMPONENT
// ─────────────────────────────────────────────────────────────────
const InvestmentRegistryForm: React.FC = () => {
    const [showSummary, setShowSummary] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({ ...blankForm });

    // ── Auto-calculate rent when noOfVehicles changes ────────────
    useEffect(() => {
        const count = parseInt(formData.noOfVehicles) || 0;
        const total = count * 2200;
        const afterTds = Math.round(total - total * 0.02);
        setFormData(prev => ({
            ...prev,
            totalRentAmount: total.toString(),
            nextRentAfterTds: afterTds.toString(),
        }));
    }, [formData.noOfVehicles]);

    // ── Shared Handlers ──────────────────────────────────────────
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    };

    const handleFileChange = (name: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData(prev => ({ ...prev, [name]: file }));
        if (errors[name as string]) setErrors(prev => { const n = { ...prev }; delete n[name as string]; return n; });
    };

    const handleIncrement = () => setFormData(prev => ({ ...prev, noOfVehicles: (parseInt(prev.noOfVehicles) + 1).toString() }));
    const handleDecrement = () => {
        const val = parseInt(formData.noOfVehicles);
        if (val > 1) setFormData(prev => ({ ...prev, noOfVehicles: (val - 1).toString() }));
    };

    // ── Token Entry Handlers ─────────────────────────────────────
    const addTokenEntry = () => setFormData(prev => ({
        ...prev,
        tokenEntries: [...prev.tokenEntries, { amount: "", payment_method: "", date: "", utr: "" }],
    }));
    const removeTokenEntry = (index: number) => {
        const updated = [...formData.tokenEntries];
        updated.splice(index, 1);
        setFormData(prev => ({ ...prev, tokenEntries: updated }));
    };
    const handleTokenChange = (index: number, field: keyof TokenEntry, value: string) => {
        const updated = [...formData.tokenEntries];
        updated[index] = { ...updated[index], [field]: value };
        setFormData(prev => ({ ...prev, tokenEntries: updated }));
        const key = `token_${field}_${index}`;
        if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
    };

    // ── Bank Transaction Handlers ────────────────────────────────
    const addBankTx = () => setFormData(prev => ({
        ...prev,
        bankTransactions: [...prev.bankTransactions, { amount: "", method: "", date: "", doc: null }],
    }));
    const removeBankTx = (index: number) => {
        const updated = [...formData.bankTransactions];
        updated.splice(index, 1);
        setFormData(prev => ({ ...prev, bankTransactions: updated }));
    };
    const handleBankTxChange = (index: number, field: keyof BankTransaction, value: string | File | null) => {
        const updated = [...formData.bankTransactions];
        updated[index] = { ...updated[index], [field]: value } as BankTransaction;
        setFormData(prev => ({ ...prev, bankTransactions: updated }));
    };

    // ── Other Docs Handlers ──────────────────────────────────────
    const addOtherDoc = () => setFormData(prev => ({
        ...prev,
        otherDocs: [...prev.otherDocs, { label: "", file: null }],
    }));
    const removeOtherDoc = (index: number) => {
        const updated = [...formData.otherDocs];
        updated.splice(index, 1);
        setFormData(prev => ({ ...prev, otherDocs: updated }));
    };
    const handleOtherDocChange = (index: number, field: keyof OtherDocEntry, value: string | File | null) => {
        const updated = [...formData.otherDocs];
        updated[index] = { ...updated[index], [field]: value } as OtherDocEntry;
        setFormData(prev => ({ ...prev, otherDocs: updated }));
    };

    // ── Submit → Validate → Open Summary ─────────────────────────
    const handleOpenSummary = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstKey = Object.keys(validationErrors)[0];
            const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }
        setErrors({});
        setShowSummary(true);
    };

    // ── Confirm Save ─────────────────────────────────────────────
    const handleConfirmSave = async () => {
        if (isSaving) return;
        setIsSaving(true);

        const form = new window.FormData();

        const scalars: Array<[string, string]> = [
            ["srNo", formData.srNo], ["date", formData.date], ["pan", formData.pan],
            ["aadhar", formData.aadhar], ["phone", formData.phone], ["email", formData.email],
            ["investmentAs", formData.investmentAs], ["panTanNo", formData.panTanNo],
            ["aadharNo", formData.aadharNo], ["gstNo", formData.gstNo],
            ["investmentValue", formData.investmentValue], ["investmentDate", formData.investmentDate],
            ["finalRefNo", formData.finalRefNo], ["rentAccountNumber", formData.rentAccountNumber],
            ["rentIfsc", formData.rentIfsc], ["rentBankName", formData.rentBankName],
            ["rentBranch", formData.rentBranch], ["firstRentDate", formData.firstRentDate],
            ["nextRentDate", formData.nextRentDate], ["lastRentDate", formData.lastRentDate],
            ["vehicleTrackingUrl", formData.vehicleTrackingUrl],
            ["courierTrackingNumber", formData.courierTrackingNumber],
            ["noOfVehicles", formData.noOfVehicles],
            ["totalRentAmount", formData.totalRentAmount],
            ["nextRentAfterTds", formData.nextRentAfterTds],
            // Nominee
            ["nomineeName", formData.nomineeName],
            ["nomineeRelation", formData.nomineeRelation],
            ["nomineePan", formData.nomineePan],
            ["nomineeAadhar", formData.nomineeAadhar],
        ];
        scalars.forEach(([k, v]) => form.append(k, v));

        // Token entries
        formData.tokenEntries.forEach((t, i) => {
            form.append(`tokenEntries[${i}][amount]`, t.amount);
            form.append(`tokenEntries[${i}][date]`, t.date);
            form.append(`tokenEntries[${i}][payment_method]`, t.payment_method);
            form.append(`tokenEntries[${i}][utr]`, t.utr);
        });

        // Bank transactions
        formData.bankTransactions.forEach((tx, i) => {
            form.append(`bankTransactions[${i}][amount]`, tx.amount);
            form.append(`bankTransactions[${i}][method]`, tx.method);
            form.append(`bankTransactions[${i}][date]`, tx.date);
            if (tx.doc) form.append(`bankTransactions[${i}][doc]`, tx.doc);
        });

        // Other docs
        formData.otherDocs.forEach((doc, i) => {
            form.append(`otherDocs[${i}][label]`, doc.label);
            if (doc.file) form.append(`otherDocs[${i}][file]`, doc.file);
        });

        // File fields
        const files: Array<[string, File | null]> = [
            ["panTanDoc", formData.panTanDoc], ["aadharDoc", formData.aadharDoc],
            ["gstDoc", formData.gstDoc], ["cancelledChequeDoc", formData.cancelledChequeDoc],
            ["notaryAgreementDoc", formData.notaryAgreementDoc],
            ["stampPaperDoc", formData.stampPaperDoc], ["invoiceDoc", formData.invoiceDoc],
            ["courierTrackingDoc", formData.courierTrackingDoc],
            ["latestRentReceiptDoc", formData.latestRentReceiptDoc],
            ["nomineePanDoc", formData.nomineePanDoc],
            ["nomineeAadharDoc", formData.nomineeAadharDoc],
        ];
        files.forEach(([k, f]) => { if (f) form.append(k, f); });

        try {
            const response = await fetch(`${API_BASE}/admin-database`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: form,
            });

            const data = await response.json();

            if (response.status === 401) {
                clearToken();
                alert("Session expired. Please log in again.");
                navigate('/admin/login');
                return;
            }

            if (!response.ok) {
                console.error("Validation errors:", data.errors ?? data);
                alert(data.message ?? "Upload failed. Check console for details.");
                return;
            }

            alert("Investment saved successfully!");
            setFormData({ ...blankForm });
            setShowSummary(false);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            alert("Server error. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    // ── Render ────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-10 py-6 border-b border-slate-50 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">Investment Registry</h1>
                    </div>
                    <Link to="/admin/dashboard"
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg hover:bg-indigo-700 transition-all">
                        <Undo2 size={16} /> Back to Dashboard
                    </Link>
                </div>

                {/* Error Banner */}
                {Object.keys(errors).length > 0 && (
                    <div className="mx-8 mt-6 px-5 py-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
                        <span className="text-rose-500 text-lg">⚠</span>
                        <div>
                            <p className="text-xs font-black text-rose-600 uppercase tracking-wide">
                                Please fix {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? 's' : ''} before continuing
                            </p>
                            <p className="text-[10px] text-rose-400 font-medium mt-0.5">Fields highlighted in red need your attention.</p>
                        </div>
                    </div>
                )}

                {showSummary && (
                    <SummaryModal
                        data={formData}
                        onConfirm={handleConfirmSave}
                        onCancel={() => setShowSummary(false)}
                        isSaving={isSaving}
                    />
                )}

                <form onSubmit={handleOpenSummary} className="p-8 lg:p-12 space-y-12">

                    {/* ── SECTION 1: Basic Details ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">1. Basic Details</h2>
                            <p className="text-xs text-slate-400 font-medium">Identification and primary contact details.</p>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Sr. No. <span className="text-rose-400">*</span></label>
                                    <input name="srNo" type="text" placeholder="001" value={formData.srNo} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-bold", !!errors.srNo)} />
                                    <FieldError name="srNo" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Date <span className="text-rose-400">*</span></label>
                                    <input name="date" type="date" value={formData.date} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.date)} />
                                    <FieldError name="date" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">PAN <span className="text-rose-400">*</span></label>
                                    <input name="pan" type="text" placeholder="ABCDE1234F" value={formData.pan} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold tracking-wider", !!errors.pan)} />
                                    <FieldError name="pan" errors={errors} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Aadhar</label>
                                    <input name="aadhar" type="text" placeholder="XXXX-XXXX-XXXX" value={formData.aadhar} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.aadhar)} />
                                    <FieldError name="aadhar" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Phone No. <span className="text-rose-400">*</span></label>
                                    <input name="phone" type="tel" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.phone)} />
                                    <FieldError name="phone" errors={errors} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Email <span className="text-rose-400">*</span></label>
                                    <input name="email" type="email" placeholder="client@example.com" value={formData.email} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.email)} />
                                    <FieldError name="email" errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── SECTION 2: Investment Details ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">2. Investment Details</h2>
                            <p className="text-xs text-slate-400 font-medium">Investment mode, supporting documents and payment breakup.</p>
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-2 block">Investment As <span className="text-rose-400">*</span></label>
                                <input name="investmentAs" type="text" placeholder="Full name" value={formData.investmentAs} onChange={handleChange}
                                    className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.investmentAs)} />
                                <FieldError name="investmentAs" errors={errors} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">PAN/TAN <span className="text-rose-400">*</span></label>
                                    <input name="panTanNo" type="text" value={formData.panTanNo} onChange={handleChange} placeholder="ABCDE1234F"
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.panTanNo)} />
                                    <FieldError name="panTanNo" errors={errors} />
                                    <input id="panTanDoc" type="file" className="hidden" onChange={handleFileChange("panTanDoc")} />
                                    <label htmlFor="panTanDoc" className="mt-2 w-full px-4 py-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500">
                                        <span className="truncate">{formData.panTanDoc ? formData.panTanDoc.name : "Upload PAN/TAN Doc"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Aadhar</label>
                                    <input name="aadharNo" type="text" value={formData.aadharNo} onChange={handleChange} placeholder="XXXX-XXXX-XXXX"
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.aadharNo)} />
                                    <FieldError name="aadharNo" errors={errors} />
                                    <input id="aadharDoc" type="file" className="hidden" onChange={handleFileChange("aadharDoc")} />
                                    <label htmlFor="aadharDoc" className="mt-2 w-full px-4 py-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500">
                                        <span className="truncate">{formData.aadharDoc ? formData.aadharDoc.name : "Upload Aadhar Doc"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">GST</label>
                                    <input name="gstNo" type="text" value={formData.gstNo} onChange={handleChange} placeholder="22AAAAA0000A1Z5"
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.gstNo)} />
                                    <FieldError name="gstNo" errors={errors} />
                                    <input id="gstDoc" type="file" className="hidden" onChange={handleFileChange("gstDoc")} />
                                    <label htmlFor="gstDoc" className="mt-2 w-full px-4 py-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500">
                                        <span className="truncate">{formData.gstDoc ? formData.gstDoc.name : "Upload GST Doc"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Investment Value <span className="text-rose-400">*</span></label>
                                    <input name="investmentValue" type="number" placeholder="₹ 0.00" value={formData.investmentValue} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-black text-indigo-600", !!errors.investmentValue)} />
                                    <FieldError name="investmentValue" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Date of Investment <span className="text-rose-400">*</span></label>
                                    <input name="investmentDate" type="date" value={formData.investmentDate} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.investmentDate)} />
                                    <FieldError name="investmentDate" errors={errors} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Final Ref No. <span className="text-rose-400">*</span></label>
                                    <input name="finalRefNo" type="text" placeholder="Final UTR / Ref No." value={formData.finalRefNo} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold tracking-wider", !!errors.finalRefNo)} />
                                    <FieldError name="finalRefNo" errors={errors} />
                                </div>
                            </div>

                            {/* Token payments */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                                            Token Amounts / Partial Payments <span className="text-rose-400">*</span>
                                        </label>
                                        {errors.tokenEntries && (
                                            <p className="text-[10px] text-rose-500 font-bold mt-0.5 flex items-center gap-1">
                                                <span>⚠</span> {errors.tokenEntries}
                                            </p>
                                        )}
                                    </div>
                                    <button type="button" onClick={addTokenEntry}
                                        className="flex items-center gap-1 text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all">
                                        <Plus size={14} /> Add Payment Entry
                                    </button>
                                </div>
                                {formData.tokenEntries.map((entry, index) => (
                                    <div key={index} className={`grid grid-cols-1 md:grid-cols-10 gap-3 items-start p-4 rounded-2xl border ${
                                        errors[`token_amount_${index}`] || errors[`token_date_${index}`] || errors[`token_utr_${index}`] || errors[`token_method_${index}`]
                                            ? "bg-rose-50/30 border-rose-200"
                                            : "bg-slate-50/50 border-slate-100"
                                    }`}>
                                        <div className="md:col-span-4">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Token Amount <span className="text-rose-400">*</span></label>
                                            <input type="number" placeholder="₹ Amount" value={entry.amount}
                                                onChange={(e) => handleTokenChange(index, "amount", e.target.value)}
                                                className={inputCls("w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-bold", !!errors[`token_amount_${index}`])} />
                                            <FieldError name={`token_amount_${index}`} errors={errors} />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Date <span className="text-rose-400">*</span></label>
                                            <input type="date" value={entry.date}
                                                onChange={(e) => handleTokenChange(index, "date", e.target.value)}
                                                className={inputCls("w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold", !!errors[`token_date_${index}`])} />
                                            <FieldError name={`token_date_${index}`} errors={errors} />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">UTR / Ref No. <span className="text-rose-400">*</span></label>
                                            <input type="text" placeholder="UTR / Ref" value={entry.utr}
                                                onChange={(e) => handleTokenChange(index, "utr", e.target.value)}
                                                className={inputCls("w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold", !!errors[`token_utr_${index}`])} />
                                            <FieldError name={`token_utr_${index}`} errors={errors} />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Payment Method <span className="text-rose-400">*</span></label>
                                            <select value={entry.payment_method || ""}
                                                onChange={(e) => handleTokenChange(index, "payment_method", e.target.value)}
                                                className={inputCls("w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold", !!errors[`token_method_${index}`])}>
                                                <option value="">Select Payment Method</option>
                                                <option value="upi">UPI</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                                <option value="cash">Cash</option>
                                                <option value="cheque">Cheque</option>
                                                <option value="rtgs_neft">RTGS/NEFT</option>
                                            </select>
                                            <FieldError name={`token_method_${index}`} errors={errors} />
                                        </div>
                                        <div className="md:col-span-1 flex justify-center pt-6">
                                            {formData.tokenEntries.length > 1 && (
                                                <button type="button" onClick={() => removeTokenEntry(index)}
                                                    className="p-2 text-rose-400 hover:text-rose-600 transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bank Transaction Details */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Bank Transaction Details</label>
                                    <button type="button" onClick={addBankTx}
                                        className="flex items-center gap-1 text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all">
                                        <Plus size={14} /> Add Bank Detail
                                    </button>
                                </div>
                                {formData.bankTransactions.map((tx, idx) => (
                                    <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-50/80 rounded-2xl border border-slate-200">
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Transaction Amount</label>
                                            <input type="number" placeholder="₹ Amount" value={tx.amount}
                                                onChange={(e) => handleBankTxChange(idx, 'amount', e.target.value)}
                                                className="w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-bold shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Payment Method</label>
                                            <select value={tx.method}
                                                onChange={(e) => handleBankTxChange(idx, 'method', e.target.value)}
                                                className="w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold shadow-sm text-slate-700">
                                                <option value="">Select Method</option>
                                                <option value="UPI">UPI</option>
                                                <option value="Cheque">Cheque</option>
                                                <option value="Bank Transfer">Bank Transfer</option>
                                                <option value="RTGS/NEFT">RTGS/NEFT</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Transaction Date</label>
                                            <input type="date" value={tx.date}
                                                onChange={(e) => handleBankTxChange(idx, 'date', e.target.value)}
                                                className="w-full px-3 py-2.5 bg-white rounded-xl outline-none text-sm font-semibold shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Cancel / Passbook / Statement</label>
                                            <input id={`bankDoc-${idx}`} type="file" className="hidden" onChange={(e) => handleBankTxChange(idx, 'doc', e.target.files ? e.target.files[0] : null)} />
                                            <label htmlFor={`bankDoc-${idx}`} className="w-full px-4 py-2.5 bg-white rounded-xl border border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500 shadow-sm hover:border-indigo-300 transition-all">
                                                <span className="truncate">{tx.doc ? tx.doc.name : 'Upload Doc'}</span>
                                                <Upload size={15} className="text-indigo-500 shrink-0" />
                                            </label>
                                        </div>
                                        {idx > 0 && (
                                            <button type="button" onClick={() => removeBankTx(idx)}
                                                className="absolute -right-3 -top-3 bg-rose-500 text-white p-1.5 rounded-full shadow-lg hover:bg-rose-600">
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Cancelled Cheque + Bank details */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Cancelled Cheque</label>
                                    <input id="cancelledChequeDoc" type="file" className="hidden" onChange={handleFileChange("cancelledChequeDoc")} />
                                    <label htmlFor="cancelledChequeDoc" className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all text-xs text-slate-500">
                                        <span className="truncate">{formData.cancelledChequeDoc ? formData.cancelledChequeDoc.name : "Upload Cancelled Cheque"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Rent A/C Number <span className="text-rose-400">*</span></label>
                                    <input name="rentAccountNumber" type="text" value={formData.rentAccountNumber} onChange={handleChange} placeholder="0000000000"
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-bold tracking-wider", !!errors.rentAccountNumber)} />
                                    <FieldError name="rentAccountNumber" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">IFSC <span className="text-rose-400">*</span></label>
                                    <input name="rentIfsc" type="text" value={formData.rentIfsc} onChange={handleChange} placeholder="SBIN0000000"
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-bold uppercase", !!errors.rentIfsc)} />
                                    <FieldError name="rentIfsc" errors={errors} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Bank Name <span className="text-rose-400">*</span></label>
                                    <input name="rentBankName" type="text" value={formData.rentBankName} onChange={handleChange} placeholder="Bank Name"
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.rentBankName)} />
                                    <FieldError name="rentBankName" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Branch <span className="text-rose-400">*</span></label>
                                    <input name="rentBranch" type="text" value={formData.rentBranch} onChange={handleChange} placeholder="Branch Name"
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.rentBranch)} />
                                    <FieldError name="rentBranch" errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── SECTION 3: Legal & Courier ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">3. Legal & Courier</h2>
                            <p className="text-xs text-slate-400 font-medium">Agreements, invoices and courier tracking.</p>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Notary Agreement <span className="text-rose-400">*</span></label>
                                    <input id="notaryAgreementDoc" type="file" className="hidden" onChange={handleFileChange("notaryAgreementDoc")} />
                                    <label htmlFor="notaryAgreementDoc" className={fileLabelCls("w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500", !!errors.notaryAgreementDoc)}>
                                        <span className="truncate">{formData.notaryAgreementDoc ? formData.notaryAgreementDoc.name : "Upload Notary Agreement"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                    <FieldError name="notaryAgreementDoc" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Stamp Paper <span className="text-rose-400">*</span></label>
                                    <input id="stampPaperDoc" type="file" className="hidden" onChange={handleFileChange("stampPaperDoc")} />
                                    <label htmlFor="stampPaperDoc" className={fileLabelCls("w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500", !!errors.stampPaperDoc)}>
                                        <span className="truncate">{formData.stampPaperDoc ? formData.stampPaperDoc.name : "Upload Stamp Paper"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                    <FieldError name="stampPaperDoc" errors={errors} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Invoice <span className="text-rose-400">*</span></label>
                                    <input id="invoiceDoc" type="file" className="hidden" onChange={handleFileChange("invoiceDoc")} />
                                    <label htmlFor="invoiceDoc" className={fileLabelCls("w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500", !!errors.invoiceDoc)}>
                                        <span className="truncate">{formData.invoiceDoc ? formData.invoiceDoc.name : "Upload Invoice"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                    <FieldError name="invoiceDoc" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Courier Tracking Number <span className="text-rose-400">*</span></label>
                                    <div className="relative mb-2">
                                        <input name="courierTrackingNumber" type="text" placeholder="Tracking Number" value={formData.courierTrackingNumber} onChange={handleChange}
                                            className={inputCls("w-full px-5 py-3.5 bg-slate-50 rounded-2xl outline-none font-semibold pl-12", !!errors.courierTrackingNumber)} />
                                        <Truck size={18} className="absolute left-4 top-4 text-slate-300" />
                                    </div>
                                    <FieldError name="courierTrackingNumber" errors={errors} />
                                    <input id="courierTrackingDoc" type="file" className="hidden" onChange={handleFileChange("courierTrackingDoc")} />
                                    <label htmlFor="courierTrackingDoc" className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500">
                                        <span className="truncate">{formData.courierTrackingDoc ? formData.courierTrackingDoc.name : "Upload Courier Doc"}</span>
                                        <Upload size={16} className="text-indigo-500" />
                                    </label>
                                </div>
                            </div>

                            {/* Other Documents */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Other Documents</label>
                                    <button type="button" onClick={addOtherDoc}
                                        className="flex items-center gap-1 text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all">
                                        <Plus size={14} /> Add Document
                                    </button>
                                </div>
                                {formData.otherDocs.map((doc, idx) => (
                                    <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <input placeholder="Label (e.g. Electricity Bill)" value={doc.label}
                                            onChange={(e) => handleOtherDocChange(idx, 'label', e.target.value)}
                                            className="px-4 py-2.5 bg-white rounded-xl outline-none font-semibold text-sm shadow-sm" />
                                        <div>
                                            <input id={`otherDoc-${idx}`} type="file" className="hidden" onChange={(e) => handleOtherDocChange(idx, 'file', e.target.files ? e.target.files[0] : null)} />
                                            <label htmlFor={`otherDoc-${idx}`} className="w-full px-4 py-2.5 bg-white rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500 shadow-sm hover:text-indigo-600 transition-all">
                                                <span className="truncate">{doc.file?.name || "Upload File"}</span>
                                                <Upload size={15} className="text-indigo-500 shrink-0" />
                                            </label>
                                        </div>
                                        {idx > 0 && (
                                            <button type="button" onClick={() => removeOtherDoc(idx)}
                                                className="absolute -right-3 -top-3 bg-rose-500 text-white p-1.5 rounded-full hover:bg-rose-600 shadow-lg">
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── SECTION 4: Rent Schedule ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">4. Rent Schedule</h2>
                            <p className="text-xs text-slate-400 font-medium">Payout dates and latest rent receipt.</p>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">First Rent Date <span className="text-rose-400">*</span></label>
                                    <input name="firstRentDate" type="date" value={formData.firstRentDate} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.firstRentDate)} />
                                    <FieldError name="firstRentDate" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Next Rent Date <span className="text-rose-400">*</span></label>
                                    <input name="nextRentDate" type="date" value={formData.nextRentDate} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-indigo-50 rounded-2xl outline-none font-bold text-indigo-600", !!errors.nextRentDate)} />
                                    <FieldError name="nextRentDate" errors={errors} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Last Rent Date <span className="text-rose-400">*</span></label>
                                    <input name="lastRentDate" type="date" value={formData.lastRentDate} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.lastRentDate)} />
                                    <FieldError name="lastRentDate" errors={errors} />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Latest Rent Receipt</label>
                                <input id="latestRentReceiptDoc" type="file" className="hidden" onChange={handleFileChange("latestRentReceiptDoc")} />
                                <label htmlFor="latestRentReceiptDoc" className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500">
                                    <span className="truncate">{formData.latestRentReceiptDoc ? formData.latestRentReceiptDoc.name : "Upload Latest Rent Receipt"}</span>
                                    <Upload size={16} className="text-indigo-500" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ── SECTION 5: Vehicle Allocation ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">5. Vehicle Allocation</h2>
                            <p className="text-xs text-slate-400 font-medium">Number of vehicles and live tracking URL.</p>
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-2 block">No. of Vehicles <span className="text-rose-400">*</span></label>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={handleDecrement}
                                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-black text-slate-600 transition-all text-lg">
                                        −
                                    </button>
                                    <input name="noOfVehicles" type="number" min="1" value={formData.noOfVehicles} onChange={handleChange}
                                        className={inputCls("w-20 text-center px-2 py-3 bg-slate-50 rounded-2xl outline-none font-black text-indigo-600 text-lg", !!errors.noOfVehicles)} />
                                    <button type="button" onClick={handleIncrement}
                                        className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center font-black text-white transition-all text-lg">
                                        +
                                    </button>
                                </div>
                                <FieldError name="noOfVehicles" errors={errors} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Rent / Month</p>
                                    <p className="text-xl font-black text-indigo-600">₹ {parseInt(formData.totalRentAmount).toLocaleString('en-IN')}</p>
                                    <p className="text-[9px] text-slate-400 mt-1">{formData.noOfVehicles} vehicle(s) × ₹2,200</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">After TDS (2%)</p>
                                    <p className="text-xl font-black text-emerald-600">₹ {parseInt(formData.nextRentAfterTds).toLocaleString('en-IN')}</p>
                                    <p className="text-[9px] text-emerald-400 mt-1">Actual payout to investor</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Vehicle Tracking URL</label>
                                <div className="relative">
                                    <input name="vehicleTrackingUrl" type="url" placeholder="https://tracking.example.com/id" value={formData.vehicleTrackingUrl} onChange={handleChange}
                                        className={inputCls("w-full px-5 py-3.5 bg-slate-50 rounded-2xl outline-none font-semibold pl-12 text-indigo-500 underline", !!errors.vehicleTrackingUrl)} />
                                    <Car size={18} className="absolute left-4 top-4 text-slate-300" />
                                </div>
                                <FieldError name="vehicleTrackingUrl" errors={errors} />
                            </div>
                        </div>
                    </div>

                    {/* ── SECTION 6: Nominee Details ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-4">6. Nominee Details</h2>
                            <p className="text-xs text-slate-400 font-medium">Optional. Add a nominee for this investment and upload their identification.</p>
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Nominee Full Name</label>
                                    <input name="nomineeName" placeholder="Enter Nominee Name" value={formData.nomineeName} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">
                                        Relation {formData.nomineeName && <span className="text-rose-400">*</span>}
                                    </label>
                                    <select name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange}
                                        className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold text-slate-700", !!errors.nomineeRelation)}>
                                        <option value="">Select Relation</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Spouse">Spouse</option>
                                        <option value="Child">Child</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                    </select>
                                    <FieldError name="nomineeRelation" errors={errors} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Nominee PAN No.</label>
                                        <input name="nomineePan" placeholder="ABCDE1234F" value={formData.nomineePan} onChange={handleChange}
                                            className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold uppercase", !!errors.nomineePan)} />
                                        <FieldError name="nomineePan" errors={errors} />
                                    </div>
                                    <div>
                                        <input id="nomineePanDoc" type="file" className="hidden" onChange={handleFileChange('nomineePanDoc')} />
                                        <label htmlFor="nomineePanDoc" className="w-full px-4 py-2.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500 hover:bg-indigo-50 transition-all">
                                            <span className="truncate">{formData.nomineePanDoc ? formData.nomineePanDoc.name : 'Upload Nominee PAN'}</span>
                                            <Upload size={15} className="text-indigo-500 shrink-0" />
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Nominee Aadhaar No.</label>
                                        <input name="nomineeAadhar" placeholder="XXXX-XXXX-XXXX" value={formData.nomineeAadhar} onChange={handleChange}
                                            className={inputCls("w-full px-4 py-3 bg-slate-50 rounded-2xl outline-none font-semibold", !!errors.nomineeAadhar)} />
                                        <FieldError name="nomineeAadhar" errors={errors} />
                                    </div>
                                    <div>
                                        <input id="nomineeAadharDoc" type="file" className="hidden" onChange={handleFileChange('nomineeAadharDoc')} />
                                        <label htmlFor="nomineeAadharDoc" className="w-full px-4 py-2.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between cursor-pointer text-xs text-slate-500 hover:bg-indigo-50 transition-all">
                                            <span className="truncate">{formData.nomineeAadharDoc ? formData.nomineeAadharDoc.name : 'Upload Nominee Aadhaar'}</span>
                                            <Upload size={15} className="text-indigo-500 shrink-0" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── SUBMIT ── */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 italic">* Required fields must be completed for successful registration.</p>
                        <button type="submit"
                            className="px-12 py-5 rounded-3xl font-black text-sm flex items-center gap-3 transition-all bg-indigo-600 text-white hover:scale-[1.03] shadow-xl shadow-indigo-200">
                            Save Record Entry <ChevronRight size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────
// ROOT EXPORT — handles login gate
// ─────────────────────────────────────────────────────────────────
const InvestmentRegistryRoot: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken());

    const handleLogin = () => setIsLoggedIn(true);

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE}/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${getToken()}`, 'Accept': 'application/json' },
            });
        } finally {
            clearToken();
            setIsLoggedIn(false);
        }
    };

    if (!isLoggedIn) return <Login onLogin={handleLogin} />;
    return <InvestmentRegistryForm />;
};

export default InvestmentRegistryRoot;
export { Login };