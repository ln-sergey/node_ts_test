import jwt from "jsonwebtoken";
import util from 'util'

const signAsync = util.promisify(jwt.sign);

export async function generateToken(payload: object, secret: string) {
  try {
    const token = await signAsync(payload, secret);
    return Promise.resolve({
      accessToken: token,
    });
  } catch(e) {
    return Promise.reject(e);
  }
};