export const generateRoomId = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const generateGameId = () => {
    var result = '';
    var caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var low = 'abcdefghijklmnopqrstuvwxyz';
    var dig = '0123456789';
    for (var i = 0; i < 6; i++) {
        result += caps.charAt(Math.floor(Math.random() * caps.length));
        result += low.charAt(Math.floor(Math.random() * low.length));
        result += dig.charAt(Math.floor(Math.random() * dig.length));
    }
    return result;
}