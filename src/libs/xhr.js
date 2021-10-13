import axios from "axios";

const request = axios.create({
  baseURL:''
})

function xhr(options) {
  let reqConfig = {
    method:options.method,
    url:options.url
  }
  return request(reqConfig)
}


export default xhr