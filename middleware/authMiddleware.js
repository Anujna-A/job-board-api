const jwt = require("jsonwebtoken")

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null

    console.log('Token received:', token)
    console.log('Secret:', process.env.JWT_SECRET)

    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

    const recruiterOnly = (req,res,next)=>{
        
        if(req.user.role !== 'recruiter'){
           return res.status(403).json({
                message:"access only for recruiters"
            })
        }
        next()
}

module.exports = {protect, recruiterOnly}