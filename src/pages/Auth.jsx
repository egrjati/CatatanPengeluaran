import { useState } from "react";
import Logo from "@/assets/icon/notebook-mark.svg";
import {Eye, EyeOff} from "lucide-react";

// const handleSubmit(evt) => {
//   evt.preventDefault();

// }

function Auth() {
  // const [email, setemail] = useState("");
  // const [pw, setpw] = useState("");
  const [showPass, setPass] = useState(false);
  // const [err, seterr] = useState({}); 

    return (
      <div className="bg-black/10 h-screen overflow-hidden flex justify-center items-center px-4">
        <section className="w-full max-w-lg py-8 px-10 flex flex-col bg-white rounded-xl">
          <img src={Logo} alt="Logo Notebook" className="w-12 mb-4 mx-auto" />
          {/* title */}
          <div className="text-center">
            <h1 className="font-bold text-black/90 text-xl lg:text-2xl">
              Masuk ke Catatan Pengeluaran
            </h1>
            <p className="text-sm font-semibold mt-1 text-black/40">
              Lanjutkan mencatat pengeluaran harianmu.
            </p>
          </div>

          {/* From */}
          <form action="" className="w-full mt-6 flex flex-col gap-3">
            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-black/70 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-black/80 placeholder:text-black/40 focus:outline-none focus:border-[#2E7A62] focus:ring-1 focus:ring-[#2E7A62]"
              />
            </div>

            {/* kata sandi */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-black/70"
                >
                  Kata sandi
                </label>
                <a href="#" className="text-xs font-semibold text-[#2E7A62]">
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-4 pr-16 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-black/80 placeholder:text-black/40 focus:outline-none focus:border-[#2E7A62] focus:ring-1 focus:ring-[#2E7A62]"
                />
                <button
                  type="button"
                  onClick={ () => setPass((prev) => !prev)}
                  aria-label={showPass ? "Sembunyikan Kata sandi" : "Tampilkan kata sandi"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-black/50 cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-5"/> : <Eye className="w-5"/>}
                </button>
              </div>
            </div>

            {/* ingat saya */}
            <label
              htmlFor="ingat"
              className="flex items-center gap-2 text-sm text-black/60"
            >
              <input
                id="ingat"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-[#2E7A62]"
              />
              Ingat saya
            </label>

            {/* tombol masuk */}
            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-[#2E7A62] rounded-lg text-sm font-semibold text-white"
            >
              Masuk
            </button>
          </form>

          {/* pemisah */}
          <div className="w-full flex items-center gap-4 my-4">
            <hr className="flex-1 border-black/10" />
            <span className="text-xs text-black/40">atau</span>
            <hr className="flex-1 border-black/10" />
          </div>

          {/* google */}
          <button
            type="button"
            className="w-full py-2.5 bg-white border border-black/10 rounded-lg text-sm font-medium text-black/80"
          >
            Masuk dengan Google
          </button>

          {/* daftar */}
          <p className="text-center text-sm text-black/50 mt-6">
            Belum punya akun?{" "}
            <a href="#" className="font-semibold text-[#2E7A62]">
              Daftar
            </a>
          </p>
        </section>
      </div>
    );
}
export default Auth;
