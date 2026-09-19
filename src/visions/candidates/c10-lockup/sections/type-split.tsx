type SplitProps = {
  text: string
  className?: string
  id?: string
  kind?: string
  decorative?: boolean
}

function chars(text: string) {
  return Array.from(text).map((ch, i) => (
    <span key={i} data-char className="inline-block" aria-hidden>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))
}

export function SplitChars({
  text,
  className,
  id,
  kind = 'chars',
  decorative = false,
  as: Tag = 'span',
}: SplitProps & { as?: 'span' | 'h1' | 'h2' | 'p' }) {
  return (
    <Tag
      id={id}
      className={className}
      aria-label={decorative ? undefined : text}
      aria-hidden={decorative || undefined}
      data-type={kind}
    >
      {chars(text)}
    </Tag>
  )
}

export function SplitWords({
  text,
  className,
  id,
  kind = 'words',
  as: Tag = 'p',
}: SplitProps & { as?: 'span' | 'h2' | 'p' }) {
  const words = text.split(' ')
  return (
    <Tag id={id} className={className} aria-label={text} data-type={kind}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block" aria-hidden>
            {word}
          </span>
          {i < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Tag>
  )
}

