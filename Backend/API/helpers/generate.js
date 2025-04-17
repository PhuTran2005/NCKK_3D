// sinh token.
module.exports.generateToken = (length) => {
    const character =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;
    let result = "" ;
    for (let i = 0 ; i < length ; i++) {
        result += character.charAt(Math.floor(Math.random()*character.length)) ;
    }
    return result ;
}