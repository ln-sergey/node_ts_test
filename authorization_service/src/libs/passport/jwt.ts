import jwt from "jsonwebtoken";
import util from 'util'

const signAsync = util.promisify(jwt.sign);

export const generateToken = async (payload: object, secret: string) => {
  try {
    const accessToken = await signAsync(payload, secret);
    return Promise.resolve({
      accessToken,
    });
  } catch(e) {
    return Promise.reject(e);
  }
};