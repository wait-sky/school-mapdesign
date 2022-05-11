const TOKEN = 'token'

// 存储 token
export function setToken(token) {
  window.localStorage.setItem(TOKEN, token)
}

// 获取 token
export function getToken() {
  return window.localStorage.getItem(TOKEN)
}

// 删除 token
export function deleteToken() {
  window.localStorage.removeItem(TOKEN)
}
