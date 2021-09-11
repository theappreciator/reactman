const reverseString = (str: string) => {
    return str.split("").reverse().join("");
}

const convertKebabCaseToCamelCase = (str: string | undefined | null) => {
    if (str === undefined || str === null) {
        return undefined;
    }
    
    let first = true;
    return str.split("-").map(s => {
        if (first) {
            first = false;
            return s;
        }
        
        return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
    }).join("");
}

export {
    reverseString,
    convertKebabCaseToCamelCase
}