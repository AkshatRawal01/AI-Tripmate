import { db } from '@/Service/firebaseconfig';
import React from 'react'
import { useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import Hotels from '../components/hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip()  {

    const {tripId}=useParams();
    const [trip,setTrip] = useState([]);
    useEffect(()=>{
        tripId && GetTripData();
    },[tripId])

    //Used to get Trip information from firebase

    const GetTripData = async()=>{
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No Such Document");
            toast('No trip Found!')
        }
    }

    return (
      <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* {Information Section} */}
        <InfoSection trip={trip} />

        {/* { Recommended Hotels } */}
        <Hotels trip={trip} />

        {/* { Daily plans } */}
        <PlacesToVisit trip={trip} />
         
         {/* { footer part } */}
        <Footer trip={trip} />
      </div>
    )
}

export default Viewtrip