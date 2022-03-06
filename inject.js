everyModifications = []
links = []

function calculateLinks() {
    links = []
    everyModifications.forEach(e => {
        let found = false;
        let index = -1;
        for(let i = 0; i < links.length; i++) {
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
    })
}