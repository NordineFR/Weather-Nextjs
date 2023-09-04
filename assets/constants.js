import { HiOutlineHome, HiOutlineMap } from 'react-icons/hi';
import {RxDashboard} from 'react-icons/rx'
import {TbHeart,TbMapPinHeart} from 'react-icons/tb';
import {FiSettings} from 'react-icons/fi';
import {LuCalendarDays} from 'react-icons/lu';
// export const genres = [
//   { title: 'Pop', value: 'POP' },
//   { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
//   { title: 'Dance', value: 'DANCE' },
//   { title: 'Electronic', value: 'ELECTRONIC' },
//   { title: 'Soul', value: 'SOUL_RNB' },
//   { title: 'Alternative', value: 'ALTERNATIVE' },
//   { title: 'Rock', value: 'ROCK' },
//   { title: 'Latin', value: 'LATIN' },
//   { title: 'Film', value: 'FILM_TV' },
//   { title: 'Country', value: 'COUNTRY' },
//   { title: 'Worldwide', value: 'WORLDWIDE' },
//   { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
//   { title: 'House', value: 'HOUSE' },
//   { title: 'K-Pop', value: 'K_POP' },
// ];

export const links = [
  { name: 'Dashboard', to: '/', icon: RxDashboard },
  { name: 'Map', to: '/map', icon: HiOutlineMap },
  { name: 'Saved Location', to: '/saved-location', icon: TbHeart },
  { name: 'Calender', to: '/calender', icon: LuCalendarDays },
  { name: 'Settings', to: '/settings', icon: FiSettings },
];