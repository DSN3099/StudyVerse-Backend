import jwt from 'jsonwebtoken'
export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token
  console.log(req.cookies)
  if (!token) return res.status(401).send('Please login first')
  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.clearCookie('access_token')
        return res.status(403).send(err)
      }
    }
    req.user = payload
    next()
  })
}