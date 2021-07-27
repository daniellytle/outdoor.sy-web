class Parser {
    static get VALID_LINE_SEPARATORS_REGEX() { return /[,|]/; }
    static get VALID_LENGTH_STRING_REGEX() { return /([0-9]+)($|['’]| ft| feet)/; }
    static get INVALID_INPUT_ERROR_MESSAGE() { return "Invalid Input"; }

    static parseLine(type, line) {
        const separator = Parser.getSeparator(line);
        const lineItems = line.split(separator).map(item => item.trim());
        return new type(...lineItems);
    }

    static parseBlob(type, blob) {
        try {
            const items = [];
            blob.split("\n").forEach((line) => {
                const typeInstance = Parser.parseLine(type, line);
                items.push(typeInstance);
            });
            return items;
        } catch (error) {
            throw new Error(Parser.INVALID_INPUT_ERROR_MESSAGE);
        }
    }

    static getSeparator(line) {
        const match = line.match(Parser.VALID_LINE_SEPARATORS_REGEX);
        return match[0];
    }

    static parseLengthStringToInt(lengthString) {
        const match = lengthString.match(Parser.VALID_LENGTH_STRING_REGEX);
        if (match && match.length) {
            return parseInt(match[1]);
        } else {
            throw new Error(Parser.INVALID_INPUT_ERROR_MESSAGE);
        }
    }
}

module.exports = Parser
