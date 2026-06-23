'use client'

import {useRef, useState, useTransition} from 'react'
import {sendContactEmail, type ActionResult} from './actions'

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: 'rgba(245,245,240,0.4)',
  display: 'block',
  marginBottom: 8,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#161616',
  border: '0.5px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: 13,
  color: 'rgba(245,245,240,0.8)',
  outline: 'none',
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [result, setResult] = useState<ActionResult | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await sendContactEmail(data)
      setResult(res)
      if ('success' in res && res.success) {
        formRef.current?.reset()
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <div>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          style={{...inputStyle, height: 120, resize: 'none'}}
        />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start'}}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: isPending ? 'rgba(255,69,78,0.5)' : '#FF454E',
            color: '#fff',
            borderRadius: 999,
            padding: '12px 28px',
            fontSize: 12,
            fontWeight: 500,
            border: 'none',
            cursor: isPending ? 'not-allowed' : 'pointer',
            transition: 'opacity 150ms',
          }}
        >
          {isPending ? 'Sending…' : 'Send message →'}
        </button>

        {result && 'success' in result && result.success && (
          <p style={{fontSize: 13, color: '#FF454E'}}>
            Message sent! I&apos;ll get back to you soon.
          </p>
        )}

        {result && 'error' in result && (
          <p style={{fontSize: 13, color: 'rgba(255,80,80,0.8)'}}>
            {result.error}
          </p>
        )}
      </div>
    </form>
  )
}
