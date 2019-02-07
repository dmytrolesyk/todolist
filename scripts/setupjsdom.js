Object.defineProperty(global, 'fetch', { value: () => {}, writable: false })
Object.defineProperty(global, 'localStorage', { value: { getItem: () => {}, setItem: () => {}, removeItem: () => {} }, writable: false })
