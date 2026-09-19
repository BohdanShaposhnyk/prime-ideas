type DiscoverLineProps = {
  text: string
  as?: 'p' | 'h1' | 'h2' | 'h3'
  id?: string
  className?: string
}

/** Word spans for later rack-focus discovery. Resting type stays fully readable. */
export function DiscoverLine({
  text,
  as: Tag = 'p',
  id,
  className,
}: DiscoverLineProps) {
  const words = text.split(' ')

  return (
    <Tag id={id} data-type="discover-line" className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-type="word" className="inline-block">
          {word}
          {i < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Tag>
  )
}
