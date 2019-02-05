const http = {
  async get(url, token) {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    })
    const resData = await response.json()
    return resData
  },
  async post(url, data, token) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
    const resData = await response.json()
    return resData
  },
  async put(url, data, token) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
    const resData = await response.json()
    return resData
  },
  async delete(url, token) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
    const resData = await response.json()
    return resData
  },
}

export default http
