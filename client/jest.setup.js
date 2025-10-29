import '@testing-library/jest-dom'

// Polyfill for Request/Response
global.Request = class Request {}
global.Response = class Response {}
global.Headers = class Headers {}
