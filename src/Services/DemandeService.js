import axios from 'axios'

const INSTRUCTOR = 'api'
const COURSE_API_URL = 'http://localhost:3000'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class DemandeService {

    retrieveAllClients(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/demandes`);
    }
}

export default new DemandeService()