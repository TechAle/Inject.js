DEBUG_ANALYSIS = false

// Main function
function analyzeHtml(input) {
    // Get every scripts
    const scripts = getScripts(input);
    // Get every functions of every scripts
    const functions = getFunctions(scripts);
    if (DEBUG_ANALYSIS) {
        console.log("Output: ")
        console.log(functions);
    }
    // Return output
    return functions;
}

function getScripts(input) {
    let output = [];
    let before = 0;

    while (true) {
        // Search for both script and \script
        let start = input.indexOf("<script>");
        let end = input.indexOf("<\/script>");
        // If one of them doesnt exists, exit
        if (start === -1 || end === -1)
            break
        // Push every references
        output.push({script: input.substr(start + 8, end - 8 - start), start: start + 8 + before})
        // Continue working with indexes
        before += end + 9;
        input = input.substr(end + 9)
    }
    return output;
}

function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

function getLenghtBody(script, nameFunction) {
    // Setup some variables
    let lastIdx = -1;
    let nOpen = 1;
    let nClosed = 0;
    // Our start is the first {
    let start = script.indexOf('{') + 1;
    script = script.substr(start)
    while (nOpen !== nClosed) {
        // Get position of {, }, why? So that we know which one is the closest
        let closedIdx = script.indexOf('}');
        let openedIdx = script.indexOf('{')
        // This should not happen
        if (closedIdx === -1)
            throw "Something is wrong in the body of the function " + nameFunction
        // If no { are found, then max number so that closedIdx will be the next
        else if (openedIdx === -1)
            openedIdx = Number.MAX_SAFE_INTEGER

        // If { is closest, incrase nOpen, else nClosed.
        let newIdx;
        if (closedIdx < openedIdx) {
            nClosed++;
            newIdx = closedIdx;
        } else {
            nOpen++;
            newIdx = openedIdx;
        }

        // Increase of 1 because indexOf does not count the character
        lastIdx += newIdx + 1;
        // new str
        script = script.substr(newIdx + 1)
    }

    return lastIdx + start;
}

function getFunctions(scripts, inside = false, father = null) {
    let output = [];

    // For every scripts
    for (let i = 0; i < scripts.length; i++) {
        if (DEBUG_ANALYSIS) {
            if (inside)
                console.log("Inside script " + (i + 1) + ":")
            else
                console.log("Script " + (i + 1) + ":")
        }
        output.push([])
        let toAdd = scripts[i].start;
        // Iterate for every functions
        let idxNew = 0;
        while (true) {
            // Check if there is a function
            let idx = scripts[i].script.indexOf("function");
            if (idx === -1)
                break
            else {
                /// Time to check the name of the function
                // Check normal function name -> function prova()
                let start = 8;
                let name = "";
                while (scripts[i].script[start + idx] !== '(') {
                    name += scripts[i].script[idx + start++]
                }
                name = name.replace(/\s/g, '');
                // Well, second kind of function: var test = function(a, b)
                if (name.length === 0) {
                    // Some variables for checking things
                    let down = 1;
                    let equals = false;
                    let startName = false;
                    while (true) {
                        // Get the character
                        let car = scripts[i].script[idx - (down++)];
                        // If we havent found = yet
                        if (!equals) {
                            // Check
                            if (car === '=')
                                equals = true;
                        } else {
                            // Else, if we havent started the name
                            if (!startName) {
                                // Check if the character is a variable name, if yes, we can continue
                                if (car !== ' ') {
                                    startName = true;
                                }
                            }
                            // Add it
                            if (startName) {
                                // If space, then we have it fully done
                                if (car === ' ')
                                    break
                                name += car;
                            }
                        }
                    }
                    // Remove spaces
                    name = name.replace(/\s/g, '');
                    // Reverse
                    name = reverseString(name);
                }
                /// There should be also ()=>{}, but idk for now i wont add it
                // Substring and lets prepare for after
                scripts[i].script = scripts[i].script.substr(idx + start)

                // Get the function's body
                let bodyOutput = getLenghtBody(scripts[i].script, name)
                if (DEBUG_ANALYSIS) {
                    console.log("Function: " + name)
                    console.log("Body: " + scripts[i].script.substr(0, bodyOutput + 1))
                }

                output[i].push({
                    name: name,
                    idx: idx + start + 1 + toAdd,
                    father: father,
                    insideFunctions: null
                })

                // Check if there are functions inside
                output[i][idxNew].insideFunctions = getFunctions([{
                        script: scripts[i].script.substr(0, bodyOutput + 1),
                        start: 0
                    }], true,
                    output[i][idxNew])
                toAdd += bodyOutput + idx + start + 1;


                scripts[i].script = scripts[i].script.substr(bodyOutput + 1)
                idxNew++;
            }
        }
    }

    return output;
}
