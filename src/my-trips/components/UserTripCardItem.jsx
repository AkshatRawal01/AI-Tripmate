import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
     const [PhotoUrl,setPhotoUrl] = useState();
    
      useEffect(() => {
        trip && GetPlacePhoto();
      }, [trip]); // Dependency on trip
    
      const GetPlacePhoto = async () => {
        const data = {
          textQuery: trip?.userSelection?.location?.label
        }
    
        const result =await GetPlaceDetails(data).then((resp) => {
          console.log(resp.data.places[0].photos[3].name);
    
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          setPhotoUrl(PhotoUrl);
    
        });
      };
    
  return (
     <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all '>
        <img src={PhotoUrl?PhotoUrl: "/placeholder.jpg" }
        className='object-cover rounded-xl h-[200px] w-[350px]' />
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-600'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem