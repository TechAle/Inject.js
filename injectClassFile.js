class injectClass {

    constructor(params) {
        if (params.method === undefined)
            throw 'No method defined';
        if (params.file === undefined)
            throw 'No file defined';
        if (params.function === undefined)
            throw 'No function defined'
        if (params.pre === undefined && params.at === undefined && params.post === undefined)
            throw 'No body defined'
        if (params.at !== undefined && params.line === undefined)
            throw 'No line defined for at'
        this.file = params.file;
        this.function = params.function;
        this.method = params.method;
        if (params.pre !== undefined)
            this.pre = params.pre;
        else this.pre = null
        if (params.at !== undefined)
            this.at = params.at;
        else this.at = null
        if (params.post !== undefined)
            this.post = params.post;
        else this.post = null
        this.cancellablePre = params.cancellablePre === undefined ? false : params.cancellablePre;
        this.cancellableAt = params.cancellableAt === undefined ? false : params.cancellableAt;
        if (params.cancellablePost !== undefined && params.cancellablePost === true)
            throw "Why cancelling a function at the end of a function?"
        everyModifications.push(this)
        this.returnValue = undefined
    }

    pre() {

    }

    at() {

    }

    post() {

    }

    toReturn() {

    }

}