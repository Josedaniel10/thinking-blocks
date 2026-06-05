import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
});


const getAllThoughts = async ()=> {
    const res = await api.get('/thoughts')
    return res.data
}

export { getAllThoughts }