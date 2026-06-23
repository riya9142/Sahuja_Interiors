import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Mail, Phone, Send, Instagram } from "lucide-react";
import { Section } from "./Section";
import { BRAND } from "../data/siteData";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", address: "", message: "" };

const workerInitial = {
  name: "",
  email: "",
  phone: "",
  address: "",
  work_type: "",
  experience: "",
  message: ""
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [workerForm, setWorkerForm] = useState(workerInitial);
const [workerLoading, setWorkerLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thank you — we'll be in touch within 24 hours.");
      setForm(initial);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Couldn't submit right now. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Submission failed");
    } finally {
      setLoading(false);
    }
  };
  const onWorkerSubmit = async (e) => {
  e.preventDefault();

  if (
    !workerForm.name ||
    !workerForm.email ||
    !workerForm.phone ||
    !workerForm.work_type
  ) {
    toast.error("Please complete all required fields");
    return;
  }

  setWorkerLoading(true);

  try {
    await axios.post(
      `${API}/worker-registration`,
      workerForm
    );

    toast.success(
      "Application submitted successfully."
    );

    setWorkerForm(workerInitial);
  } catch {
    toast.error("Couldn't submit right now.");
  } finally {
    setWorkerLoading(false);
  }
};

  return (
    <>
    <Section id="contact" data-testid="contact-section" className="bg-[#0A0A0A] text-white">
      <Toaster position="bottom-right" richColors />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-5">
            Start a project
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light tracking-tight leading-[1.05] mb-8">
            Let's design something <em className="italic text-[#E8C876]">timeless</em>.
          </h2>
          <p className="text-white/70 font-light leading-relaxed mb-10 max-w-md">
            Tell us about your space — apartment, villa, office or restaurant — and we'll
            schedule a complimentary first consultation.
          </p>

          <ul className="space-y-6 border-t border-white/10 pt-8">
            <li className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-[#D4AF37] mt-1" />
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1">Email</div>
                <a href={`mailto:${BRAND.email}`} className="hover:text-[#D4AF37] transition-colors text-sm" data-testid="contact-email-link">
                  {BRAND.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#D4AF37] mt-1" />
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1">Phone</div>
                <a href={`tel:${BRAND.phone}`} className="hover:text-[#D4AF37] transition-colors text-sm" data-testid="contact-phone-link">
                  {BRAND.phone}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-10 flex items-center gap-4">
            <a href={BRAND.social.instagram} target="_blank" rel="noreferrer" className="w-11 h-11 border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-all" data-testid="social-instagram"><Instagram className="w-4 h-4" /></a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          data-testid="contact-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FloatingField label="Your Name" name="name" value={form.name} onChange={onChange} />
            <FloatingField label="Email Address" name="email" type="email" value={form.email} onChange={onChange} />
          </div>

          <FloatingField label="Phone Number" name="phone" value={form.phone} onChange={onChange} />

          <FloatingField label="Address"
          name="address" value={form.address}
          onChange={onChange} />

          <FloatingField label="Tell us about your project" name="message" value={form.message} onChange={onChange} textarea />

          <button
            type="submit"
            disabled={loading}
            data-testid="contact-submit-button"
            className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A0A0A] px-10 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? "Sending..." : "Send Inquiry"}
            <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.form>
      </div>
    </Section>
<div
  id="workers"
  className="bg-[#0A0A0A] text-white mt-24 border-t border-white/20 pt-20 px-6 lg:px-12"
>
  <h2 className="font-serif text-4xl mb-8">
    Looking for Interior Work?
  </h2>

  <p className="text-white/70 mb-10">
    Painters, Plumbers, Electricians,
    False Ceiling Experts, Tile Workers,
    Carpenters and other professionals
    can register here.
  </p>

  <form
    onSubmit={onWorkerSubmit}
    className="space-y-8"
  >
    <div className="grid md:grid-cols-2 gap-8">
      <FloatingField
        label="Full Name"
        name="name"
        value={workerForm.name}
        onChange={(e)=>
          setWorkerForm({
            ...workerForm,
            name:e.target.value
          })
        }
      />

      <FloatingField
        label="Email"
        name="email"
        value={workerForm.email}
        onChange={(e)=>
          setWorkerForm({
            ...workerForm,
            email:e.target.value
          })
        }
      />
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <FloatingField
        label="Phone Number"
        name="phone"
        value={workerForm.phone}
        onChange={(e)=>
          setWorkerForm({
            ...workerForm,
            phone:e.target.value
          })
        }
      />

      <FloatingField
        label="Address"
        name="address"
        value={workerForm.address}
        onChange={(e)=>
          setWorkerForm({
            ...workerForm,
            address:e.target.value
          })
        }
      />
    </div>

    <select
      value={workerForm.work_type}
      onChange={(e)=>
        setWorkerForm({
          ...workerForm,
          work_type:e.target.value
        })
      }
      className="w-full bg-[#0A0A0A] text-white border-b border-white/20 py-3"
    >
    <option value="" className="bg-[#0A0A0A] text-white">
  Select Work Type
</option>

<option className="bg-[#0A0A0A] text-white">Painter</option>
<option className="bg-[#0A0A0A] text-white">Plumber</option>
<option className="bg-[#0A0A0A] text-white">Electrician</option>
<option className="bg-[#0A0A0A] text-white">False Ceiling</option>
<option className="bg-[#0A0A0A] text-white">Tile Work</option>
<option className="bg-[#0A0A0A] text-white">Carpenter</option>
<option className="bg-[#0A0A0A] text-white">POP Work</option>
<option className="bg-[#0A0A0A] text-white">Welder</option>
<option className="bg-[#0A0A0A] text-white">Interior Contractor</option>
<option className="bg-[#0A0A0A] text-white">Other</option>
    </select>

    <FloatingField
      label="Years of Experience"
      name="experience"
      value={workerForm.experience}
      onChange={(e)=>
        setWorkerForm({
          ...workerForm,
          experience:e.target.value
        })
      }
    />

    <FloatingField
      textarea
      label="Additional Details"
      name="message"
      value={workerForm.message}
      onChange={(e)=>
        setWorkerForm({
          ...workerForm,
          message:e.target.value
        })
      }
    />

    <button
      type="submit"
      disabled={workerLoading}
      className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A0A0A] px-10 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white"
    >
      {workerLoading
        ? "Submitting..."
        : "Apply For Work"}
    </button>
  </form>
</div>
</>
  );  
}

function FloatingField({ label, name, value, onChange, type = "text", textarea = false }) {
  const common = "w-full bg-transparent border-b border-white/20 focus:border-[#D4AF37] outline-none py-3 text-white placeholder-transparent peer transition-colors";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          rows={4}
          className={common}
          data-testid={`contact-input-${name}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={common}
          data-testid={`contact-input-${name}`}
        />
      )}
      <label
        htmlFor={name}
        className="absolute left-0 -top-3 text-[10px] tracking-[0.25em] uppercase text-white/50 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-white/40 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:tracking-[0.25em] peer-focus:uppercase peer-focus:text-[#D4AF37] transition-all duration-300 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}
