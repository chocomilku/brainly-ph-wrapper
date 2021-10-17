module.exports = class BrainlyError extends Error {
    constructor (message) {
        super(message)
        this.name = "BrainlyError"
    }
}