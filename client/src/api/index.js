import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertGame = payload => api.post(`/game`, payload)
export const getAllGames = () => api.get(`/games`)
export const updateGameById = (id, payload) => api.put(`/game/${id}`, payload)
export const deleteGameById = id => api.delete(`/game/${id}`)
export const getGameById = id => api.get(`/game/${id}`)
export const startGameById = id => api.get(`/game/${id}/start`)
export const getPlayersForRoom = room_code => api.get(`/players_for_room/${room_code}`)

const apis = {
    insertGame,
    getAllGames,
    updateGameById,
    deleteGameById,
    getGameById,
    startGameById,
    getPlayersForRoom
}

export default apis