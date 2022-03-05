class injectClass {

    constructor(params) {
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
        if (params.pre !== undefined)
            this.pre = params.pre;
        if (params.at !== undefined)
            this.at = params.at;
        if (params.post !== undefined)
            this.post = params.post;
        this.cancellable = params.cancellable === undefined ? false : params.cancellable;
        everyModifications.push(this)
    }

    pre() {

    }

    at() {

    }

    post() {

    }

}