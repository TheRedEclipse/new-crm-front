export default function ({ app, redirect, route }) {
  if (!app.$cookies.get('token')) {
    if (route.path !== '/login' && route.path !== '/initial-form') {
      return redirect('/login')
    } else if (
      process.client &&
      route.path !== '/' &&
      route.path !== '/login' &&
      route.path !== '/initial-form'
    ) {
      app.$toast.error('You need to log in')
    }
  }
}
