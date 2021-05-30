import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

const http = {
  get: (url: string, params: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, params)
        .then((res) => {
          if (!!res && Number(res.status) === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
        .catch((err) => {
          if (err.response) {
            reject({ status: err.response.status, message: err.response.data })
          } else if (err.request) {
            // 未收到响应
            reject({ status: '0', message: err.request })
          } else {
            // 未知错误
            reject({ status: null, message: err.message })
          }
        })
    })
  },
  post: (url: string, params: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((res) => {
          if (!!res && Number(res.status) === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
        .catch((err) => {
          if (err.response) {
            reject({ status: err.response.status, message: err.response.data })
          } else if (err.request) {
            // 未收到响应
            reject({ status: '0', message: err.request })
          } else {
            // 未知错误
            reject({ status: null, message: err.message })
          }
        })
    })
  }
}

export default http
