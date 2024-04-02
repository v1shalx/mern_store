import jwt from 'jsonwebtoken';

export const generateToken = (req, res, userId) => {
  // Generating a JWT token for the authenticated user
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h'
  });

  // Setting the JWT as an HTTP-only cookie for enhanced security
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // Set to false for development on localhost
    sameSite: 'strict',
    maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
  });

  // Return the generated token
  return token;
};
