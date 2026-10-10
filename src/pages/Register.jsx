import Logo from "@/assets/icon/notebook-mark.svg";
import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import iconGoogle from "@/assets/icon/google.svg";

function Register() {
  const [daftarEmail, setDaftarEmail] = useState("")
  const [sandi, setSandi] = useState("");
  const [name, setName] =useState("");
  const [err, setErr] = useState({});
  const [showPass, setPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErr = {};

    // Name
    if (name.trim() === "") {
      newErr.name = "Nama wajib diisi";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErr.name = "Nama tidak valid";
    }


      // Email
      if (daftarEmail.trim() === "") {
        newErr.daftarEmail = "Email wajib diisi";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(daftarEmail.trim())) {
        newErr.daftarEmail = "Format tidak valid";
      }

    // Pw
    if (sandi.trim() === "") {
      newErr.sandi = "Password wajib diisi";
    } else if (sandi.length < 8 ) {
      newErr.sandi = "Minimal 8 karakter";
    } 


    setErr(newErr);
    if (Object.keys(newErr).length > 0) return;
  }

  return (
    <div className="bg-black/10 min-h-dvh flex justify-center items-center px-4 py-10 [@media(max-height:720px)]:py-4">
      <section className="w-full max-w-md py-7 [@media(max-height:720px)]:py-5 px-8 flex flex-col bg-white rounded-xl shadow-sm">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo Notebook"
          className="w-10 mb-3 mx-auto [@media(max-height:720px)]:w-8 [@media(max-height:720px)]:mb-2"
        />
        {/* title */}
        <div className="text-center">
          <h1 className="font-bold text-black/90 text-xl">Buat Akun Baru</h1>
          <p className="text-sm font-medium mt-1 text-black/40">
            Mulai catat pengeluaran harianmu dalam hitungan detik
          </p>
        </div>

        {/* From */}
        <form
          onSubmit={handleSubmit}
          className="w-full mt-5 flex flex-col gap-3 [@media(max-height:720px)]:mt-4 [@media(max-height:720px)]:gap-2.5"
        >
          {/* Nama Lengkap */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-black/70 mb-1.5"
            >
              Nama Lengkap
            </label>

            <input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErr({err, name: "" });
              }}
              type="text"
              placeholder="Wahyu Enggar Jati"
              className={`w-full px-3.5 py-2 bg-white border rounded-lg text-sm text-black/80 placeholder:text-black/40 focus:outline-none focus:border-[#2E7A62] focus:ring-1 focus:ring-[#2E7A62] ${err.name ? "border-red-500" : "border-black/20"}`}
            />

            {err.name && (
              <p className="text-red-500 text-xs">{err.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-black/70 mb-1.5"
            >
              Email
            </label>

            <input
              id="email"
              value={daftarEmail}
              onChange={(e) => {
                setDaftarEmail(e.target.value);
                setErr({...err, daftarEmail: ""})
              }}
              type="email"
              placeholder="nama@example.com"
              className={`w-full px-3.5 py-2 bg-white border rounded-lg text-sm text-black/80 placeholder:text-black/40 focus:outline-none focus:border-[#2E7A62] focus:ring-1 focus:ring-[#2E7A62] ${err.sandi ? "border-red-500" : "border-black/20"}`}
            />
            {err.daftarEmail && (
              <p className="text-red-500 text-xs font-medium">
                {err.daftarEmail}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-black/70 mb-1.5"
            >
              Kata sandi
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                value={sandi}
                onChange={(e) => {
                  setSandi(e.target.value);
                  setErr({ ...err, sandi: "" });
                }}
                placeholder="Minimal 8 karakter"
                className={`w-full pl-3.5 pr-12 py-2 bg-white border rounded-lg text-sm text-black/80 placeholder:text-black/40 focus:outline-none focus:border-[#2E7A62] focus:ring-1 focus:ring-[#2E7A62] ${err.sandi ? "border-red-500" : "border-black/20"}`}
              />

              <button
                type="button"
                onClick={() => setPass((prev) => !prev)}
                aria-label={
                  showPass ? "Sembunyikan Kata sandi" : "Tampilkan kata sandi"
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/50 cursor-pointer"
              >
                {showPass ? (
                  <EyeOff className="w-4.5" />
                ) : (
                  <Eye className="w-4.5" />
                )}
              </button>

              {err.sandi && (
                <p className="text-red-500 text-xs font-medium">{err.sandi}</p>
              )}
            </div>
          </div>

          {/* Setuju */}
          <label
            htmlFor="setuju"
            className="flex items-start gap-2 text-xs font-medium text-black/70"
          >
            <input
              id="setuju"
              type="checkbox"
              className="w-4 h-4 mt-px shrink-0 accent-[#2E7A62]"
            />
            <span>
              Saya setuju dengan{" "}
              <a href="#" className="text-[#2E7A62] font-semibold">
                Syarat Layanan
              </a>{" "}
              dan{" "}
              <a href="#" className="text-[#2E7A62] font-semibold">
                Kebijakan Privasi
              </a>
            </span>
          </label>

          {/* Daftar */}
          <button
            type="submit"
            className="w-full mt-1 py-2.5 bg-[#2E7A62] rounded-lg text-sm font-semibold text-white"
          >
            Daftar
          </button>
        </form>

        {/* pemisah */}
        <div className="w-full flex items-center gap-4 my-3">
          <hr className="flex-1 border-black/10" />
          <span className="text-xs text-black/40">atau</span>
          <hr className="flex-1 border-black/10" />
        </div>

        {/* google */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 bg-white border border-black/15 rounded-lg text-sm font-medium text-black/80"
        >
          <img src={iconGoogle} alt="" className="w-5" />
          Daftar dengan Google
        </button>

        {/* masuk */}
        <p className="text-center flex gap-1 text-sm text-black/50 mt-5">
          Sudah punya akun?{" "}
          <Link to="/" className="font-semibold text-[#2E7A62]">
            Masuk
          </Link>
        </p>
      </section>
    </div>
  );
}
export default Register;
