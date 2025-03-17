import { useState, useEffect, useRef } from 'react';
import './css/BirthdayCard.css';
// Importa tu archivo de música (ajusta la ruta según donde lo guardes)
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
        span.className = 'floating-emoji';
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
          className="heart"
          style={{
            left: `${left}%`,
            animation: `floatHeart ${animationDuration}s ease-in infinite`,
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
    <div className="birthday-page">
      <div className="music-control">
        <button 
          className="music-button" 
          onClick={toggleMusic}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? '🎵' : '🔇'}
        </button>
      </div>
      <div className="hearts">
        {createHearts()}
      </div>
      <div className="card-container">
        {!isOpen ? (
          <div className="envelope" onClick={handleOpen}>
            <div className="envelope-flap"></div>
            <div className="envelope-content">
              Click para abrir
            </div>
          </div>
        ) : (
          <div className="card-opened">
            <div className="emoji-container"></div>
            <div className="birthday-message">
              <h1 style={{ textAlign: 'center' }}>¡Feliz Cumpleaños Hermanita hermosa! 🎉</h1>
              
              {/* Contenedor de letras */}
              <div className="lyrics-container" style={{ textAlign: 'center' }}>
                {lyrics.map((lyric, index) => (
                  <div
                    key={index}
                    className={`lyric-line ${
                      index === currentLyricIndex ? 'active' : 
                      index < currentLyricIndex ? 'past' : ''
                    }`}
                  >
                    {lyric.text}
                  </div>
                ))}
              </div>

              {!showPhotos && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button 
                    className="continue-button"
                    onClick={() => setShowPhotos(true)}
                  >
                    Ver sorpresa ✨
                  </button>
                </div>
              )}
            </div>
            {showPhotos && (
              <div className="fullscreen-carousel">
                <button 
                  className="back-button"
                  onClick={() => setShowPhotos(false)}
                >
                  ← Volver
                </button>
                <div className="carousel-container fullscreen">
                  
                  <div className="carousel-content">
                    <img 
                      src={images[currentPhotoIndex].src} 
                      alt={`Foto ${currentPhotoIndex + 1}`} 
                      className="carousel-image fullscreen"
                    />
                    <p>{images[currentPhotoIndex].caption}</p>
                    
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