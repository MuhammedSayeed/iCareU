import jwt from 'jsonwebtoken'

export const generateCode = () => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    return verificationCode;
}
export const generateExpireDate = (minutes) => {
    const expireDate = new Date();
    return expireDate.setMinutes(expireDate.getMinutes() + minutes);

}
export const generateToken = (payload, time) => {
    if (time) {
        return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: `${time}m` })
    }
    return jwt.sign(payload, process.env.JWT_KEY)

}
export const clearVerificationCode = (user) => {
    user.verificationCode.code = "";
    user.verificationCode.expireDate = "";
}