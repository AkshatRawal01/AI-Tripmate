import { Link } from 'react-router-dom'
import React, {useEffect , useState} from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../Service/GlobalApi';



function HotelCardItem({hotel}) {

     const [PhotoUrl,setPhotoUrl] = useState();
    
      useEffect(() => {
        hotel && GetPlacePhoto();
      }, [hotel]); // Dependency on trip
    
      const GetPlacePhoto = async () => {
        const data = {
          textQuery: hotel?.hotelName
        }
    
        const result =await GetPlaceDetails(data).then((resp) => {
          console.log(resp.data.places[0].photos[3].name);
    
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          setPhotoUrl(PhotoUrl);
    
        });
      };

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel.hotelName+"," + hotel?.hotelAddress} target='_blank'>
    <div className='hover:scale-105 transition-all cursor-pointer'>
        <img className='rounded-xl h-[200px] w-full object-cover ' src={PhotoUrl?PhotoUrl:"/placeholder.jpg"}  />
       
        <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium'>{hotel?.hotelName}</h2>
            <h2 className='text-xs text-gray-600'>📍 {hotel?.hotelAddress}</h2>
            <h2 className='text-sm'>💰 {hotel?.price} per night</h2>
            <h2 className='text-sm'>⭐ {hotel?.rating}</h2>

        </div>
        </div>
        </Link>
  )
}

export default HotelCardItem