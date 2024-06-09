import React, { useState } from 'react';
import MasanaGelsinDataService from '../services/MasanaGelsinDataService';


function Contact() {
    const [formData, setFormData] = useState({
        nameSurname: '',
        comment: '',
        start: 0,
    });

    const [hoverStar, setHoverStar] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await MasanaGelsinDataService.addComment(formData);
            // Reset form or provide feedback
            setFormData({ nameSurname: '', comment: '', start: 0 });
            setHoverStar(0);
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
    };

    const setScore = (score) => {
        setFormData({ ...formData, start: score });
    };

    const resetScore = () => {
        setFormData({ ...formData, start: hoverStar });
    };

    return (
        <>
            <div id="contact" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-black">
                <div className="container">
                    <div className="md:flex items-center gap-10">
                        <div className="flex-1 mb-6 md:mb-0">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400">Bizi yorumlayın.</h2>
                            <h2 className="text-7xl font-bold text-white">Düşüncelerinizi Bizimle Paylaşın</h2>
                        </div>
                        <div className="flex-1">
                            <form className="text-white" method='post' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="nameSurname" className="mb-3 block text-base font-medium" style={{ marginTop: '40px' }}>Ad Soyad</label>
                                    <input
                                        type="text"
                                        name="nameSurname"
                                        id="nameSurname"
                                        className="w-full rounded-md border-none bg-white py-3 px-6 text-black font-medium outline-none"
                                        value={formData.nameSurname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="comment" className="mb-3 block text-base font-medium">Yorum</label>
                                    <textarea
                                        rows="4"
                                        name="comment"
                                        id="comment"
                                        className="w-full rounded-md border-none bg-white py-3 px-4 text-base text-black font-medium outline-none resize-none"
                                        value={formData.comment}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="star" className="mb-3 block text-base font-medium">Puan</label>
                                    <div className="flex items-center">
                                        <input type="hidden" name="star" id="star" value={formData.star} />
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((score) => (
                                                <button
                                                    key={score}
                                                    type="button"
                                                    onMouseOver={() => setHoverStar(score)}
                                                    onMouseOut={resetScore}
                                                    onClick={() => setScore(score)}
                                                    className={`text-2xl score-button focus:outline-none ${formData.star >= score || hoverStar >= score ? 'text-yellow-500' : 'text-gray-500'}`}
                                                >
                                                    &#9733;
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <button type="submit" className="bg-red-600 text-center font-semibold rounded-lg px-10 py-3 hover:bg-red-400">Gönder</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
