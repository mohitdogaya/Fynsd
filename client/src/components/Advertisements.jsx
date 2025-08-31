// src/components/Advertisements.jsx
export default function Advertisements({ position, ad }) {

    const isPremium = localStorage.getItem("isPremium") === "true"; 

  // ✅ Premium user → ads mat dikhao
  if (isPremium) return null;

  if (!ad) return null; // agar ad data nahi mila toh render mat karo

  const baseClass =
    "p-2 m-2 bg-white shadow-md rounded-xl flex justify-center items-center";

  const positionClass = {
    left: "fixed top-20 left-2 w-40",   // Left banner
    right: "fixed top-20 right-2 w-40", // Right banner
    footer: "w-full text-center py-4",  // Footer banner
  };

  return (
    <div className={`${baseClass} ${positionClass[position]}`}>
      <a href={ad.url} target="_blank" rel="noopener noreferrer">
        <img
          src={ad.image}
          alt={ad.title || "Advertisement"}
          className="w-full h-auto rounded-lg"
        />
      </a>
    </div>
  );
}
