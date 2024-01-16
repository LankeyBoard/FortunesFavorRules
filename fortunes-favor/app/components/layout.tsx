import type { ReactElement } from 'react'

type layboutProps = {
    children: ReactElement;
}

export default function Layout({children}: layboutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}