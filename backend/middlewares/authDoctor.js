import jwt from 'jsonwebtoken'

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.dtoken

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login again'
      })
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.doctor = {
      docId: decoded.id
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

export default authDoctor
