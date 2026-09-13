"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/content/profile";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

function validate(values: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) {
    errors.name = "Please add your name.";
  }
  if (!values.email.trim()) {
    errors.email = "An email is required so I can reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That email does not look complete.";
  }
  if (!values.message.trim()) {
    errors.message = "Tell me a little about the work.";
  } else if (values.message.trim().length < 20) {
    errors.message = "A little more context helps — at least a sentence or two.";
  }
  return errors;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [mailto, setMailto] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate({ name, email, message });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        mailto?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setServerMessage(
          data.error ?? "The form could not be sent. Use email instead.",
        );
        return;
      }

      setMailto(data.mailto ?? `mailto:${profile.email}`);
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setServerMessage(
        "The network dropped the note. Email me directly and it will still arrive.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-border bg-card p-6 sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
          Sent
        </p>
        <h2 className="font-display mt-3 text-3xl">I have the note.</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          There is no mail server attached to this studio yet, so your message
          was checked and prepared locally. Open your mail client to actually
          deliver it — or write {profile.email} yourself.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={mailto} className={buttonVariants({ size: "lg" })}>
            Open mail draft
          </a>
          <Button
            variant="outline"
            onClick={() => {
              setStatus("idle");
              setMailto("");
            }}
          >
            Write another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-md border border-border bg-card p-6 sm:p-8"
    >
      <p className="text-sm text-muted-foreground">
        Empty fields stay empty until you fill them. I read every note myself.
      </p>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {serverMessage}
        </p>
      ) : null}

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(event) => setName(event.target.value)}
            className="h-10"
          />
          {errors.name ? (
            <p id="name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10"
          />
          {errors.email ? (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            value={message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What you are hiring for, or the problem you want solved."
            className="min-h-32"
          />
          {errors.message ? (
            <p id="message-error" className="text-sm text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === "submitting"} size="lg">
          {status === "submitting" ? "Checking…" : "Send note"}
        </Button>
        <p className="text-xs text-muted-foreground">
          No newsletter, no CRM — just a prepared email.
        </p>
      </div>
    </form>
  );
}
