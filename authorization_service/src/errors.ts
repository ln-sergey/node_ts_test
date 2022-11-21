export class ClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    toJSON() {
        return {
            error: this.message,
        };
    }
}

export class ValueError extends ClientError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PropertyError extends ClientError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends ClientError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}