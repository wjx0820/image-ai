import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
      <div className="relative size-8 shrink-0">
        <Image
          src="/logo.svg"
          alt="Image AI"
          className="shrink-0 transition hover:opacity-75"
          fill
        />
      </div>
    </Link>
  )
}
