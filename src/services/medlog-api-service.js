import config from '../config'
import TokenService from '../services/token-service'

const MedLogApiService = {
  getEntries() {
    return fetch(`${config.API_ENDPOINT}/medlog`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {

      
        if(!res.ok)
          {res.json().then(e => Promise.reject(e))}
          return res.json()
          
      })
      .then(data => {
        return data
      })

  },

  getEntry(entryId) {
    return fetch(`${config.API_ENDPOINT}/medlog/${entryId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postEntry(date, time, medname, amounttaken, reason) {
    return fetch(`${config.API_ENDPOINT}/medlog`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        date,
        time,
        medname,
        amounttaken,
        reason
       
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default MedLogApiService;