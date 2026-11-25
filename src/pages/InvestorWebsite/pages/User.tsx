import React, { useState, ChangeEvent, useEffect } from 'react';
import { Building2, X, Plus, Trash2, Upload, Car, ChevronRight, FileCheck, Lock, Mail, Eye, EyeOff, LogOut, Pencil, ArrowLeft, Search } from 'lucide-react';

// --- Interfaces ---
interface TokenEntry { amount: string; date: string; refNo: string; }

interface FormData {
    id?: string;
    srNo: string; date: string; pan: string; aadharNo: string; phone: string; email: string;
    investmentAs: string;
    invAadhar: string; invPanTan: string; invGst: string;
    invPanTanSec: string; invAadharSec: string; invGstSec: string;
    panTanDoc: File | null; aadharDoc: File | null; gstDoc: File | null;
    investmentValue: string; dateOfInvestment: string; finalRefNo: string;
    tokenEntries: TokenEntry[];
    cancelledCheque: File | null; rentAccNo: string; ifsc: string; bankName: string; branchName: string;
    notaryAgreement: File | null; stampPaper: File | null; invoice: File | null;
    courierTrackingNo: string; courierDoc: File | null;
    firstRentDate: string; nextRentDate: string; lastRentDate: string; latestRentReceipt: File | null;
    vehicleTrackingUrl: string;
}

const DEFAULT_FORM_DATA: FormData = {
    srNo: '', date: '', pan: '', aadharNo: '', phone: '', email: '',
    investmentAs: 'Individual', invAadhar: '', invPanTan: '', invGst: '',
    invPanTanSec: '', invAadharSec: '', invGstSec: '',
    panTanDoc: null, aadharDoc: null, gstDoc: null,
    investmentValue: '', dateOfInvestment: '', finalRefNo: '',
    tokenEntries: [{ amount: '', date: '', refNo: '' }],
    bankName: '', branchName: '', cancelledCheque: null, rentAccNo: '', ifsc: '',
    notaryAgreement: null, stampPaper: null, invoice: null, courierTrackingNo: '', courierDoc: null,
    firstRentDate: '', nextRentDate: '', lastRentDate: '', latestRentReceipt: null,
    vehicleTrackingUrl: ''
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

// --- Summary Modal Component (UPDATED TO SHOW ALL FIELDS) ---
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
                                    <DataRow label="Inv. Date" value={data.dateOfInvestment} />
                                    <DataRow label="Final Ref" value={data.finalRefNo} />
                                    <div className="col-span-2 mt-2 pt-2 border-t border-slate-100">
                                        <p className="text-[9px] font-black text-indigo-400 uppercase mb-2">IDs</p>
                                        <div className="grid grid-cols-2 gap-x-4">
                                            <DataRow label="Inv. Aadhar" value={data.invAadhar} />
                                            <DataRow label="Inv. PAN/TAN" value={data.invPanTan} />
                                            <DataRow label="Inv. GST" value={data.invGst} />
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
                                    <DataRow label="Bank Name" value={data.bankName} />
                                    <DataRow label="Branch" value={data.branchName} />
                                    <DataRow label="Account No" value={data.rentAccNo} />
                                    <DataRow label="IFSC" value={data.ifsc} />
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
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Ref</p>
                                                    <p className="text-[10px] font-bold text-indigo-600">{t.refNo || '-'}</p>
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
                                    <DataRow label="Cancelled Chq" value={data.cancelledCheque} isFile />
                                    <DataRow label="Notary Agree." value={data.notaryAgreement} isFile />
                                    <DataRow label="Stamp Paper" value={data.stampPaper} isFile />
                                    <DataRow label="Invoice" value={data.invoice} isFile />
                                    <DataRow label="Courier Doc" value={data.courierDoc} isFile />
                                    <DataRow label="Rent Receipt" value={data.latestRentReceipt} isFile />
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <SectionHeader title="6. Logistics & Schedule" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DataRow label="First Rent" value={data.firstRentDate} />
                                    <DataRow label="Next Rent" value={data.nextRentDate} />
                                    <DataRow label="Last Rent" value={data.lastRentDate} />
                                    <DataRow label="Courier Track" value={data.courierTrackingNo} />
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

// --- Dashboard Component ---
const Dashboard = ({ records, onEdit, onNew, onLogout }: { records: FormData[], onEdit: (id: string) => void, onNew: () => void, onLogout: () => void }) => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><Building2 size={24} /></div>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 uppercase">Admin Dashboard</h1>
                        <p className="text-xs font-bold text-slate-400">{records.length} Records Found</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={onNew} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg hover:bg-indigo-700 transition-all">
                        <Plus size={16} /> New Entry
                    </button>
                    <button onClick={onLogout} className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100"><LogOut size={20} /></button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden p-8">
                {records.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <Building2 size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-bold">No records found. Create a new entry.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                            <tr className="border-b border-slate-100">
                                <th className="pb-4 pl-4 text-[10px] font-black text-slate-400 uppercase">Sr No</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Date</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">PAN</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Inv. Value</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Status</th>
                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase text-right pr-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                            {records.map((rec) => (
                                <tr key={rec.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="py-4 pl-4 font-bold text-slate-700 text-sm">#{rec.srNo}</td>
                                    <td className="py-4 font-bold text-slate-500 text-xs">{rec.date}</td>
                                    <td className="py-4 font-bold text-slate-800 text-xs uppercase">{rec.pan}</td>
                                    <td className="py-4 font-bold text-emerald-600 text-xs">{rec.investmentValue}</td>
                                    <td className="py-4"><span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Active</span></td>
                                    <td className="py-4 text-right pr-4">
                                        <button onClick={() => rec.id && onEdit(rec.id)} className="p-2 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                            <Pencil size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Form Component ---
const RegistryForm = ({ initialData, onSave, onCancel }: { initialData: FormData | null, onSave: (data: FormData) => void, onCancel: () => void }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialData || DEFAULT_FORM_DATA);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(DEFAULT_FORM_DATA);
        }
    }, [initialData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'file' ? files?.[0] : value }));
    };

    const handleTokenChange = (index: number, field: keyof TokenEntry, value: string) => {
        const updated = [...formData.tokenEntries];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, tokenEntries: updated }));
    };

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
            {showConfirmModal && (
                <SummaryModal
                    data={formData}
                    onConfirm={() => { setShowConfirmModal(false); onSave(formData); }}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}

            <div className="px-10 py-6 border-b flex justify-between items-center bg-white">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-black text-slate-800 uppercase">
                        {initialData ? `Edit Record #${initialData.srNo}` : 'New Investment Registry'}
                    </h1>
                </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }} className="p-10 space-y-12">
                {/* SECTION 1: BASIC DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-[11px] font-black text-indigo-600 uppercase">1. Basic Details</h2>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">Identification and primary contact details.</p>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Sr. No.</label>
                                <input name="srNo" value={formData.srNo} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" placeholder="001" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Date</label>
                                <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">PAN</label>
                                <input name="pan" value={formData.pan} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold uppercase" placeholder="ABCDE1234F" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Aadhar</label>
                                <input name="aadharNo" value={formData.aadharNo} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" placeholder="XXXX-XXXX-XXXX" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Phone No.</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" placeholder="+91 00000 00000" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Email</label>
                                <input name="email" value={formData.email} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" placeholder="client@example.com" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: INVESTMENT DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10 border-t">
                    <div>
                        <h2 className="text-[11px] font-black text-indigo-600 uppercase">2. Investment Details</h2>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">Investment mode, supporting documents and payment breakup.</p>
                    </div>
                    <div className="md:col-span-3 space-y-6">
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-3">Investment As</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Aadhar</label>
                                    <input name="invAadhar" value={formData.invAadhar} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2">PAN/TAN</label>
                                    <input name="invPanTan" value={formData.invPanTan} onChange={handleChange} placeholder="+91 00000 00000" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2">GST</label>
                                    <input name="invGst" value={formData.invGst} onChange={handleChange} placeholder="client@example.com" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { name: 'panTanDoc' as const, label: 'Upload PAN/TAN Doc' },
                                { name: 'aadharDoc' as const, label: 'Upload Aadhar Doc' },
                                { name: 'gstDoc' as const, label: 'Upload GST Doc' }
                            ].map(f => (
                                <label key={f.name} className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer hover:bg-indigo-50 transition-colors">
                                    <span className="text-[10px] font-black text-slate-400">{formData[f.name]?.name || f.label}</span>
                                    <Upload size={14} className="text-indigo-400" /><input type="file" name={f.name} onChange={handleChange} className="hidden" />
                                </label>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Investment Value</label>
                                <input name="investmentValue" value={formData.investmentValue} onChange={handleChange} placeholder="₹ 0.00" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Date of Investment</label>
                                <input name="dateOfInvestment" type="date" value={formData.dateOfInvestment} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Final Ref No.</label>
                                <input name="finalRefNo" value={formData.finalRefNo} onChange={handleChange} placeholder="Final UTR / Ref No." className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TOKEN PAYMENTS & BANKING */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1"></div>
                    <div className="md:col-span-3 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Token Amounts / Partial Payments</h3>
                            <button type="button" onClick={() => setFormData(p => ({...p, tokenEntries: [...p.tokenEntries, {amount:'', date:'', refNo:''}]}))} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 hover:bg-indigo-100"><Plus size={14}/> Add Payment Entry</button>
                        </div>
                        {formData.tokenEntries.map((t, i) => (
                            <div key={i} className="flex gap-4 bg-slate-50 p-6 rounded-2xl items-center shadow-inner">
                                <div className="flex-1 space-y-1">
                                    <label className="text-[8px] font-black text-slate-400 uppercase ml-2">Token Amount</label>
                                    <input value={t.amount} onChange={e => handleTokenChange(i, 'amount', e.target.value)} placeholder="₹ Amount" className="w-full px-4 py-3 bg-white rounded-xl font-bold" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <label className="text-[8px] font-black text-slate-400 uppercase ml-2">Date</label>
                                    <input type="date" value={t.date} onChange={e => handleTokenChange(i, 'date', e.target.value)} className="w-full px-4 py-3 bg-white rounded-xl font-bold" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <label className="text-[8px] font-black text-slate-400 uppercase ml-2">UTR / Ref No.</label>
                                    <input value={t.refNo} onChange={e => handleTokenChange(i, 'refNo', e.target.value)} placeholder="UTR / Ref" className="w-full px-4 py-3 bg-white rounded-xl font-bold" />
                                </div>
                                <button type="button" onClick={() => setFormData(p => ({...p, tokenEntries: p.tokenEntries.filter((_, idx) => idx !== i)}))} className="text-rose-400 pt-5"><Trash2 size={20}/></button>
                            </div>
                        ))}

                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Cancelled Cheque</label>
                                <label className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer bg-white">
                                    <span className="text-[10px] font-black text-slate-400 truncate">{formData.cancelledCheque?.name || 'Upload Cancelled Cheque'}</span>
                                    <Upload size={14} className="text-indigo-400" /><input type="file" name="cancelledCheque" onChange={handleChange} className="hidden" />
                                </label>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Rent A/C Number</label>
                                <input name="rentAccNo" value={formData.rentAccNo} onChange={handleChange} placeholder="0000000000" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">IFSC</label>
                                <input name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="SBIN0000000" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Bank Name</label>
                                <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                            <div className="space-y-1 col-span-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Branch</label>
                                <input name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch Name" className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: LEGAL & COURIER */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10 border-t">
                    <div>
                        <h2 className="text-[11px] font-black text-indigo-600 uppercase">3. Legal & Courier</h2>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">Agreements, invoices and courier tracking.</p>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Notary Agreement</label>
                                <label className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer">
                                    <span className="text-[10px] font-black text-slate-400 truncate">{formData.notaryAgreement?.name || 'Upload Notary Agreement'}</span>
                                    <Upload size={14} className="text-indigo-400"/><input type="file" name="notaryAgreement" onChange={handleChange} className="hidden" />
                                </label>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Stamp Paper</label>
                                <label className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer">
                                    <span className="text-[10px] font-black text-slate-400 truncate">{formData.stampPaper?.name || 'Upload Stamp Paper'}</span>
                                    <Upload size={14} className="text-indigo-400"/><input type="file" name="stampPaper" onChange={handleChange} className="hidden" />
                                </label>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Invoice</label>
                                <label className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer">
                                    <span className="text-[10px] font-black text-slate-400 truncate">{formData.invoice?.name || 'Upload Invoice'}</span>
                                    <Upload size={14} className="text-indigo-400"/><input type="file" name="invoice" onChange={handleChange} className="hidden" />
                                </label>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Courier Tracking Number</label>
                                <div className="relative">
                                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input name="courierTrackingNo" value={formData.courierTrackingNo} onChange={handleChange} placeholder="Tracking Number" className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                                </div>
                            </div>
                        </div>
                        <label className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer">
                            <span className="text-[10px] font-black text-slate-400 truncate">{formData.courierDoc?.name || 'Upload Courier Doc'}</span>
                            <Upload size={14} className="text-indigo-400"/><input type="file" name="courierDoc" onChange={handleChange} className="hidden" />
                        </label>
                    </div>
                </div>

                {/* SECTION 4 & 5: RENT & VEHICLE */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10 border-t">
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase">4. Rent Schedule</h2>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">Payout dates and latest rent receipt.</p>
                        </div>
                        <div>
                            <h2 className="text-[11px] font-black text-indigo-600 uppercase">5. Vehicle Allocation</h2>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">Share the live tracking URL with the investor.</p>
                        </div>
                    </div>
                    <div className="md:col-span-3 space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">First Rent Date</label>
                                <input name="firstRentDate" type="date" value={formData.firstRentDate} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Next Rent Date</label>
                                <input name="nextRentDate" type="date" value={formData.nextRentDate} onChange={handleChange} className="w-full px-6 py-4 bg-indigo-50/50 rounded-2xl font-bold text-indigo-600" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Last Rent Date</label>
                                <input name="lastRentDate" type="date" value={formData.lastRentDate} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Latest Rent Receipt</label>
                            <label className="flex items-center justify-between px-6 py-4 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer">
                                <span className="text-[10px] font-black text-slate-400 truncate">{formData.latestRentReceipt?.name || 'Upload Latest Rent Receipt'}</span>
                                <Upload size={14} className="text-indigo-400"/><input type="file" name="latestRentReceipt" onChange={handleChange} className="hidden" />
                            </label>
                        </div>
                        <div className="pt-4 space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Vehicle Tracking URL</label>
                            <div className="relative">
                                <Car className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input name="vehicleTrackingUrl" value={formData.vehicleTrackingUrl} onChange={handleChange} className="w-full pl-14 pr-8 py-5 bg-slate-50/50 rounded-3xl font-bold text-indigo-600 outline-none border border-transparent focus:border-indigo-100" placeholder="https://tracking.example.com/id" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-10">
                    <button type="submit" className="px-12 py-6 bg-slate-200 text-slate-500 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-indigo-600 hover:text-white transition-all shadow-xl group">
                        {initialData ? 'Update Record' : 'Save New Record'} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Main App Controller ---
const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');

    // Simulating database with dummy data
    const [records, setRecords] = useState<FormData[]>([
        {...DEFAULT_FORM_DATA, id: '101', srNo: '001', date: '2023-10-10', pan: 'ABCDE1234F', investmentValue: '500000'}
    ]);

    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSave = (data: FormData) => {
        if (editingId) {
            // Update existing
            setRecords(prev => prev.map(rec => rec.id === editingId ? { ...data, id: editingId } : rec));
            alert("Record Updated Successfully");
        } else {
            // Create new (generate simple random ID)
            const newId = Math.random().toString(36).substr(2, 9);
            setRecords(prev => [...prev, { ...data, id: newId }]);
            alert("Record Created Successfully");
        }
        setView('list');
        setEditingId(null);
    };

    const handleEdit = (id: string) => {
        setEditingId(id);
        setView('form');
    };

    const handleNew = () => {
        setEditingId(null);
        setView('form');
    };

    if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

    return (    
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-12">
            {view === 'list' ? (
                <Dashboard
                    records={records}
                    onEdit={handleEdit}
                    onNew={handleNew}
                    onLogout={() => setIsLoggedIn(false)}
                />
            ) : (
                <RegistryForm
                    initialData={editingId ? records.find(r => r.id === editingId) || null : null}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            )}
        </div>
    );
};

export default App;