"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  apartmentTitle: string;
  apartmentId: string;
  contactNumber?: string;
  className?: string;
};

export default function ContactModal({ apartmentTitle, apartmentId, contactNumber, className }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const isDisabled = !name || !email || !phone || !contactNumber;

  const openWhatsapp = () => {
    if (!contactNumber) return;
    const cleanPhone = String(contactNumber).replace(/\D/g, "");
    const message = `Olá! Meu nome é ${name}.\nEmail: ${email}\nTelefone: ${phone}\nTenho interesse no imóvel: ${apartmentTitle} - ID: ${apartmentId}`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!contactNumber}
        className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl font-medium shadow ${className || ""}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Falar no WhatsApp
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Solicitar contato</h3>
                  <p className="text-sm text-gray-500">Preencha seus dados e abriremos o WhatsApp.</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setOpen(false)} aria-label="Fechar">
                  ✕
                </button>
              </div>

              <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); openWhatsapp(); }}>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Nome</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome" className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="voce@email.com" className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Telefone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="(00) 00000-0000" className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <button type="submit" disabled={isDisabled} className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-medium">
                  Abrir WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


