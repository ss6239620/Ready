import { GrNotes } from "react-icons/gr";
import { FiMail } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { PiHammer } from "react-icons/pi";
import { IoNotificationsSharp, IoPeopleOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { TfiComments } from "react-icons/tfi";
import { TbDeviceMobile, TbLogs, TbSettings } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineSecurity, MdOutlineSpeakerNotes } from "react-icons/md";
import { SiAutomattic } from "react-icons/si";
import { IoIosBrush } from "react-icons/io";
import { GoTrophy } from "react-icons/go";

export const routeMap = {
    // overview 
    'queue': { list: 'overview', key: 0 },
    'modmail': { list: 'overview', key: 1 },
    'scheduledposts': { list: 'overview', key: 2 },
    'restrictusers': { list: 'overview', key: 3 },
    'modandmember': { list: 'overview', key: 4 },
    'insight': { list: 'overview', key: 5 },

    // moderations 
    'rules': { list: 'moderation', key: 0 },
    'saved-responses': { list: 'moderation', key: 1 },
    'mod-log': { list: 'moderation', key: 2 },
    'auto-mod': { list: 'moderation', key: 3 },
    'safety-filters': { list: 'moderation', key: 4 },
    'automation': { list: 'moderation', key: 5 },

    // content 
    'wiki': { list: 'content', key: 0 },

    // settings 
    'generalsetting': { list: 'setting', key: 0 },
    'poastandcomments': { list: 'setting', key: 1 },
    'lookandfeel': { list: 'setting', key: 2 },
    'tribeguide': { list: 'setting', key: 3 },
    'notification': { list: 'setting', key: 4 },
    'achievements': { list: 'setting', key: 5 },
}

export const modSidebarOverviewELemnet = [
    {
        title: 'Queues',
        icon: GrNotes,
        external_link: false,
        route: 'queue',
    },
    // {
    //     title: 'Mod Mail',
    //     icon: FiMail,
    //     external_link: true
    // },
    // {
    //     title: 'Scheduled Posts and Events',
    //     icon: CiCalendarDate,
    //     external_link: false
    // },
    {
        title: 'Restricted Users',
        icon: PiHammer,
        external_link: false,
        route: 'restrict_user',
    },
    {
        title: 'Mods & Members',
        icon: IoPeopleOutline,
        external_link: false,
        route: 'moderators',
    },
    // {
    //     title: 'Insights',
    //     icon: BsGraphUpArrow,
    //     external_link: false
    // }
]

export const modSidebarModerationELemnet = [
    {
        title: 'Rules',
        icon: CgNotes,
        route: 'rules',
        external_link: false
    },
    {
        title: 'Saved Responses',
        icon: TfiComments,
        external_link: false
    },
    {
        title: 'Mod Log',
        icon: TbLogs,
        external_link: false
    },
    {
        title: 'Auto Mod',
        icon: RiRobot2Line,
        external_link: false
    },
    {
        title: 'Safety Filters',
        icon: MdOutlineSecurity,
        external_link: false
    },
    {
        title: 'Automation',
        icon: SiAutomattic,
        external_link: false
    },
]

export const modSidebarContentELemnet = [
    {
        title: 'Wiki',
        icon: TbDeviceMobile,
        external_link: false
    },
]


export const modSidebarSettingELemnet = [
    {
        title: 'General Settings',
        icon: TbSettings,
        external_link: false,
        route: 'general_settings'
    },
    {
        title: 'Posts & Comments',
        icon: MdOutlineSpeakerNotes,
        external_link: false,
    },
    {
        title: 'Look & Feel',
        icon: IoIosBrush,
        external_link: false,
        route: 'lookandfeel'
    },
    {
        title: 'Community Guide',
        icon: TbDeviceMobile,
        external_link: false
    },
    {
        title: 'Notifications',
        icon: IoNotificationsSharp,
        external_link: false
    },
    {
        title: 'Achievements',
        icon: GoTrophy,
        external_link: false
    },
]

export const modQueuesAllcontentDropdown = ['All content', 'Posts and comments', 'Posts', 'Comments', 'Awards']

export const modQueuesNewestFirstDropdown = ['Newest First', 'Oldest First', 'Most Reported First']

export const MOD_QUEUE_POST_STATUS = {
    APPROVED: 'APPROVED',
    REMOVED: 'REMOVED',
    EDITED: 'EDITED',
    NEED_REVIEW: 'NEED_REVIEW',
    UNMODERATED: 'UNMODERATED',
    REPORTED: 'REPORTED',
    SPAMMED: 'SPAMMED',
    LOCK: "LOCK",
    ADD_TO_HIGHLIGHT: "ADD_TO_HIGHLIGHT",
}

export const ModGeneralSettingTab = { General: "General", Privacy_and_Discovery: "Privacy & Discovery", Notifications: "Notifications" };

export const ModGeneralTabRowInput = [
    {
        id: 'display_name',
        title: "Display Name",
        desc: "vcet3"
    },
    {
        id: 'description',
        title: "Description",
        desc: "a college in vasai"
    },
    {
        id: 'welcome_message',
        title: "Welcome message",
        desc: ""
    },
    {
        id: 'comment_thread',
        title: "Comment threads",
        desc: ""
    }
]

export const ModPrivacyDiscoveryTabRowInput = [
    {
        id: 'tribe_type',
        title: "Tribe Type",
        desc: "Who can view and contribute to your Tribe",
        status: "Public",
        method_type: "icon"
    },
    {
        id: 'mature',
        title: "Mature (18+)",
        desc: "Restrict your Tribe to those who have confirmed they're over 18 and want to see NSFW content",
        status: "On",
        method_type: "icon"
    },
    {
        id: 'appear_in_tribe_field',
        title: "Appear in tribe feeds",
        desc: "Allow your tribes to appear in r/all, r/popular, and trending lists",
        status: "",
        method_type: "switch"
    },
    {
        id: 'appear_in_recommendations',
        title: "Appear in recommendations",
        desc: "Let Tribe App recommend your Tribe to people with similar interests",
        status: "",
        method_type: "switch"
    }
]

export const ModNotificationTabRowInput = [
    {
        id: 'allow_notification',
        title: "Allow Notifications",
        desc: "Turn off to stop any mod notifications from this tribe",
        method_type: "switch"
    },
    {
        id: 'activity',
        title: "Activity",
        method_type: "icon"
    },
    {
        id: 'mod_mail',
        title: "Mod Mail",
        method_type: "icon"
    },
    {
        id: 'reports',
        title: "Reports",
        method_type: "icon"
    },
    {
        id: 'milestones',
        title: "Milestones",
        desc: "Cake days and membership milestones",
        method_type: "switch"
    },
    {
        id: 'tips_tricks',
        title: "Tips & Tricks",
        desc: "Get tips and reminders to help you grow",
        method_type: "switch"
    },
]

export const ModLookAndFeelTabData = [
    {
        title: 'Tribe Appearence',
        desc: "Customize your community icon, banner image, and colors",
        id: "tribe_appearence",
    },
    {
        title: 'Post flair',
        desc: "Visual tags members of your community can add to their posts",
        id: "post_flair",
    },
    {
        title: 'User flair',
        desc: "Visual tags members of your community can add to their usernames",
        id: "user_flair",
    },
    {
        title: 'Custom emoji',
        desc: "Upload custom emoji to use in flair and community status",
        id: "custom_emoji",
    },
]