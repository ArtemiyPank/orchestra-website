"use client";

type CardProgramProps = {
  title: string;
  description: string;
  songs: string[];
  photos: string[];
  videoLink?: string;
};

const CardProgram = ({ title, description, songs, photos, videoLink }: CardProgramProps) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      
      {photos.length > 0 && (
        <div className="flex gap-2 mb-4">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Program Photo ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
          ))}
        </div>
      )}

      {songs.length > 0 && (
        <details className="mb-4">
          <summary className="text-primary-color cursor-pointer">View Songs</summary>
          <ul className="list-disc pl-4">
            {songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </details>
      )}

      {videoLink && (
        <a
          href={videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary-color text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Watch Video
        </a>
      )}
    </div>
  );
};

export default CardProgram;
