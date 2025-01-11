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

export const modSidebarOverviewELemnet = [
    {
        title: 'Queues',
        icon: GrNotes,
        external_link: false
    },
    {
        title: 'Mod Mail',
        icon: FiMail,
        external_link: true
    },
    {
        title: 'Scheduled Posts and Events',
        icon: CiCalendarDate,
        external_link: false
    },
    {
        title: 'Restricted Users',
        icon: PiHammer,
        external_link: false
    },
    {
        title: 'Mods & Members',
        icon: IoPeopleOutline,
        external_link: false
    },
    {
        title: 'Insights',
        icon: BsGraphUpArrow,
        external_link: false
    }
]

export const modSidebarModerationELemnet = [
    {
        title: 'Rules',
        icon: CgNotes,
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
        external_link: false
    },
    {
        title: 'Posts & Comments',
        icon: MdOutlineSpeakerNotes,
        external_link: false
    },
    {
        title: 'Look & Feel',
        icon: IoIosBrush,
        external_link: false
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

export const modQueuesAllcontentDropdown=['All content','Posts and comments','Posts','Comments','Awards']

export const modQueuesNewestFirstDropdown=['Newest First','Oldest First','Most Reported First']