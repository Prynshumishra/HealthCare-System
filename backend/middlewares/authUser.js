import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const token =
      req.headers.token ||
      req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login again'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user info safely
    req.user = {
      userId: decoded.id
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

export default authUser
