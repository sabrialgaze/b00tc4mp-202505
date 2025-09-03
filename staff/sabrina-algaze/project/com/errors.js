export class ValidationError extends Error {
    constructor(message) {
        super(message)
    }
}

export class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message)
    }
}

export class CredentialsError extends Error {
    constructor(message) {
        super(message)
    }
}

export class OwnershipError extends Error {
    constructor(message) {
        super(message)
    }
}

export class SystemError extends Error {
    constructor(message) {
        super(message)
    }
}

export class SessionError extends Error {
    constructor(message) {
        super(message)
    }
}

export const errors = {
    ValidationError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    SystemError,
    SessionError
}
