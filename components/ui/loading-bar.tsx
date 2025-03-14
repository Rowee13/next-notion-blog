'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'

interface LoadingBarProps {
    color?: string
    height?: number
    minDuration?: number
}

function LoadingBarContent({
    color = '#3b82f6', // Default blue color
    height = 3,
    minDuration = 800, // Minimum duration for the loading animation
}: LoadingBarProps) {
    const [visible, setVisible] = useState(false)
    const [progress, setProgress] = useState(0)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const completeTimerRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number>(0)
    const isFirstRender = useRef(true)
    const prevPathRef = useRef(pathname)

    // Function to complete the loading bar with a smooth finish
    const completeLoading = () => {
        const now = Date.now()
        const elapsedTime = now - startTimeRef.current

        // If we haven't reached the minimum duration, delay completion
        if (elapsedTime < minDuration) {
            // Continue progress to 90% during the remaining time
            const updateRemainingProgress = () => {
                const currentElapsed = Date.now() - startTimeRef.current
                const progressPercentage = Math.min(
                    (currentElapsed / minDuration) * 90,
                    90
                )
                setProgress(progressPercentage)

                if (currentElapsed < minDuration) {
                    timerRef.current = setTimeout(updateRemainingProgress, 16)
                } else {
                    // Once minimum duration is reached, go to 100%
                    setProgress(100)
                    setTimeout(() => {
                        setVisible(false)
                        setTimeout(() => setProgress(0), 100)
                    }, 300)
                }
            }

            // Clear any existing timer
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }

            // Start updating remaining progress
            timerRef.current = setTimeout(updateRemainingProgress, 16)
        } else {
            // If minimum duration already passed, complete immediately
            setProgress(100)
            setTimeout(() => {
                setVisible(false)
                setTimeout(() => setProgress(0), 100)
            }, 300)
        }
    }

    useEffect(() => {
        // Skip if it's the same path or initial render
        if (isFirstRender.current || prevPathRef.current === pathname) {
            isFirstRender.current = false
            prevPathRef.current = pathname
            return
        }

        // Update previous path
        prevPathRef.current = pathname

        // Clear any existing timers
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        if (completeTimerRef.current) {
            clearTimeout(completeTimerRef.current)
            completeTimerRef.current = null
        }

        // Reset and show
        setProgress(0)
        setVisible(true)
        startTimeRef.current = Date.now()

        // Start progress
        const updateProgress = () => {
            const elapsed = Date.now() - startTimeRef.current
            // Only go up to 90% with the timer
            const newProgress = Math.min((elapsed / minDuration) * 90, 90)
            setProgress(newProgress)

            if (newProgress < 90 && elapsed < minDuration) {
                timerRef.current = setTimeout(updateProgress, 16) // ~60fps
            }
        }

        // Start immediately
        updateProgress()

        // Force complete after a maximum time to ensure it always finishes
        completeTimerRef.current = setTimeout(() => {
            completeLoading()
        }, minDuration + 500) // Add buffer time

        return () => {
            // Clear all timers
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
            if (completeTimerRef.current) {
                clearTimeout(completeTimerRef.current)
                completeTimerRef.current = null
            }

            // Always ensure completion on unmount/route change
            completeLoading()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams, minDuration])

    // Don't render anything if not visible
    if (!visible) return null

    return (
        <div
            className='fixed top-0 left-0 right-0 z-50 pointer-events-none'
            style={{ height: `${height}px` }}
        >
            <div
                className='h-full transition-all ease-out duration-200'
                style={{
                    width: `${progress}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`,
                }}
            />
        </div>
    )
}

// Export the component wrapped in Suspense
export default function LoadingBar(props: LoadingBarProps) {
    return (
        <Suspense fallback={null}>
            <LoadingBarContent {...props} />
        </Suspense>
    )
}
