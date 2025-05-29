import { CiBookmark, CiDark, CiFlag1, CiLogout, CiSettings } from "react-icons/ci"
import { IoShirtOutline, IoTrophyOutline } from "react-icons/io5"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FaModx, FaRegEyeSlash } from "react-icons/fa"
import { PiWarningCircleBold } from "react-icons/pi"
import { AiFillWarning } from "react-icons/ai";

export const search_filter = [
    "Relevance", "Hot", "Top", "New", "Comment Count"
]

export const search_filter_time = [
    "All time", "Past year", "Past month", "Past week", "Today", "Past hour"
]

export const search_filter_safe = [
    "Off", "On"
]

export const post_filter_data = [
    {
        title: 'Follow Post',
        method: "follow_post",
        icon: IoMdNotificationsOutline
    },
    {
        title: 'Save',
        method: "save_post",
        icon: CiBookmark
    },
    {
        title: 'Hide',
        method: "hide_post",
        icon: FaRegEyeSlash
    },
    {
        title: 'Report',
        method: "report_post",
        icon: CiFlag1
    },
]

export const profile_dropDown = [
    {
        id: 'edit_avtar',
        title: 'Edit Avtar',
        icon: IoShirtOutline
    },
    {
        id: 'acheivements',
        title: 'Acheivements',
        icon: IoTrophyOutline
    },
    {
        id: 'dark_mode',
        title: 'Dark Mode',
        icon: CiDark
    },
    {
        id: 'log_out',
        title: 'Log Out',
        icon: CiLogout
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: CiSettings
    }
]

export const UnModerated_Post_DropDownData = [
    {
        title: 'Hide mod label',
        icon: FaModx
    },
    {
        title: 'Add NSFW tag',
        icon: AiFillWarning
    },
    {
        title: 'Add Spoiler Tag',
        icon: PiWarningCircleBold
    },
]
