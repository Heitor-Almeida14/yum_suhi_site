"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CalendarCheck, CheckCircle2, Instagram, Loader2, Phone, Send } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const TIME_SLOTS = ["19:00", "20:30", "21:00", "22:30"] as const;
const GUEST_OPTIONS = ["2 pessoas", "4 pessoas", "6 pessoas", "8 pessoas", "Mesa do Chef"] as const;

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
  notes: "",
};

const LABELS: Record<keyof FormState, string> = {
  name: "Nome completo",
  email: "E-mail",
  phone: "Telefone (opcional)",
  date: "Data",
  time: "Horário",
  guests: "Pessoas",
  notes: "Observações / restrições alimentares",
};

/** Validação espelha o contrato do endpoint /api/reservations */
function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 3) errors.name = "Informe o nome completo.";
  else if (!/^[\p{L}\p{M}'’\s.-]+$/u.test(form.name.trim())) errors.name = "O nome contém caracteres inválidos.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = "Informe um e-mail válido.";

  if (form.phone.trim() && !/^[0-9()+\-\s]{8,20}$/.test(form.phone.trim()))
    errors.phone = "Telefone inválido. Use apenas números, espaços e ( ) + -.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
    errors.date = "Escolha a data da reserva.";
  } else {
    const d = new Date(`${form.date}T12:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const max = new Date(today);
    max.setDate(max.getDate() + 90);
    if (Number.isNaN(d.getTime()) || d < today || d > max)
      errors.date = "A data deve estar entre hoje e os próximos 90 dias.";
  }

  if (!form.time) errors.time = "Selecione um horário disponível.";
  if (!form.guests) errors.guests = "Selecione o número de pessoas.";
  if (form.notes.length > 600) errors.notes = "Observações com no máximo 600 caracteres.";
  return errors;
}

export function Reservas() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d.toISOString().slice(0, 10);
  }, []);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError("");
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clientErrors = validate(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (res.ok && data.ok) {
        setSuccess(data.message ?? "Solicitação recebida.");
      } else {
        const serverErrors = data.errors ?? {};
        const { _form, ...fields } = serverErrors;
        setErrors(fields as Partial<Record<keyof FormState, string>>);
        setFormError(_form ?? "Revise os campos destacados e tente novamente.");
      }
    } catch {
      setFormError("Falha de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass = (field: keyof FormState) =>
    `field ${errors[field] ? "field-error" : ""}`;

  return (
    <section id="reservas" aria-label="Reservas" className="relative overflow-hidden py-28 sm:py-36">
      {/* Fundo com imagem esbatida */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/reservas.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#090C0A_0%,rgba(9,12,10,0.86)_45%,#090C0A_100%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[88rem] gap-16 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-14">
        {/* Texto lateral */}
        <div>
          <SectionHeading eyebrow="O Balcão de Reservas" title={["Garanta sua", "Mesa"]} />

          <Reveal delay={200}>
            <p className="mt-10 max-w-lg text-[0.95rem] leading-[1.95] font-light text-cream/85">
              O salão recebe grupos, famílias e comemorações — e os finais de semana enchem
              rápido. Para garantir a mesa no horário que você quer, envie a solicitação com
              antecedência: a equipe confirma pelo telefone ou pelo Instagram.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-10 space-y-6">
              <li className="flex items-center gap-5">
                <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Phone className="h-4.5 w-4.5" strokeWidth={1.1} />
                </span>
                <div>
                  <p className="text-[0.58rem] font-semibold tracking-[0.34em] text-sand uppercase">
                    Reservas & Informações
                  </p>
                  <a
                    href="tel:+5511923674541"
                    className="font-display mt-1 block text-xl font-light text-ivory transition-colors hover:text-gold-light"
                  >
                    +55 (11) 92367-4541
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Instagram className="h-4.5 w-4.5" strokeWidth={1.1} />
                </span>
                <div>
                  <p className="text-[0.58rem] font-semibold tracking-[0.34em] text-sand uppercase">
                    Instagram oficial
                  </p>
                  <a
                    href="https://www.instagram.com/yumsushioficialsp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display mt-1 block text-xl font-light text-ivory transition-colors hover:text-gold-light"
                  >
                    @yumsushioficialsp
                  </a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={380}>
            <p className="mt-10 max-w-lg border-t border-line pt-6 text-[0.6rem] leading-relaxed font-medium tracking-[0.24em] text-sand/70 uppercase">
              Ambiente de demonstração — a solicitação é registrada no site, mas a confirmação
              da mesa deve ser feita pelo telefone ou Instagram.
            </p>
          </Reveal>
        </div>

        {/* Formulário */}
        <Reveal delay={160}>
          <div className="glass-card relative p-7 sm:p-10">
            {success ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
                <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <CheckCircle2 className="h-7 w-7" strokeWidth={1.1} />
                </span>
                <h3 className="font-display mt-7 text-3xl font-light text-ivory">
                  Pedido Recebido!
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed font-light text-cream/80">
                  {success}
                </p>
                <p className="mt-4 max-w-sm text-[0.6rem] leading-relaxed font-medium tracking-[0.26em] text-sand/80 uppercase">
                  Demonstração — a confirmação da mesa deve ser feita pelo telefone ou Instagram
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(INITIAL);
                    setSuccess(null);
                  }}
                  className="btn-outline mt-9"
                >
                  <span>Nova Solicitação</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center gap-4">
                  <CalendarCheck className="h-5 w-5 text-gold" strokeWidth={1.2} aria-hidden="true" />
                  <h3 className="font-display text-2xl font-light text-ivory">Pedido de Reserva</h3>
                </div>
                <p className="mt-3 text-[0.6rem] font-medium tracking-[0.3em] text-sand uppercase">
                  Confirmação pelo telefone ou Instagram
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="res-name" className="mb-2.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand uppercase">
                      {LABELS.name} *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Como devemos recebê-lo?"
                      value={form.name}
                      onChange={set("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "res-name-error" : undefined}
                      className={fieldClass("name")}
                    />
                    {errors.name && (
                      <p id="res-name-error" role="alert" className="mt-2 text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-email" className="mb-2.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand uppercase">
                      {LABELS.email} *
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      autoComplete="email"
                      placeholder="voce@email.com"
                      value={form.email}
                      onChange={set("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "res-email-error" : undefined}
                      className={fieldClass("email")}
                    />
                    {errors.email && (
                      <p id="res-email-error" role="alert" className="mt-2 text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-phone" className="mb-2.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand uppercase">
                      {LABELS.phone}
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+55 (11) 90000-0000"
                      value={form.phone}
                      onChange={set("phone")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "res-phone-error" : undefined}
                      className={fieldClass("phone")}
                    />
                    {errors.phone && (
                      <p id="res-phone-error" role="alert" className="mt-2 text-xs text-destructive">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-date" className="mb-2.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand uppercase">
                      {LABELS.date} *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={minDate}
                      max={maxDate}
                      value={form.date}
                      onChange={set("date")}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? "res-date-error" : undefined}
                      className={`${fieldClass("date")} [color-scheme:dark]`}
                    />
                    {errors.date && (
                      <p id="res-date-error" role="alert" className="mt-2 text-xs text-destructive">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="res-time" className="mb-2.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand uppercase">
                      {LABELS.time} *
                    </label>
                    <select
                      id="res-time"
                      value={form.time}
                      onChange={set("time")}
                      aria-invalid={!!errors.time}
                      aria-describedby={errors.time ? "res-time-error" : undefined}
                      className={`${fieldClass("time")} appearance-none`}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t} className="bg-[#0E1310]">
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p id="res-time-error" role="alert" className="mt-2 text-xs text-destructive">
                        {errors.time}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="res-guests" className="mb-2.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand uppercase">
                      {LABELS.guests} *
                    </label>
                    <select
                      id="res-guests"
                      value={form.guests}
                      onChange={set("guests")}
                      aria-invalid={!!errors.guests}
                      aria-describedby={errors.guests ? "res-guests-error" : undefined}
                      className={`${fieldClass("guests")} appearance-none`}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      {GUEST_OPTIONS.map((g) => (
                        <option key={g} value={g} className="bg-[#0E1310]">
                          {g}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p id="res-guests-error" role="alert" className="mt-2 text-xs text-destructive">
                        {errors.guests}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="res-notes" className="mb-2.5 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand uppercase">
                      {LABELS.notes}
                    </label>
                    <textarea
                      id="res-notes"
                      rows={3}
                      placeholder="Aniversários, cadeirinha, restrições alimentares…"
                      value={form.notes}
                      onChange={set("notes")}
                      aria-invalid={!!errors.notes}
                      aria-describedby={errors.notes ? "res-notes-error" : undefined}
                      className={`${fieldClass("notes")} resize-none`}
                    />
                    {errors.notes && (
                      <p id="res-notes-error" role="alert" className="mt-2 text-xs text-destructive">
                        {errors.notes}
                      </p>
                    )}
                  </div>
                </div>

                {formError && (
                  <p role="alert" className="mt-6 border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {formError}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn-gold mt-9 w-full disabled:cursor-wait disabled:opacity-70">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Enviando…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Enviar Solicitação</span>
                    </>
                  )}
                </button>

                <p className="mt-5 text-center text-[0.6rem] leading-relaxed font-medium tracking-[0.24em] text-sand/70 uppercase">
                  Campos com * são obrigatórios
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
