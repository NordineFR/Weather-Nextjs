import dynamic from 'next/dynamic';
import MyMap from '@/components/Map/Map'

const Map = dynamic(() => import('@/components/Map/Map'), {
    ssr: false,
  });


export default Map