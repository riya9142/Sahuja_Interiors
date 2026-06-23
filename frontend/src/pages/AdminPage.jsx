import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Trash2, LogOut, ImagePlus, Lock, Loader2 } from "lucide-react";
import {
  adminLogin,
  adminMe,
  isAuthed,
  clearToken,
  api,
  fileToResizedBase64,
} from "../lib/api";
import { SERVICES, CATEGORIES } from "../data/siteData";

// Two modes the admin can manage
const MODES = {
  services: {
    key: "services",
    label: "Real Images",
    sublabel: "What We Do",
    endpoint: "works",
    slugField: "service_slug",
    tabs: SERVICES.map((s) => ({ id: s.id, title: s.title })),
    byPath: (slug) => `/works/by-service/${slug}`,
  },
  portfolio: {
    key: "portfolio",
    label: "Reference Images",
    sublabel: "Selected Work",
    endpoint: "references",
    slugField: "category_slug",
    tabs: CATEGORIES.map((c) => ({ id: c.slug, title: c.name })),
    byPath: (slug) => `/references/by-category/${slug}`,
  },
};

export default function AdminPage() {
  const [booted, setBooted] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      setBooted(true);
      return;
    }
    adminMe()
      .then(() => {
        setAuthed(true);
        setBooted(true);
      })
      .catch(() => {
        clearToken();
        setBooted(true);
      });
  }, []);

  if (!booted)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-6 h-6 animate-spin text-[#8E8E8E]" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A]">
      <Toaster position="top-right" richColors />
      {authed ? (
        <Dashboard onLogout={() => { clearToken(); setAuthed(false); }} />
      ) : (
        <LoginForm onAuthed={() => setAuthed(true)} />
      )}
    </div>
  );
}

function LoginForm({ onAuthed }) {
  const [email, setEmail] = useState("rajankumarrolly01@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminLogin(email, password);
      toast.success("Welcome back");
      onAuthed();
    } catch (err) {
      const msg = err?.response?.data?.detail || "Login failed";
      toast.error(typeof msg === "string" ? msg : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-[#EAEAEA] p-10"
        data-testid="admin-login-form"
      >
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E8E8E]">Studio admin</span>
        </div>
        <h1 className="font-serif text-3xl lg:text-4xl font-light mb-10">Sign in</h1>

        <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8E8E8E] mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="admin-email"
          className="w-full border-b border-[#EAEAEA] py-3 outline-none focus:border-[#0A0A0A] bg-transparent mb-8"
          required
        />

        <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8E8E8E] mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="admin-password"
          className="w-full border-b border-[#EAEAEA] py-3 outline-none focus:border-[#0A0A0A] bg-transparent mb-10"
          required
        />

        <button
          type="submit"
          disabled={loading}
          data-testid="admin-login-button"
          className="w-full bg-[#0A0A0A] text-white py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#D4AF37] hover:text-[#0A0A0A] disabled:opacity-60 transition-colors"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-4 text-xs tracking-[0.25em] uppercase text-[#8E8E8E] hover:text-[#0A0A0A] py-2"
        >
          ← Back to site
        </button>
      </motion.form>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [mode, setMode] = useState("services"); // "services" or "portfolio"
  const config = MODES[mode];
  const [active, setActive] = useState(config.tabs[0].id);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  // Reset active tab when mode changes
  useEffect(() => {
    setActive(MODES[mode].tabs[0].id);
  }, [mode]);

  const load = async (slug) => {
    setLoading(true);
    try {
      const { data } = await api.get(config.byPath(slug));
      setItems(data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mode]);

  const onFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setUploading(true);
    let ok = 0, fail = 0;
    for (const file of files) {
      try {
        const b64 = await fileToResizedBase64(file, 1800, 0.82);
        const payload = {
          [config.slugField]: active,
          image_base64: b64,
          caption: caption || null,
        };
        await api.post(`/${config.endpoint}`, payload);
        ok += 1;
      } catch (e) {
        fail += 1;
      }
    }
    setUploading(false);
    setCaption("");
    if (ok) toast.success(`Uploaded ${ok} image${ok === 1 ? "" : "s"}`);
    if (fail) toast.error(`${fail} upload${fail === 1 ? "" : "s"} failed`);
    load(active);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this image? This cannot be undone.")) return;
    try {
      await api.delete(`/${config.endpoint}/${id}`);
      toast.success("Deleted");
      load(active);
    } catch {
      toast.error("Delete failed");
    }
  };

  const logout = () => {
    onLogout();
    toast.success("Signed out");
  };

  const activeTabTitle = config.tabs.find((t) => t.id === active)?.title;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
      {/* Topbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAEAEA]">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E8E8E] mb-2">Studio admin</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-light">Image Manager</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-xs tracking-[0.25em] uppercase text-[#0A0A0A] border border-[#0A0A0A] px-5 py-3 hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            View site
          </button>
          <button
            onClick={logout}
            data-testid="admin-logout"
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#0A0A0A] hover:text-[#D4AF37]"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Mode switcher */}
      <div className="grid grid-cols-2 gap-px bg-[#EAEAEA] border border-[#EAEAEA] mb-10" data-testid="admin-mode-switcher">
        {Object.values(MODES).map((m) => {
          const isActive = mode === m.key;
          return (
            <button
              key={m.key}
              data-testid={`admin-mode-${m.key}`}
              onClick={() => setMode(m.key)}
              className={`text-left p-6 lg:p-8 transition-colors ${
                isActive ? "bg-[#0A0A0A] text-white" : "bg-white hover:bg-[#FAFAFA]"
              }`}
            >
              <p className={`text-[10px] tracking-[0.3em] uppercase mb-2 ${isActive ? "text-[#D4AF37]" : "text-[#8E8E8E]"}`}>
                {m.sublabel}
              </p>
              <h3 className="font-serif text-xl lg:text-2xl font-light">{m.label}</h3>
            </button>
          );
        })}
      </div>

      {/* Category/service tabs */}
      <div className="flex flex-wrap gap-2 mb-10" data-testid="admin-tabs">
        {config.tabs.map((t) => (
          <button
            key={t.id}
            data-testid={`admin-tab-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`text-xs tracking-[0.22em] uppercase px-5 py-3 border transition-colors ${
              active === t.id
                ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                : "border-[#EAEAEA] text-[#555] hover:border-[#0A0A0A]"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Uploader */}
      <label
        className={`block border-2 border-dashed ${uploading ? "border-[#D4AF37] bg-[#FFFBEE]" : "border-[#EAEAEA] hover:border-[#0A0A0A]"} p-10 lg:p-14 text-center cursor-pointer transition-colors mb-4`}
        data-testid="admin-uploader"
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => onFiles(e.target.files)}
          data-testid="admin-file-input"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center">
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
          </div>
          <div>
            <p className="font-serif text-xl font-light mb-1">
              {uploading ? "Uploading…" : `Drop or select images for ${activeTabTitle}`}
            </p>
            <p className="text-xs text-[#8E8E8E] tracking-wider">
              JPG or PNG · multiple allowed · resized to 1800px
            </p>
          </div>
        </div>
      </label>

      <input
        type="text"
        placeholder="Optional caption for the next upload"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border border-[#EAEAEA] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A] mb-14"
        data-testid="admin-caption"
      />

      {/* Grid */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E8E8E]">
          {loading ? "Loading…" : `${items.length} image${items.length === 1 ? "" : "s"} in ${activeTabTitle}`}
        </p>
        {mode === "portfolio" && items.length === 0 && !loading && (
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8E8E8E]">
            Stock references shown on site until you upload
          </p>
        )}
      </div>

      {!loading && items.length === 0 && (
        <div className="border border-dashed border-[#EAEAEA] py-20 text-center">
          <p className="text-sm text-[#8E8E8E]">No images yet. Upload your first {activeTabTitle.toLowerCase()} image above.</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" data-testid="admin-grid">
        {items.map((w) => (
          <div key={w.id} className="group relative aspect-[4/5] bg-[#EAEAEA] overflow-hidden" data-testid={`admin-item-${w.id}`}>
            <img src={w.image_base64} alt={w.caption || "upload"} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors flex items-center justify-center">
              <button
                onClick={() => onDelete(w.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-4 py-2 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-red-600 hover:text-white"
                data-testid={`admin-delete-${w.id}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
            {w.caption && (
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs">
                {w.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
