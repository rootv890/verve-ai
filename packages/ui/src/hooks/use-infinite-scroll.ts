/**
 * useInfiniteScroll - Plan
 *
 * 1. Props:
 *    - status: 'CanLoadMore' | 'LoadingMore' | 'Exhausted' | 'LoadingFirstPage'
 *    - loadSize: number (default: 10)
 *    - loadMore: () => void
 *    - observerEnabled: boolean (auto load or manual load more)
 *
 * 2. Functionality:
 *    - Create a ref for the top element.
 *    - Define handleLoadMore (useCallback):
 *        - If status is 'CanLoadMore', call loadMore(loadSize).
 *    - useEffect:
 *        - If observerEnabled and topElement exists:
 *            - Create IntersectionObserver:
 *                - On intersect and status is 'CanLoadMore', call handleLoadMore.
 *                - Use threshold: 0.1.
 *            - Observe topElement.
 *            - Cleanup: disconnect observer on unmount or dependency change.
 *
 * 3. Return:
 *    - topElementRef
 *    - handleLoadMore
 *    - canLoadMore: status === 'CanLoadMore'
 *    - isLoadingMore: status === 'LoadingMore'
 *    - isLoadingFirstPage: status === 'LoadingFirstPage'
 *    - isExhausted: status === 'Exhausted'
 */

import React from "react"

interface UseInfiniteScrollProps {
	status: "CanLoadMore" | "LoadingMore" | "Exhausted" | "LoadingFirstPage"
	loadSize?: number
	loadMore: (numItems: number) => void
	observerEnabled: boolean
}

export const useInfiniteScroll = ({
	loadMore,
	observerEnabled,
	status,
	loadSize = 10,
}: UseInfiniteScrollProps) => {
	const topElementRef = React.useRef<HTMLDivElement | null>(null)
	const handleLoadMore = React.useCallback(() => {
		if (status === "CanLoadMore") {
			loadMore(loadSize)
		}
	}, [status, loadMore, loadSize])

	React.useEffect(() => {
		// early return
		const topElement = topElementRef.current
		if (!observerEnabled || !topElement) return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && status === "CanLoadMore") {
					handleLoadMore()
				}
			},
			{
				threshold: 0.1,
			}
		)

		// call observe
		observer.observe(topElement)
		// clean up return
		return () => {
			observer.disconnect()
		}
	}, [observerEnabled, topElementRef, handleLoadMore, status])

	// returns
	return {
		topElementRef,
		handleLoadMore,
		canLoadMore: status === "CanLoadMore",
		isLoadingMore: status === "LoadingMore",
		isLoadingFirstPage: status === "LoadingFirstPage",
		isExhausted: status === "Exhausted",
	}
}
