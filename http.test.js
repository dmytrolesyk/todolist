// const makeHttpClient = require('./http')

// let httpClient
// const mockFetch = jest.fn()


// beforeEach(() => {
//   httpClient = makeHttpClient(mockFetch)
//   mockFetch.mockReset()
// })

// test('calls get with correct params', () => {
//   const mockUrl = 'testurl'
//   const mockToken = 'testoken'
//   httpClient.get(mockUrl, mockToken)
//   expect(mockFetch.mock.calls.length).toBe(1)
//   const secondArgument = {
//     headers: {
//       Authorization: mockToken,
//     },
//   }
//   expect(mockFetch.mock.calls[0]).toEqual([mockUrl, secondArgument])
// })

// test('calls post with correct params', () => {
//   const mockUrl = 'testurl'
//   const mockToken = 'testoken'
//   const mockData = 'testdata'
//   httpClient.post(mockUrl, mockData, mockToken)
//   expect(mockFetch.mock.calls.length).toBe(1)
//   const secondArgument = {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: mockToken,
//     },
//     body: JSON.stringify(mockData),
//   }

//   expect(mockFetch.mock.calls[0]).toEqual([mockUrl, secondArgument])
// })

// test('calls put with correct params', () => {
//   const mockUrl = 'testurl'
//   const mockToken = 'testoken'
//   const mockData = 'testdata'
//   httpClient.put(mockUrl, mockData, mockToken)
//   expect(mockFetch.mock.calls.length).toBe(1)
//   const secondArgument = {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: mockToken,
//     },
//     body: JSON.stringify(mockData),
//   }
//   expect(mockFetch.mock.calls[0]).toEqual([mockUrl, secondArgument])
// })

// test('calls delete with correct params', () => {
//   const mockUrl = 'testurl'
//   const mockToken = 'testoken'
//   httpClient.delete(mockUrl, mockToken)
//   expect(mockFetch.mock.calls.length).toBe(1)
//   const secondArgument = {
//     method: 'DELETE',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: mockToken,
//     },
//   }
//   expect(mockFetch.mock.calls[0]).toEqual([mockUrl, secondArgument])
// })

const makeHttpClient = require('./http')

let httpClient
const mockFetch = jest.fn()


beforeEach(() => {
  httpClient = makeHttpClient(mockFetch)
  mockFetch.mockReset()
})

describe('HTTP module', () => {
  describe('GET method', () => {
    test('calls get with correct result', async () => {
      const mockUrl = 'testurl'
      const mockToken = 'testoken'
      const mockSuccessfulReponse = { id: 1, caption: 'task 1', completed: false }
      const mockJsonPromise = Promise.resolve(mockSuccessfulReponse)
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
      })
      mockFetch.mockReturnValue(mockFetchPromise)
      const data = await httpClient.get(mockUrl, mockToken)
      expect(data).toEqual({ id: 1, caption: 'task 1', completed: false })
    })
  })
})

// https://www.udemy.com/react-testing-with-jest-and-enzyme/
