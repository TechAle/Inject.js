everyModifications = []
links = []

function injectGlobal(html, toInject) {

    b = 0

    let globalInject = popNone(toInject)
    everyModifications = globalInject[0]

    globalInject = globalInject[1]

    let scripts = getScripts(html)

    return html
}

function popNone(toInject) {
    let outputInject = []
    let outputGlobal = []
    toInject.forEach(e => {
        if (e.function === "none")
            outputGlobal.push(e)
        else
            outputInject.push(e)
    })
    return [outputInject, outputGlobal]
}

function startIndexing() {
    calculateLinks()
    giveNames()
}

function calculateLinks() {
    links = []
    everyModifications.forEach(e => {
        if (e.function !== "none") {
            let found = false;
            let index = -1;
            for (let i = 0; i < links.length; i++) {
                if (e.file === links[i].file && e.method === links[i].method) {
                    found = true;
                    index = i;
                    break;
                }
            }
            if (!found) {
                links.push({file: e.file, method: e.method, toInject: [e]})
            } else {
                links[index].toInject.push(e);
            }
        }
    })
}

function giveNames() {
    Object.keys(functionsToInject).forEach(e => {
        functionsToInject[e].name = e;
    })
}
