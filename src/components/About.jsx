import React,{useEffect,useState,useReducer} from 'react';
import MasanaGelsinDataService from '../services/MasanaGelsinDataService';
import MasanaGelsinReducer from '../services/MasanaGelsinReducer';

function About() {
  const [homeVal, dispatchHomeVals] = useReducer(MasanaGelsinReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(() => {
    dispatchHomeVals({ type: "FETCH_INIT" });
    try {
      MasanaGelsinDataService.getHomeValues().then(
        (result) => {
          dispatchHomeVals({
            type: "FETCH_SUCCESS",
            payload: result.data.data,
          });
        }
      );
    } catch (error) {
      dispatchHomeVals({ type: "FETCH_FAILURE" });
      console.error("Error fetching comments:", error);
    }
  }, []);

  return (
    <div id="about">
      <div className="mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="w-full sm:w-6/12">
            <img src="https://i.ibb.co/Br5J1Kv/pizza-afi.png" alt="espressolab kahve demleme görseli" className="rounded-lg" style={{ marginBottom: '20px' }} />
          </div>
          <div className="w-full sm:w-6/12 mx-auto sm:mx-0 text-center">
            <h2 className="text-4xl font-bold mb-4 sm:mb-6 text-black">Bugünün Özel Menüsü</h2>
            <p className="text-2xl text-black">
              {homeVal.data[0]?.menuOfDay.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
