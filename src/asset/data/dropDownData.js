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
        title: 'Edit Avtar',
        icon: IoShirtOutline
    },
    {
        title: 'Acheivements',
        icon: IoTrophyOutline
    },
    {
        title: 'Dark Mode',
        icon: CiDark
    },
    {
        title: 'Log Out',
        icon: CiLogout
    },
    {
        title: 'Settings',
        icon: CiSettings
    }
]
