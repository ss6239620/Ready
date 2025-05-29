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

function getTimeLeft(isoDate) {
    const now = new Date();
    const target = new Date(isoDate);
    const diffMs = target - now;

    if (diffMs <= 0) {
        return "Expired";
    }

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} left`;
    if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} left`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} left`;
    return `${diffSec} second${diffSec > 1 ? 's' : ''} left`;
}


function truncateText(text, maxLength) {
    // Check if the length of the text is greater than the provided maxLength
    if (text?.length > maxLength) {
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

const validateEmptyString = (value) => {
    if (typeof value !== 'string' || value.trim() === '') {
        return 'Please enter a valid value. This field cannot be empty.';
    }
    return '';
};

// Custom debounce function (standalone, no lodash)
function debounce(func, delay) {
    let timeoutId;
    const debounced = (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timeoutId); // Add cancel method
    return debounced;
}

function getBanDurationInDays(banEndDate) {
    if (!banEndDate) {
        return -1; // Permanent ban
    }

    const now = new Date();
    const endDate = new Date(banEndDate);

    // Calculate the difference in milliseconds
    const diffMs = endDate - now;

    // Convert to full days
    const durationInDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return durationInDays;
}


export { getTimeLeft, debounce, formatTimeDifference, truncateText, validateEmail, validateUserName, validatePassword, formatDate, formatTime, validateEmptyString, getBanDurationInDays }