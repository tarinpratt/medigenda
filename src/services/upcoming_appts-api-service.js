import config from '../config'
import TokenService from '../services/token-service'

const UpcomingApptsApiService = {
  getEntries() {
    return fetch(`${config.API_ENDPOINT}/upcoming_appts`, {
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
  getEntry(entryId) {
    return fetch(`${config.API_ENDPOINT}/upcoming_appts/${entryId}`, {
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

  postEntry(appt_date, appt_time, appt_doctor, appt_location, appt_purpose, appt_notes, copay, doc_bill, insurance_bill, upcoming_appt) {
    return fetch(`${config.API_ENDPOINT}/upcoming_appts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        appt_date,
        appt_time, 
        appt_doctor, 
        appt_location, 
        appt_purpose, 
        appt_notes, 
        copay,
        doc_bill,
        insurance_bill,
        upcoming_appt
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default UpcomingApptsApiService;