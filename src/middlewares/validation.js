import url from 'url'
import { ValidationError } from '../utils/error.js'
export default(req, res, next) => {
    try {
        const { pathname } = url.parse(req.url)
        switch (pathname) {
            case '/register': {
                const data = process.JOI.userScheme.validate(req.body)
                if(data.error) {
                    return next(new ValidationError(400, data.error))
                }
                return next()
            }
        }
        return next()

    } catch (error) {
        return next(error)
    }
}