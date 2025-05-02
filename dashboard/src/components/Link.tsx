'use client'

// React Imports
import { forwardRef } from 'react'
import type { ForwardedRef, MouseEvent } from 'react'

// Next Imports
import NextLink from 'next/link'

type Props = {
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  children?: React.ReactNode
  className?: string
}

const Link = (props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { href, onClick, ...rest } = props

  return <NextLink ref={ref} {...rest} href={href || '/'} onClick={onClick ? e => onClick(e) : !href ? e => e.preventDefault() : undefined} />
}

export default forwardRef(Link)
