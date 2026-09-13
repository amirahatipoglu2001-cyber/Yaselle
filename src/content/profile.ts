/** House owner — the public contact inbox for Yaselle AI.
 *  Import `owner` from this file; do not hardcode the address in UI.
 *  Mailto drafts (no SMTP) are built in `@/lib/mail`.
 */
export const owner = {
  name: "Amira Hatipoğlu",
  email: "amirahatipoglu2001@gmail.com",
} as const;

export type Owner = typeof owner;
