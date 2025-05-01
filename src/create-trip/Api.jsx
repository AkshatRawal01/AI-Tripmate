//import { SelectBudgetOptions } from '/constants/options';
import React, { useEffect } from "react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
//import { SelectBudgetOptions } from '..src/components/constants/options';
import { SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { toast } from "sonner";
import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/Service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Api() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      console.log("✅ Login Successful, Token Received:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.error("❌ Login Failed:", error),
    flow: "implicit", // Use implicit flow to ensure popup works
    ux_mode: "popup", // Ensure it opens in a popup
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill in all the required details!");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    //console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    //add a new documnet
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData:JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = async (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("🚨 No access token found!");
      return;
    }

    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("✅ User Info Response:", response.data);

      // Store user data before closing the dialog
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);

      // Generate trip after successful login
      OnGenerateTrip();
    } catch (error) {
      console.error(
        "❌ Error fetching user profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        {/* <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2> */}
        <p className="text-xl font-semibold text-gray-800">
          Welcome to <span className="text-blue-600">The Travel</span>
          <br></br> Just share a few details, and our intelligent trip planner
          will craft a <span className="font-bold">personalized itinerary</span>{" "}
          tailored to your preferences. Whether you prefer mountain adventures,
          beachside relaxation, or cultural explorations, we’ve got you covered.
        </p>

        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium text-current">
              What is destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);

                  handleInputChange("location", v);
                },
              }}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip
            </h2>
            <input
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition hover:border-black"
              placeholder="Ex.3"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl my-8 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition ${
                  formData?.budget === item.title
                    ? "border-2 border-black shadow-xl scale-105"
                    : "border-gray-300"
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-8 font-medium">
            What do Your plan on travelling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition ${
                  formData?.traveler === item.people
                    ? "border-2 border-black shadow-xl scale-105"
                    : "border-gray-300"
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        

        <div className="my-10 justify-center flex">
          <button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
           
          </button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white p-6 rounded-lg">
            <DialogHeader>
              {/* Required DialogTitle for Accessibility */}
              <DialogTitle className="text-lg font-semibold text-center">
                Sign In
              </DialogTitle>

              <div className="flex flex-col items-center">
                <img src="/logo.svg" alt="Logo" className="w-32 h-12 mb-4" />
                <h2 className="text-xl font-bold text-center">
                  Sign In With Google
                </h2>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Sign in to the app with Google authentication securely.
                </p>
                <button
                  onClick={login}
                  className="w-full mt-5 flex justify-center gap-4 items-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  <FcGoogle className="h-7 w-7" /> Sign In
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
export default Api;
