import url from 'url'
export default(req, res, next) => {
    try {
        const { pathname } = url.parse(req.url)
        switch (pathname) {
            case '/register': {
                process.JOI.userScheme.validate(req.body)
                break
            }
        }

    } catch (error) {
        return next(error)
    }
}