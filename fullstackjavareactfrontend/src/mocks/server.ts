// src/mocks/server.ts
// sets up and exports the mock server using msw/node. It imports the handlers defined in handlers.ts and passes them to setupServer from msw/node. 
// This server intercepts HTTP requests made during tests and responds with the predefined mock data.

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)