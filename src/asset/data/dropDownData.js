import { CiDark, CiLogout, CiSettings } from "react-icons/ci"
import { IoShirtOutline, IoTrophyOutline } from "react-icons/io5"

export const search_filter = [
    "Relevance", "Hot", "Top", "New", "Comment Count"
]

export const search_filter_time = [
    "All time", "Past year", "Past month", "Past week", "Today", "Past hour"
]

export const search_filter_safe = [
    "Off", "On"
]

export const profile_dropDown = [
    {
        id:'edit_avtar',
        title: 'Edit Avtar',
        icon: IoShirtOutline
    },
    {
        id:'acheivements',
        title: 'Acheivements',
        icon: IoTrophyOutline
    },
    {
        id:'dark_mode',
        title: 'Dark Mode',
        icon: CiDark
    },
    {
        id:'log_out',
        title: 'Log Out',
        icon: CiLogout
    },
    {
        id:'settings',
        title: 'Settings',
        icon: CiSettings
    }
]
