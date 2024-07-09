export const getUserIdFromSocket = (socket) => {
    return socket.handshake.query.userId;
}

export const getTime = () => {
    const now = new Date();
    let currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const system = currentHour >= 12 ? 'PM' : 'AM';
    // Convert to 12-hour format
    currentHour = currentHour % 12;
    currentHour = currentHour ? currentHour : 12; // Convert 0 to 12 for midnight
    return {
        currentHour: currentHour,
        currentMinute: currentMinute,
        system: system
    }
}