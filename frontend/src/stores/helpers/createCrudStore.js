export const executeAction = async ({
  set,
  action,
  onSuccess,
}) => {
  try {
    set({
      loading: true,
      error: null,
    })

    const result = await action()

    if (onSuccess) {
      onSuccess(result)
    }

    return result
  } catch (error) {
    set({
      error: error.message,
    })

    throw error
  } finally {
    set({
      loading: false,
    })
  }
}