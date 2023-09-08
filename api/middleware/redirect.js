const redirectMap = [{ from: '/old-url', to: '/new-url' }]

/**
 * @type {import('express-serve-static-core').RequestHandler}
 */
export default (req, res, next) => {
  const redirect = redirectMap.find((r) =>
    new RegExp(`^${r.from}($|\\/|\\?|\\#)`).test(req.url)
  )
  if (redirect) {
    const [path, query] = req.url.split('?')
    let location = redirect.to
    if (query) location += `?${query}`
    res.writeHead(301, {
      Location: location,
    })
    res.end()
  } else {
    next()
  }
}
