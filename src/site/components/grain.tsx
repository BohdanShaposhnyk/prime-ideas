const GRAIN =
  'url("data:image/webp;base64,UklGRngCAABXRUJQVlA4IGwCAABwCwCdASowADAAPuVeolApJaMivH34ASAciWkAFGB0g1TXNGYYNAfoBvyob90Xh/7wW6pUA6LJZENAzLv3utLCyvgchwQUsdVFM7u6/XCsZZ2jz2tHZZ0d5wnB++k2WRDLpYUAAPhgyPmCHV3/wK2hd7xEnVbt8Xmmsj/rea5iwGcoUqOsliIe1tEcmFvv10TcIzx7bbqoMvNeruhyv6OBYIBlNPOwR53/Ni0mobB71J4NG5s8SLh0AF84Fe++MZxG/1s/DypzOP+Vftg/dOt3rArvinJB5yGY2k478V4HayQLwJAmgc1Y29lZRuq9GtyuVCyvkR8b42AbOlb8bSqxMe1y6PPX5wdEPcg8UyvB5fbeRvvYOe7w9ikjEA6VzB5cVeTXeQEyUkerKpiwx+U4YYPTxN7SjppW2L46lvcXj1GtnHzj8sxAGi9EFhN1cndHqTWiKzzZJNngtE5nmXHfTHmO9jIvjbhfEYD/+agA/f7V5mqPQ2p8qAMtkGlJLG+bOBGe5FWFf0dtJr4LKC4XZdkAa7d3ueK7ZQf7nkMR5TDukEVa1ECRcNmojFLE6J9p/IBcR8anTfbWJoNZv5n/6rYfWJ6quvFacQuJwIn1/ciWvqSZjotGX3yTlSg/LrqSyi8QBDjyF6i8e63AAHSCKthAszIrQG97KOuFo5mayiCOyi9WV1ptHugVtwB0tK6epkqPNIa6gKcWDfpakfFUOdcPeLvhOi7FHBopn7koVZ6Z323VCSV4gCHEYTvXhoT3Aluj1UPQeAFYWSjJybJos5vo7wCiqWgbL7zwjUJAa69uhgbBt45nGgAAAA==")'

export function FilmGrain({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ backgroundImage: GRAIN, backgroundSize: '96px 96px' }}
      aria-hidden
    />
  )
}
