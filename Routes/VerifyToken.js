import jwt from 'jsonwebtoken'
export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).send('Please login first')
  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) return res.status(403).send('Please login first')
    req.user = payload
    next()
  })
}
