import { useState, useEffect, useRef } from 'react';
// Eliminamos la importación del CSS
import musicFile from '../assets/audio_cumpleaños.mp3';
import {foto1, foto2, foto3, foto4, foto5, foto6, foto7 } from '../assets/images/images';



const BirthdayCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef(new Audio(musicFile));

  const emojis = '🎂 🎈 🎉 🎊 🎁 ✨ 💝 🌟'.split(' ');

  // Array de fotos - ajusta las rutas según tus imágenes
  const images = [
    { src: foto1, caption: "Momentos especiales" },
    { src: foto2, caption: "Recuerdos bonitos" },
    { src: foto3, caption: "Sonrisas compartidas" },
    { src: foto4, caption: "Días inolvidables" },
    { src: foto5, caption: "la mas hermosa" },
    { src: foto6, caption: "la mejor hermana" },
    { src: foto7, caption: "la mas hermosa de todas" },
  ];

  // Letra de la canción con tiempos (en segundos)
  const lyrics = [
    { time: 0, text: "¡paraparapapa! 🌅", duration: 3 },
    { time: 2, text: "Cumpleañooo feliz 👑", duration: 8 },
    { time: 3, text: "fufuuffu 👑", duration: 3 },
    { time: 6, text: "te deseamos a ti 💐", duration: 3 },
    { time: 9, text: "fufuf ✨", duration: 3 },
    { time: 12, text: "Cumpleaños felizes 🌟", duration: 3 },
    { time: 15, text: "te deseamos a ti 🌞", duration: 3 },
    { time: 18, text: "jajjjajjaajjaja 🐦", duration: 3 }
  ];

  useEffect(() => {
    const playAudio = async () => {
      try {
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Reproducción automática bloqueada");
        setIsPlaying(false);
      }
    };

    if (isOpen) {
      playAudio();
      startLyrics();
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [isOpen]);

  const startLyrics = () => {
    lyrics.forEach((lyric, index) => {
      setTimeout(() => {
        setCurrentLyricIndex(index);
      }, lyric.time * 1000);
    });
  };

  // Función para controlar la música manualmente si es necesario
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Iniciar música cuando se abre la tarjeta
  const handleOpen = () => {
    setIsOpen(true);
    audioRef.current.play();
    setIsPlaying(true);
    
    // Animación de emojis
    const emojiContainer = document.querySelector('.emoji-container');
    emojis.forEach((emoji, index) => {
      setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'absolute text-2xl animate-float-up';
        span.innerHTML = emoji;
        span.style.left = `${Math.random() * 100}%`;
        emojiContainer.appendChild(span);
      }, index * 300);
    });
  };

  // Añadir función para crear corazones
  const createHearts = () => {
    const hearts = [];
    for (let i = 0; i < 20; i++) {
      const left = Math.random() * 100;
      const animationDuration = 3 + Math.random() * 3;
      const size = 10 + Math.random() * 20;
      hearts.push(
        <div
          key={i}
          className="absolute animate-float-heart"
          style={{
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            fontSize: `${size}px`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          ❤️
        </div>
      );
    }
    return hearts;
  };

  // Función para ir a la siguiente foto
  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para ir a la foto anterior
  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Autoplay del carrusel
  useEffect(() => {
    if (showPhotos) {
      const timer = setInterval(nextPhoto, 3000); // Cambia foto cada 3 segundos
      return () => clearInterval(timer);
    }
  }, [showPhotos]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-pink-300 to-pink-200 animate-gradient-x">
      <div className="fixed top-5 right-5 z-10">
        <button 
          className="bg-white/90 rounded-full w-12 h-12 text-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
          onClick={toggleMusic}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? '🎵' : '🔇'}
        </button>
      </div>
      <div className="fixed w-full h-full pointer-events-none">
        {createHearts()}
      </div>
      <div className="flex justify-center items-center min-h-screen w-full p-5 box-border bg-gradient-to-br from-yellow-300 to-orange-300">
        {!isOpen ? (
          <div 
            className="relative w-72 h-48 cursor-pointer mx-auto bg-gray-50 shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={handleOpen}
          >
            <div className="absolute -top-24 w-full h-24 bg-red-500 clip-path-triangle"></div>
            <div className="flex justify-center items-center h-full text-lg text-gray-600">
              Click para abrir
            </div>
          </div>
        ) : (
          <div className="bg-white/95 rounded-2xl p-10 shadow-xl max-w-3xl w-11/12 mx-auto hover:-translate-y-1 transition-transform duration-300">
            <div className="emoji-container relative"></div>
            <div className="mb-8">
              <h1 className="text-center text-4xl text-pink-500 mb-5 font-bold animate-bounce shadow-text">¡Feliz Cumpleaños Hermanita hermosa! 🎉</h1>
              
              {/* Contenedor de letras */}
              <div className="mx-auto my-8 max-w-xl min-h-[300px] relative bg-white/90 rounded-xl p-5 shadow-md text-center">
                {lyrics.map((lyric, index) => (
                  <div
                    key={index}
                    className={`text-xl my-4 transition-all duration-500 ease-in-out relative ${
                      index === currentLyricIndex 
                        ? 'opacity-100 translate-y-0 text-2xl font-bold animate-rainbow' 
                        : index < currentLyricIndex 
                        ? 'opacity-60 -translate-y-5 text-base' 
                        : 'opacity-0 translate-y-5'
                    }`}
                  >
                    {index === currentLyricIndex && (
                      <>
                        <span className="absolute -left-8 animate-dance">🎵</span>
                        <span className="absolute -right-8 animate-dance-reverse">🎵</span>
                      </>
                    )}
                    {lyric.text}
                  </div>
                ))}
              </div>

              {!showPhotos && (
                <div className="text-center mt-5">
                  <button 
                    className="bg-gradient-to-r from-pink-500 to-yellow-500 border-none py-3 px-8 rounded-full text-white text-lg cursor-pointer transition-all duration-300 shadow-md hover:scale-105 hover:shadow-lg"
                    onClick={() => setShowPhotos(true)}
                  >
                    Ver sorpresa ✨
                  </button>
                </div>
              )}
            </div>
            {showPhotos && (
              <div className="fixed top-0 left-0 w-screen h-screen bg-black/95 z-50 flex justify-center items-center">
                <button 
                  className="fixed top-8 left-8 py-3 px-6 bg-white/15 text-white border-none rounded-full cursor-pointer text-base z-[1001] transition-all duration-300 flex items-center gap-2 hover:bg-white/30 hover:scale-105"
                  onClick={() => setShowPhotos(false)}
                >
                  ← Volver
                </button>
                <div className="relative w-full h-full flex justify-center items-center mx-auto max-w-5xl">
                  <div className="relative w-full h-full flex flex-col justify-center items-center">
                    <img 
                      src={images[currentPhotoIndex].src} 
                      alt={`Foto ${currentPhotoIndex + 1}`} 
                      className="w-auto h-auto max-w-[90vw] max-h-[80vh] object-contain block mx-auto animate-fadeIn"
                    />
                    <div className="fixed bottom-24 left-0 right-0 text-center text-white text-xl p-3 shadow-text mx-auto w-4/5 max-w-4xl">
                      {images[currentPhotoIndex].caption}
                    </div>
                    
                    <button 
                      onClick={prevPhoto}
                      className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out"
                    >
                      &#10094;
                    </button>
                    
                    <button 
                      onClick={nextPhoto}
                      className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out"
                    >
                      &#10095;
                    </button>
                    
                    <div className="fixed bottom-12 left-0 right-0 flex justify-center gap-4 mx-auto">
                      {images.map((_, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                            currentPhotoIndex === index 
                              ? "bg-white scale-110" 
                              : "bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCard; 