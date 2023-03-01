import axios from "axios";

const API_DOMAIN = "http://localhost:3000/playServer";

export const fileListAPI = (path, keyword) => {
  return axios.get(`${API_DOMAIN}/api/pageIndex`).then(
    response => {
      console.log('成功了', response.data)
      return response.data
    },
    error => {
      console.log('失败了', error)
    }
  )
}

export const createFolderAPI = (params) => {
  return axios.post(`${API_DOMAIN}/api/createFolder`, params).then(
    response => {
      console.log('成功了', response.data)
      return response.data
    },
    error => {
      console.log('失败了', error)
    }
  )
}

// const API = {fileList}
// export default API;
