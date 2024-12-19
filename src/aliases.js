function transformPattern(regex, aliases) {
    let regexString = regex.toString()
    regexString = regexString.substring(1, regexString.length - 1)
    Object.keys(aliases).forEach(alias => {
        regexString = regexString.replace(new RegExp(alias, 'g'), aliases[alias])
    })
    return new RegExp(regexString)
}

module.exports = (aliases) => (
    function applyGlobalChatAliases(moduleData) {
        const chatPatterns = moduleData.chatPatterns
        if (chatPatterns) {
            Object.keys(chatPatterns).forEach(patternKey => {
                const chatPattern = chatPatterns[patternKey]
                if (chatPattern instanceof Array) {
                    chatPattern.map(p => transformPattern(p, aliases))
                } else {
                    chatPatterns[patternKey] = transformPattern(chatPattern, aliases)
                }
            })
        }
    }
)