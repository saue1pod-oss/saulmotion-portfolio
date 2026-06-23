'use server'

import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ActionResult =
  | {success: true}
  | {error: string}

export async function sendContactEmail(formData: FormData): Promise<ActionResult> {
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  if (!name || !email || !message) {
    return {error: 'Please fill in all fields.'}
  }

  if (!process.env.RESEND_API_KEY) {
    return {error: 'Email service is not configured yet.'}
  }

  try {
    await resend.emails.send({
      // Replace with your verified Resend domain sender once set up.
      // For sandbox testing use: onboarding@resend.dev
      from: 'onboarding@resend.dev',
      to: 'hello@saulmotion.com',
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return {success: true}
  } catch {
    return {error: 'Something went wrong. Please try again.'}
  }
}
