import 'vue-router'
export { }

declare module 'vue-router' {
  interface RouteMeta {
    auth: boolean
    layout: "main" | "auth"
  }
}