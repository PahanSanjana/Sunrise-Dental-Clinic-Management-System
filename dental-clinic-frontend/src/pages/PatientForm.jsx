import React, { useState } from 'react';
import './Patients.css';

const emptyForm = {
  fullName: '',
  dob: '',
  gender: 'Female',
  phone: '',
  email: '',
  address: '',
  medicalHistory: '',
  emergencyName: '',
  emergencyPhone: '',
  portalAccess: false,
};

const PatientForm = ({ onSave, onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    const value = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!form.phone.trim()) next.phone = 'Contact number is required';
    if (!form.address.trim()) next.address = 'Home address is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave && onSave(form);
  };

  const handleClear = () => {
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="rp-page">
      <div className="rp-blob rp-blob-1" />
      <div className="rp-blob rp-blob-2" />

      <div className="rp-inner">
        <div className="rp-header">
          <div>
            <div className="rp-title">Register patient</div>
            <div className="rp-subtitle">Add a new patient to the clinic records</div>
          </div>
        </div>

        <div className="glass-card rp-form-card">
          {/* Personal info */}
          <div className="rp-form-section">
            <div className="rp-section-title">Personal information</div>
            <div className="rp-form-grid">
              <div className="rp-field full">
                <label className="rp-label">Full name<span className="req">*</span></label>
                <input
                  className="rp-input"
                  placeholder="e.g. Amara Perera"
                  value={form.fullName}
                  onChange={update('fullName')}
                />
                {errors.fullName && <span style={{ color: '#A24438', fontSize: 12 }}>{errors.fullName}</span>}
              </div>

              <div className="rp-field">
                <label className="rp-label">Date of birth</label>
                <input type="date" className="rp-input" value={form.dob} onChange={update('dob')} />
              </div>

              <div className="rp-field">
                <label className="rp-label">Gender</label>
                <div className="rp-segmented">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={form.gender === g ? 'active' : ''}
                      onClick={() => update('gender')(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="rp-form-section">
            <div className="rp-section-title">Contact information</div>
            <div className="rp-form-grid">
              <div className="rp-field">
                <label className="rp-label">Contact number<span className="req">*</span></label>
                <input
                  className="rp-input"
                  placeholder="+94 71 234 5678"
                  value={form.phone}
                  onChange={update('phone')}
                />
                {errors.phone && <span style={{ color: '#A24438', fontSize: 12 }}>{errors.phone}</span>}
              </div>

              <div className="rp-field">
                <label className="rp-label">Email address</label>
                <input
                  type="email"
                  className="rp-input"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={update('email')}
                />
              </div>

              <div className="rp-field full">
                <label className="rp-label">Home address<span className="req">*</span></label>
                <textarea
                  className="rp-textarea"
                  placeholder="Street, city, postal code"
                  value={form.address}
                  onChange={update('address')}
                />
                {errors.address && <span style={{ color: '#A24438', fontSize: 12 }}>{errors.address}</span>}
              </div>

              <div className="rp-field">
                <label className="rp-label">Emergency contact name</label>
                <input
                  className="rp-input"
                  placeholder="Full name"
                  value={form.emergencyName}
                  onChange={update('emergencyName')}
                />
              </div>

              <div className="rp-field">
                <label className="rp-label">Emergency contact number</label>
                <input
                  className="rp-input"
                  placeholder="+94 71 234 5678"
                  value={form.emergencyPhone}
                  onChange={update('emergencyPhone')}
                />
              </div>
            </div>
          </div>

          {/* Medical info */}
          <div className="rp-form-section">
            <div className="rp-section-title">Medical history</div>
            <div className="rp-form-grid">
              <div className="rp-field full">
                <label className="rp-label">Notes (optional)</label>
                <textarea
                  className="rp-textarea"
                  placeholder="Allergies, ongoing conditions, previous procedures..."
                  value={form.medicalHistory}
                  onChange={update('medicalHistory')}
                />
              </div>
            </div>
          </div>

          {/* Portal access */}
          <div className="rp-form-section">
            <div className="rp-toggle-row">
              <div className="rp-toggle-copy">
                <div className="rp-toggle-title">Portal access</div>
                <div className="rp-toggle-desc">Let this patient view appointments and bills online</div>
              </div>
              <button
                type="button"
                className={`rp-toggle ${form.portalAccess ? 'on' : ''}`}
                onClick={() => update('portalAccess')(!form.portalAccess)}
                aria-label="Toggle portal access"
              >
                <span />
              </button>
            </div>
          </div>

          <div className="rp-form-actions">
            <button className="rp-btn ghost" onClick={onCancel}>Cancel</button>
            <button className="rp-btn" onClick={handleClear}>Clear</button>
            <button className="rp-btn primary" onClick={handleSave}>Save patient</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
