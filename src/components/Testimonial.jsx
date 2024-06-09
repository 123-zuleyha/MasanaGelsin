import React, { useState, useEffect, useReducer } from 'react';
import MasanaGelsinDataService from '../services/MasanaGelsinDataService';
import MasanaGelsinReducer from '../services/MasanaGelsinReducer';

function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [comments, dispatchComments] = useReducer(MasanaGelsinReducer, {
        data: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    useEffect(() => {
        dispatchComments({ type: "FETCH_INIT" });
        try {
            MasanaGelsinDataService.getComments().then(
                (result) => {
                    dispatchComments({
                        type: "FETCH_SUCCESS",
                        payload: result.data.data,
                    });
                }
            );
        } catch (error) {
            dispatchComments({ type: "FETCH_FAILURE" });
            console.error("Error fetching comments:", error);
        }
    }, []);

    const change = (index) => {
        const lastIndex = comments.data.length - 1;

        if (index < 0) {
            setCurrentIndex(lastIndex);
        } else if (index > lastIndex) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(index);
        }
    };

    if (comments.data.length === 0) {
        return <div>Loading...</div>;
    }


    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} className="text-yellow-500 text-2xl">&#9733;</span>
                ))}
                {halfStar && <span className="text-yellow-500 text-2xl">&#9733;</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-500 text-2xl">&#9733;</span>
                ))}
            </div>
        );
    };

    const averageRating = () => {   
        const totalStart = comments.data.reduce((acc, comment) => acc + (comment.start || 0), 0);
        return (totalStart / comments.data.length).toFixed(2);
    };

    return (
        <div id="comment" style={{height:'40vh'}}>
            <div className="mx-auto flex flex-col sm:flex-row sm:rounded-lg overflow-hidden bg-gray-100 items-stretch">
                <div className="relative w-full sm:w-1/2 bg-red-600 flex items-center sm:p-0">
                    <div className="w-64 mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                        <span className="block">Müşteriler</span>
                        <span className="block">Neler</span>
                        <span className="block">Söylüyor</span>
                        <span className="block mt-3">{renderStars(averageRating())}</span>
                    </div>
                    <div className="absolute flex bottom-2 right-2">
                        <button onClick={() => change(currentIndex - 1)} className="flex justify-center items-center rounded-l-full bg-gray-100 text-gray-600 font-bold w-12 h-12 hover:bg-gray-200">&#8592;</button>
                        <button onClick={() => change(currentIndex + 1)} className="flex justify-center items-center rounded-r-full bg-gray-100 text-gray-600 font-bold w-12 h-12 hover:bg-gray-200">&#8594;</button>
                    </div>
                </div>
                <div className="relative w-full sm:w-1/2 flex items-center sm:min-h-96">
                    <span className="absolute top-4 left-4 sm:top-8 sm:left-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current text-red-200 size-8 sm:size-12 md:size-16">
                            <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                        </svg>
                    </span>
                    <div className="p-8 sm:p-14 z-10">
                        <p className="text-xl text-gray-700 font-normal italic">{comments.data[currentIndex]?.comment}</p>
                        <h4 className="text-md font-bold text-gray-900 mt-2">{comments.data[currentIndex]?.nameSurname}</h4>
                        <span className="block mt-3">{renderStars(comments.data[currentIndex]?.start)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
