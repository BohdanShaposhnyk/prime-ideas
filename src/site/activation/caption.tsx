const lineClass =
  'absolute inset-x-0 top-full mt-1.5 text-balance text-center font-[family-name:var(--cs-body)] text-[0.62rem] leading-snug text-[var(--cs-caption)] [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]'

/** Small line under a booking button. It hangs below the control so a row of actions still lines up on the button. */
export function ActivationCaption() {
  return (
    <p className={lineClass}>
      Use code <span className="text-[var(--cs-gold)]">“PRIME”</span> to activate your account and get more
    </p>
  )
}

/** Short line under the footer booking button while the bottom banner is the active hint. */
export function ActivationFooterHint() {
  return (
    <p className={lineClass}>
      Activation code: <span className="text-[var(--cs-gold)]">PRIME</span>
    </p>
  )
}
