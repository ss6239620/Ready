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

function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
    }).replace(',', '');
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

const validateEmail = (email) => {
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return 'Please enter a valid email address.';
    }
    return '';
};

const validateUserName = (value) => {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,14}[a-zA-Z0-9]$/.test(value)) {
        return 'Username must be 3-15 characters long and can only contain letters, digits, underscores, and hyphens.';
    }
    return '';
};

const validatePassword = (value) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/`~\-]).{8,}$/.test(value)) {
        return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
    }
    return '';
};

export { formatTimeDifference, truncateText, validateEmail,validateUserName,validatePassword,formatDate,formatTime }