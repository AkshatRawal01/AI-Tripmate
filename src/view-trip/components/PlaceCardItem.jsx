import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

function PlaceCardItem({place}) {

   const [PhotoUrl,setPhotoUrl] = useState();
  
    useEffect(() => {
      place && GetPlacePhoto();
    }, [place]); // Dependency on trip
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: place.placeName
      }
  
      const result =await GetPlaceDetails(data).then((resp) => {
  
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
  
      });
    };
    
  return (
    <Link to ={'https://www.google.com/maps/search/?api=1&query='+ place.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-103 transition-all hover:shadow-md cursor-pointer'>
        <img src={PhotoUrl?PhotoUrl:"/placeholder.jpg"}
        className='w-[140px] h-[140px] rounded-xl object-cover'
        />
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            {/* <h2 className='text-lg bg-orange-600'>{details.bestTimeToVisit}</h2> */}
            <h2 className='mt-2'>🕙 {place.ticketPricing}</h2>
            <button><FaMapLocationDot /></button>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem