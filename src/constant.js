export const darkColorTheme = {
    primaryColor: 'black',
    secondaryColor: "#121212",
    divider: '#FFFFFF19',
    primaryTextColor: '#fff',
    secondaryTextColor: '#909091',
    accentColor: '#115BCA'
}
let api_url, file_url

if (process.env.REACT_APP_NODE_ENV === 'development') {
    api_url = process.env.REACT_APP_LOCAL_API_URL
    file_url = process.env.REACT_APP_LOCAL_FILE_URL
} else {
    api_url = process.env.REACT_APP_PRODUCTION_API_URL
    file_url = process.env.REACT_APP_PRODUCTION_FILE_URL
}

export const API_URL = api_url
export const FILE_URL = file_url