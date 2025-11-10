// src/components/steps/Step1Contact.jsx
import React from "react";

export default function Step1Contact({
  formData,
  setFormData,
  handleChange,
  handlePhoto,
  setStep,
  handlemainpage,
}) {
  return (
    <div className="step">
      <div className="prewflex">
        <div>
          <strong style={{ marginRight: 10 }}>Build New Resume</strong>
        </div>
        
      </div>

      <h2>How would you like employers to contact you?</h2>

      <div className="formstep1">
        <div className="form-fields">
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Current Address (Optional)</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 123 Main Street"
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* State */}
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          {/* Zip */}
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>

          {/* LinkedIn */}
          <div className="form-group">
            <label>LinkedIn Profile URL (Optional)</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* Website */}
          <div className="form-group">
            <label>Website URL (Optional)</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="photo-upload">
          {formData.photo && (
            <img
              src={URL.createObjectURL(formData.photo)}
              alt="Profile"
              className="w-32 h-32 rounded"
            />
          )}
          <label>Photo (Optional)</label>
          <input type="file" accept="image/*" onChange={handlePhoto} />
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={handlemainpage}>Back</button>
        <button onClick={() => setStep(2)}>Save & Next</button>
      </div>
    </div>
  );
}
