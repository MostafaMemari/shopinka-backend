'use client'

import { useEffect, useState } from 'react'

export const useOtpTimer = (initialSeconds: number = 300) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)

      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const resetTimer = () => {
    setTimeLeft(initialSeconds)
    setIsExpired(false)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  return { timeLeft, isExpired, formatTime, resetTimer }
}
