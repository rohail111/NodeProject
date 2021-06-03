const globalVariable = require('../constants/global')

module.exports = {
    parseTitle: (head) => {
        let match = head.match(/<title>([^<]*)<\/title>/)
        if (!match || typeof match[1] !== globalVariable.string)
            throw new Error(globalVariable.parseError)
        return match[1]
    }
}