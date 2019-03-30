import axios from 'axios'

export default axios.create({
  baseURL: 'http://127.0.0.1:3333/api/v1/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})
