import React, { useState } from "react";
import axios from "axios";

export default function ComplaintForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [complaintBody, setComplaintBody] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [category, setCategory] = useState("Select");

  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const complaint = {
      firstName,
      surname,
      title,
      address,
      complaintBody,
      email,
      telephone,
      category,
    };
    console.log(complaint);
    setIsPending(true);
    setSuccess(false);

    fetch("http://146.169.141.166:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(complaint),
    }).then(() => {
      setSuccess(true);
      setIsPending(false);
      setFirstName("");
      setSurname("");
      setTitle("");
      setAddress("");
      setComplaintBody("");
      setEmail("");
      setTelephone("");
    });
  };

  return (
    <div className="complaint-form-container">
      <h2 className="complaint-form-title">Submit a New Complaint:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label>First Name:</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label>Surname:</label>
          <input
            type="text"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label>Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label> Address, Postcode: </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label>Full Complaint:</label>
          <textarea
            required
            value={complaintBody}
            onChange={(e) => setComplaintBody(e.target.value)}
          ></textarea>
        </div>

        <div className="form-element">
          <label>Email:</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label>Telephone:</label>
          <input
            type="text"
            required
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label>Category </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Adult Social Care">Adult Social Care</option>
            <option value="Business">Business</option>
            <option value="Children's Services">Children's Services</option>
          </select>
        </div>

        {!isPending && (
          <button className="btn-submit-complaint">Submit Complaint</button>
        )}
        {isPending && (
          <button disabled className="btn-submit-complaint">
            Submitting Complaint ...
          </button>
        )}

        {success ? <p className="success-msg"> Success! </p> : ""}
      </form>
    </div>
  );
}
