import { Middleware } from '@nuxt/types'

const redirect: Middleware = (context) => {
  if(context.route.path == '/' || (context.route.path == '/search' && Object.keys(context.route.query).length === 0)){
    return context.redirect("trending");
  }
}

export default redirect