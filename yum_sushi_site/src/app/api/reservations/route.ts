import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const TIME_SLOTS = ["19:00", "20:30", "21:00", "22:30"] as const;
const GUEST_OPTIONS = ["2 pessoas", "4 pessoas", "6 pessoas", "8 pessoas", "Mesa do Chef"] as const;

const reservationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe o nome completo.")
    .max(120, "Nome muito longo.")
    .regex(/^[\p{L}\p{M}'’\s.-]+$/u, "O nome contém caracteres inválidos."),
  email: z.string().trim().toLowerCase().email("Informe um e-mail válido.").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9()+\-\s]{8,20}$/, "Telefone inválido. Use apenas números, espaços e ( ) + -.")
    .optional()
    .or(z.literal("")),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida.")
    .refine((value) => {
      const d = new Date(`${value}T12:00:00`);
      if (Number.isNaN(d.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const max = new Date(today);
      max.setDate(max.getDate() + 90);
      return d >= today && d <= max;
    }, "A data deve estar entre hoje e os próximos 90 dias."),
  time: z.enum(TIME_SLOTS, { message: "Selecione um horário disponível." }),
  guests: z.enum(GUEST_OPTIONS, { message: "Selecione o número de pessoas." }),
  notes: z.string().trim().max(600, "Observações com no máximo 600 caracteres.").optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: "Requisição inválida." } },
      { status: 400 }
    );
  }

  const parsed = reservationSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const { name, email, phone, date, time, guests, notes } = parsed.data;

  try {
    const saved = await db.reservation.create({
      data: {
        name,
        email,
        phone: phone || null,
        date,
        time,
        guests,
        notes: notes || null,
      },
    });

    return NextResponse.json({
      ok: true,
      id: saved.id,
      message:
        "Pedido registrado! Nossa equipe entrará em contato pelo e-mail ou telefone informados para confirmar a mesa.",
    });
  } catch (error) {
    console.error("[reservations] falha ao registrar:", error);
    return NextResponse.json(
      { ok: false, errors: { _form: "Não foi possível registrar a solicitação agora. Tente novamente em instantes." } },
      { status: 500 }
    );
  }
}
