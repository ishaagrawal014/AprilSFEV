import React, { useState, useEffect, useCallback } from 'react';
import { Building2, Plus, LogOut, Pencil, Save, X, Trash2, Loader2, AlertCircle, CheckCircle2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/* ===========================
   TypeScript Interfaces
   =========================== */

interface TokenPayment {
  id?: number;
  admin_database_id?: number;
  amount: string;
  payment_date: string;
  utr: string;
}

interface AdminDatabaseRecord {
  id: number;
  sr_no: string;
  date: string;
  pan: string;
  aadhar: string;
  phone: string;
  email: string;
  investment_as: string;
  panTanNo: string | null;
  gst: string | null;
  pan_doc: string | null;
  aadhar_doc: string | null;
  gst_doc: string | null;
  investment_value: string;
  investment_date: string;
  final_ref_no: string;
  token_amount: string | null;
  token_date: string | null;
  token_utr: string | null;
  cancelled_cheque: string | null;
  bank_account: string;
  ifsc: string;
  bank_name: string;
  branch: string;
  notary_agreement: string | null;
  stamp_paper: string | null;
  invoice: string | null;
  courier_tracking_no: string | null;
  courier_doc: string | null;
  first_rent_date: string | null;
  next_rent_date: string | null;
  last_rent_date: string | null;
  latest_rent_receipt: string | null;
  vehicle_tracking_url: string | null;
  token_payments: TokenPayment[];
}

interface EditFormData {
  srNo: string;
  date: string;
  pan: string;
  aadhar: string;
  phone: string;
  email: string;
  investment_as: string;
  panTanNo: string;
  gst: string;
  investment_value: string;
  investment_date: string;
  final_ref_no: string;
  bank_account: string;
  ifsc: string;
  bank_name: string;
  branch: string;
  courier_tracking_no: string;
  first_rent_date: string;
  next_rent_date: string;
  last_rent_date: string;
  vehicle_tracking_url: string;
  token_payments: TokenPayment[];
  panTanDoc?: File | null;
  aadhar_doc_file?: File | null;
  gst_doc_file?: File | null;
  cancelled_cheque_file?: File | null;
  notary_agreement_file?: File | null;
  stamp_paper_file?: File | null;
  invoice_file?: File | null;
  courier_doc_file?: File | null;
  latest_rent_receipt_file?: File | null;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

/* ===========================
   Constants
   =========================== */
// ✅ Use env variable — falls back to local for development
const API_BASE_URL = `${import.meta.env.VITE_API_URL ?? 'https://speedforceev.in/api'}/admin-database`;

// ✅ Always read token from localStorage
const getToken = () => localStorage.getItem('admin_token') ?? '';

/* ===========================
   Main Component
   =========================== */

const AdminDashboard: React.FC = () => {
  const [records, setRecords] = useState<AdminDatabaseRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditFormData | null>(null);
  const [viewingRecord, setViewingRecord] = useState<AdminDatabaseRecord | null>(null);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'info',
  });

  const navigate = useNavigate();

  /* ===========================
     Notification Helper
     =========================== */
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'info' }), 4000);
  }, []);

  /* ===========================
     Auth Headers Helper
     =========================== */
  // ✅ Always fresh token on every request
  const authHeaders = () => ({
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  });

  /* ===========================
     Handle 401 globally
     =========================== */
  const handle401 = useCallback(() => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  /* ===========================
     View Handler
     =========================== */
  const handleView = useCallback((id: number) => {
    const record = records.find(r => r.id === id);
    if (!record) { showNotification('Record not found', 'error'); return; }
    setViewingRecord(record);
  }, [records, showNotification]);

  const handleCloseView = useCallback(() => setViewingRecord(null), []);

  /* ===========================
     Data Fetching
     =========================== */
  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: authHeaders(),   // ✅ fresh token every time
      });

      // ✅ Handle session expiry
      if (response.status === 401) {
        handle401();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      let recordsArray: AdminDatabaseRecord[] = [];
      if (Array.isArray(data)) {
        recordsArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        recordsArray = data.data;
      } else if (data.data?.data && Array.isArray(data.data.data)) {
        recordsArray = data.data.data;
      }

      setRecords(recordsArray);
    } catch (error) {
      console.error('Error fetching records:', error);
      showNotification(
        error instanceof Error
          ? `Failed to load records: ${error.message}`
          : 'Failed to load records. Please check if the API server is running.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, [showNotification, handle401]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  /* ===========================
     Logout
     =========================== */
  const handleLogout = async () => {
    try {
      // ✅ Call correct local API with correct token
      await axios.post(
        `${import.meta.env.VITE_API_URL ?? 'https://www.speedforceev.in/api'}/logout`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/json' } }
      );
    } catch {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('admin_token');                          // ✅ correct key
      delete axios.defaults.headers.common['Authorization'];
      navigate('/admin/login', { replace: true });
    }
  };

  /* ===========================
     Edit Handlers
     =========================== */
  const handleEdit = useCallback((id: number) => {
    const record = records.find(r => r.id === id);
    if (!record) { showNotification('Record not found', 'error'); return; }

    setEditingId(id);
    setEditForm({
      srNo: record.sr_no || '',
      date: record.date || '',
      pan: record.pan || '',
      aadhar: record.aadhar || '',
      phone: record.phone || '',
      email: record.email || '',
      investment_as: record.investment_as || '',
      panTanNo: record.panTanNo || '',
      gst: record.gst || '',
      investment_value: record.investment_value || '',
      investment_date: record.investment_date || '',
      final_ref_no: record.final_ref_no || '',
      bank_account: record.bank_account || '',
      ifsc: record.ifsc || '',
      bank_name: record.bank_name || '',
      branch: record.branch || '',
      courier_tracking_no: record.courier_tracking_no || '',
      first_rent_date: record.first_rent_date || '',
      next_rent_date: record.next_rent_date || '',
      last_rent_date: record.last_rent_date || '',
      vehicle_tracking_url: record.vehicle_tracking_url || '',
      token_payments: record.token_payments?.length > 0
        ? record.token_payments.map(tp => ({
            id: tp.id,
            admin_database_id: tp.admin_database_id,
            amount: tp.amount || '',
            payment_date: tp.payment_date || '',
            utr: tp.utr || '',
          }))
        : [{ amount: '', payment_date: '', utr: '' }],
      panTanDoc: null,
      aadhar_doc_file: null,
      gst_doc_file: null,
      cancelled_cheque_file: null,
      notary_agreement_file: null,
      stamp_paper_file: null,
      invoice_file: null,
      courier_doc_file: null,
      latest_rent_receipt_file: null,
    });
  }, [records, showNotification]);

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setEditForm(null);
  }, []);

  const handleInputChange = useCallback((field: keyof EditFormData, value: string | File | null) => {
    setEditForm(prev => prev ? { ...prev, [field]: value } : null);
  }, []);

  const handleTokenPaymentChange = useCallback((index: number, field: keyof TokenPayment, value: string) => {
    setEditForm(prev => {
      if (!prev) return null;
      const updated = [...prev.token_payments];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, token_payments: updated };
    });
  }, []);

  const addTokenPayment = useCallback(() => {
    setEditForm(prev => prev ? {
      ...prev,
      token_payments: [...prev.token_payments, { amount: '', payment_date: '', utr: '' }],
    } : null);
  }, []);

  const removeTokenPayment = useCallback((index: number) => {
    setEditForm(prev => {
      if (!prev) return null;
      const updated = [...prev.token_payments];
      updated.splice(index, 1);
      return { ...prev, token_payments: updated.length > 0 ? updated : [{ amount: '', payment_date: '', utr: '' }] };
    });
  }, []);

  /* ===========================
     Save Handler
     =========================== */
  const handleSave = useCallback(async () => {
    if (!editForm || !editingId) return;
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append('srNo', editForm.srNo);
      formData.append('date', editForm.date);
      formData.append('pan', editForm.pan);
      formData.append('aadhar', editForm.aadhar);
      formData.append('phone', editForm.phone);
      formData.append('email', editForm.email);
      formData.append('investment_as', editForm.investment_as);
      formData.append('panTanNo', editForm.panTanNo);
      formData.append('gstNo', editForm.gst);
      formData.append('investmentValue', editForm.investment_value);
      formData.append('investmentDate', editForm.investment_date);
      formData.append('finalRefNo', editForm.final_ref_no);
      formData.append('rentAccountNumber', editForm.bank_account);
      formData.append('rentIfsc', editForm.ifsc);
      formData.append('rentBankName', editForm.bank_name);
      formData.append('rentBranch', editForm.branch);
      formData.append('courierTrackingNumber', editForm.courier_tracking_no);
      formData.append('firstRentDate', editForm.first_rent_date);
      formData.append('nextRentDate', editForm.next_rent_date);
      formData.append('lastRentDate', editForm.last_rent_date);
      formData.append('vehicleTrackingUrl', editForm.vehicle_tracking_url);
      formData.append('_method', 'PUT');

      editForm.token_payments.forEach((tp, index) => {
        if (tp.amount || tp.payment_date || tp.utr) {
          formData.append(`tokenPayments[${index}][amount]`, tp.amount || '');
          formData.append(`tokenPayments[${index}][date]`, tp.payment_date || '');
          formData.append(`tokenPayments[${index}][utr]`, tp.utr || '');
          if (tp.id) formData.append(`tokenPayments[${index}][id]`, String(tp.id));
        }
      });

      if (editForm.panTanDoc) formData.append('panTanDoc', editForm.panTanDoc);
      if (editForm.aadhar_doc_file) formData.append('aadharDoc', editForm.aadhar_doc_file);
      if (editForm.gst_doc_file) formData.append('gstDoc', editForm.gst_doc_file);
      if (editForm.cancelled_cheque_file) formData.append('cancelledChequeDoc', editForm.cancelled_cheque_file);
      if (editForm.notary_agreement_file) formData.append('notaryAgreementDoc', editForm.notary_agreement_file);
      if (editForm.stamp_paper_file) formData.append('stampPaperDoc', editForm.stamp_paper_file);
      if (editForm.invoice_file) formData.append('invoiceDoc', editForm.invoice_file);
      if (editForm.courier_doc_file) formData.append('courierTrackingDoc', editForm.courier_doc_file);
      if (editForm.latest_rent_receipt_file) formData.append('latestRentReceiptDoc', editForm.latest_rent_receipt_file);

      const response = await fetch(`${API_BASE_URL}/${editingId}`, {
        method: 'POST',
        headers: authHeaders(),   // ✅ fresh token
        body: formData,
      });

      // ✅ Handle session expiry
      if (response.status === 401) {
        handle401();
        return;
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Update failed');
      }

      showNotification('Record updated successfully', 'success');
      await fetchRecords();
      handleCancel();
    } catch (error) {
      console.error('Update error:', error);
      showNotification(
        error instanceof Error ? error.message : 'Failed to update record',
        'error'
      );
    } finally {
      setSaving(false);
    }
  }, [editForm, editingId, showNotification, fetchRecords, handleCancel, handle401]);

  /* ===========================
     Delete Handler
     =========================== */
  const handleDelete = useCallback(async (id: number) => {
    if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) return;

    setDeleting(String(id));
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),   // ✅ fresh token
      });

      // ✅ Handle session expiry
      if (response.status === 401) {
        handle401();
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Delete failed');
      }

      showNotification('Record deleted successfully', 'success');
      await fetchRecords();
    } catch (error) {
      console.error('Delete error:', error);
      showNotification(
        error instanceof Error ? error.message : 'Failed to delete record',
        'error'
      );
    } finally {
      setDeleting(null);
    }
  }, [showNotification, fetchRecords, handle401]);

  /* ===========================
     Render Loading State
     =========================== */
  if (loading && records.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="mt-4 text-slate-600 font-semibold">Loading records...</p>
        </div>
      </div>
    );
  }

  /* ===========================
     Main Render
     =========================== */
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
          notification.type === 'success' ? 'bg-emerald-500 text-white' :
          notification.type === 'error'   ? 'bg-rose-500 text-white' :
                                            'bg-indigo-500 text-white'
        }`}>
          {notification.type === 'success' && <CheckCircle2 size={20} />}
          {notification.type === 'error'   && <AlertCircle size={20} />}
          <p className="font-bold text-sm">{notification.message}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 uppercase">Admin Dashboard</h1>
              <p className="text-xs font-bold text-slate-400">
                {loading ? 'Loading...' : `${records.length} Records Found`}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              to="/admin/database-form"
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg hover:bg-indigo-700 transition-all"
            >
              <Plus size={16} /> New Entry
            </Link>
            <button
              onClick={handleLogout}
              className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Table */}
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
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Email</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Phone</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Inv. Value</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Next Rent</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Status</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.map((rec) => (
                    <tr key={rec.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 pl-4 font-bold text-slate-700 text-sm"># {rec.sr_no}</td>
                      <td className="py-4 font-bold text-slate-500 text-xs">{rec.date}</td>
                      <td className="py-4 font-bold text-slate-800 text-xs uppercase">{rec.pan}</td>
                      <td className="py-4 text-slate-600 text-xs">{rec.email}</td>
                      <td className="py-4 text-slate-600 text-xs">{rec.phone}</td>
                      <td className="py-4 font-bold text-emerald-600 text-xs">₹{rec.investment_value}</td>
                      <td className="py-4 font-bold text-slate-500 text-xs">{rec.next_rent_date || '-'}</td>
                      <td className="py-4">
                        <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">
                          Active
                        </span>
                      </td>
                      <td className="py-4 text-right pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(rec.id)}
                            className="p-2 bg-white border border-slate-200 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleEdit(rec.id)}
                            className="p-2 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(rec.id)}
                            disabled={deleting === String(rec.id)}
                            className="p-2 bg-white border border-slate-200 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === String(rec.id)
                              ? <Loader2 size={14} className="animate-spin" />
                              : <Trash2 size={14} />
                            }
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Modal — moved outside table */}
      {viewingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto overscroll-contain p-8 my-8">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
              <h2 className="text-2xl font-black text-slate-800 uppercase">Record Details #{viewingRecord.sr_no}</h2>
              <button onClick={handleCloseView} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              {Object.entries(viewingRecord).map(([key, value]) =>
                key !== 'token_payments' ? (
                  <div key={key} className="flex gap-2 border-b py-1">
                    <span className="font-bold text-slate-600 w-56 capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span className="text-slate-800 break-all">{value === null ? '-' : String(value)}</span>
                  </div>
                ) : null
              )}
              {viewingRecord.token_payments?.length > 0 && (
                <div className="mt-4">
                  <div className="font-bold text-slate-600 mb-2">Token Payments:</div>
                  <div className="space-y-1">
                    {viewingRecord.token_payments.map((tp, idx) => (
                      <div key={tp.id || idx} className="pl-4 border-l-2 border-indigo-200 mb-1">
                        <div><span className="font-semibold">Amount:</span> {tp.amount}</div>
                        <div><span className="font-semibold">Date:</span> {tp.payment_date}</div>
                        <div><span className="font-semibold">UTR:</span> {tp.utr}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={handleCloseView}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase hover:bg-slate-200 transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal — moved outside table */}
      {editingId && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto overscroll-contain p-8 my-8">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
              <h2 className="text-2xl font-black text-slate-800 uppercase">Edit Record #{editForm.srNo}</h2>
              <button onClick={handleCancel} className="p-2 hover:bg-slate-100 rounded-xl transition-colors" disabled={saving}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Sr No</label>
                  <input type="text" value={editForm.srNo}
                    onChange={(e) => handleInputChange('srNo', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Date</label>
                  <input type="date" value={editForm.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">PAN</label>
                  <input type="text" value={editForm.pan}
                    onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Phone</label>
                  <input type="text" value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Email</label>
                  <input type="email" value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              </div>

              {/* Investment */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Investment Value</label>
                  <input type="number" value={editForm.investment_value}
                    onChange={(e) => handleInputChange('investment_value', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Investment Date</label>
                  <input type="date" value={editForm.investment_date}
                    onChange={(e) => handleInputChange('investment_date', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">GST</label>
                  <input type="text" value={editForm.gst}
                    onChange={(e) => handleInputChange('gst', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Final Ref No</label>
                  <input type="text" value={editForm.final_ref_no}
                    onChange={(e) => handleInputChange('final_ref_no', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              </div>

              {/* Banking */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Bank Account</label>
                  <input type="text" value={editForm.bank_account}
                    onChange={(e) => handleInputChange('bank_account', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">IFSC</label>
                  <input type="text" value={editForm.ifsc}
                    onChange={(e) => handleInputChange('ifsc', e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Bank Name</label>
                  <input type="text" value={editForm.bank_name}
                    onChange={(e) => handleInputChange('bank_name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Branch</label>
                  <input type="text" value={editForm.branch}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              </div>

              {/* Rent Dates */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">First Rent Date</label>
                  <input type="date" value={editForm.first_rent_date}
                    onChange={(e) => handleInputChange('first_rent_date', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Next Rent Date</label>
                  <input type="date" value={editForm.next_rent_date}
                    onChange={(e) => handleInputChange('next_rent_date', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Last Rent Date</label>
                  <input type="date" value={editForm.last_rent_date}
                    onChange={(e) => handleInputChange('last_rent_date', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
              </div>

              {/* Vehicle URL */}
              <div className="pt-4 border-t">
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Vehicle Tracking URL</label>
                <input type="url" value={editForm.vehicle_tracking_url}
                  onChange={(e) => handleInputChange('vehicle_tracking_url', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="https://..." />
              </div>

              {/* Token Payments */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-xs font-black text-indigo-600 uppercase">Token Payments</label>
                  <button type="button" onClick={addTokenPayment}
                    className="flex items-center gap-1 text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all">
                    <Plus size={14} /> Add Entry
                  </button>
                </div>
                {editForm.token_payments.map((tp, index) => (
                  <div key={index} className="grid grid-cols-3 gap-3 mb-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Amount</label>
                      <input type="number" value={tp.amount}
                        onChange={(e) => handleTokenPaymentChange(index, 'amount', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Date</label>
                      <input type="date" value={tp.payment_date}
                        onChange={(e) => handleTokenPaymentChange(index, 'payment_date', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">UTR</label>
                        <input type="text" value={tp.utr}
                          onChange={(e) => handleTokenPaymentChange(index, 'utr', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                      </div>
                      {editForm.token_payments.length > 1 && (
                        <button type="button" onClick={() => removeTokenPayment(index)}
                          className="p-2 text-rose-400 hover:text-rose-600 mb-0.5">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t sticky bottom-0 bg-white">
              <button onClick={handleSave} disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {saving
                  ? <><Loader2 size={18} className="animate-spin" /> Saving...</>
                  : <><Save size={18} /> Save Changes</>
                }
              </button>
              <button onClick={handleCancel} disabled={saving}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase hover:bg-slate-200 transition-all disabled:opacity-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;