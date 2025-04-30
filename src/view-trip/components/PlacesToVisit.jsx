import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  console.log(trip);

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div className="mt-5">
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            // Sort the days to ensure consistent order
            .sort(([a], [b]) => a.localeCompare(b)) // Sort keys alphabetically (day1, day2, etc.)
            .map(([day, details], index) => (
              <div key={index}>
                {/* Display the day */}
                <h2 className="font-medium text-lg">{day}</h2>
                
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Iterate over the 'plan' array */}
                  {details.places.map((place, idx) => (
                    <div key={idx} className="">
                      <h2 className="font-medium text-sm text-orange-600">
                        {details.bestTimeToVisit || "Best time not available"}
                      </h2>
                      <PlaceCardItem place={place} />
                    </div>
                  ))}

                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
