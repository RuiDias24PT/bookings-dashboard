import { ref, onMounted, onUnmounted } from 'vue'

export function useAutoRefresh(
  intervalSeconds = 60,
  onRefresh: () => void
) {
  const secondsToRefresh = ref(intervalSeconds)
  const pauseLiveUpdates = ref(false)
  const isTabActive = ref(!document.hidden)

  let refreshInterval: number | null = null
  let countdownInterval: number | null = null

  const handleVisibilityChange = () => {
    isTabActive.value = !document.hidden
  }

  const start = () => {
    if (!refreshInterval) {
      refreshInterval = window.setInterval(() => {
        if (!isTabActive.value || pauseLiveUpdates.value) return

        onRefresh()
        secondsToRefresh.value = intervalSeconds
      }, intervalSeconds * 1000)
    }

    if (!countdownInterval) {
      countdownInterval = window.setInterval(() => {
        if (!isTabActive.value || pauseLiveUpdates.value) return

        if (secondsToRefresh.value > 0) {
          secondsToRefresh.value--
        }
      }, 1000)
    }
  }

  const stop = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }

    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    start()
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    stop()
  })

  return {
    secondsToRefresh,
    pauseLiveUpdates,
    start,
    stop
  }
}
