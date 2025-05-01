import { GetPlaceDetails} from '@/Service/GlobalApi';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL ='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


function InfoSection({trip}) {
    
  const [PhotoUrl,setPhotoUrl] = useState();


    useEffect(() => {
      trip && GetPlacePhoto();
    }, [trip]); // Dependency on trip
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      }
  
      const result =  await GetPlaceDetails(data).then((resp) => {
        console.log(resp.data.places[0].photos[3].name);
  
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl)
  
      });
    };
  
  return (
    <div>
        <img
        src={PhotoUrl}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="photo"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1.5 px-3.5 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1.5 px-3.5 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1.5 px-3.5 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md">
              🥂 No. of Traveler: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <button className="px-4 py-2 bg-black text-white border border-white hover:bg-gray-900 transition-all duration-300 rounded-xl">
          <IoIosSend className="w-5 h-5" />
        </button>
      </div>
      </div>
  );
}

export default InfoSection;