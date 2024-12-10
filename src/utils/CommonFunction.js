function formatTimeDifference(inputDate) {
    const now = new Date();
    const givenDate = new Date(inputDate);
    const diffInSeconds = Math.floor((now - givenDate) / 1000);

    // Calculate the time difference
    if (diffInSeconds < 60) {
        return `${diffInSeconds} sec`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} min`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hr`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day`;
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} month`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years} year`;
    }
}

function truncateText(text, maxLength) {
    // Check if the length of the text is greater than the provided maxLength
    if (text.length > maxLength) {
        // Truncate the text to maxLength and append '...'
        return text.substring(0, maxLength) + '...';
    } else {
        // If the text is within the limit, return it as is
        return text;
    }
}

export { formatTimeDifference,truncateText }