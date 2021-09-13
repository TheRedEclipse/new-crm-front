export const toastConfig = {
  duration: 5000,
  queue: true,
  action: {
    text: '×',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    },
  },
}
