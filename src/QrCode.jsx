import { useState, useEffect } from "react";
import { FaQrcode, FaDownload, FaMoon, FaSun, FaPaintBrush } from "react-icons/fa";

const QrCode = () => {
  const [inputValue, setInputValue] = useState("");
  const [code, setCode] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [borderRadius, setBorderRadius] = useState(0);
  const [style, setStyle] = useState("square");

  useEffect(() => {
    if (inputValue.trim()) {
      const radiusParam = borderRadius ? `&qzone=${borderRadius}` : "";
      const styleParam = style === "dotted" ? "&style=dot" : "";
      setCode(
        `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
          inputValue
        )}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}${radiusParam}${styleParam}`
      );
    } else {
      setCode("");
    }
  }, [inputValue, qrSize, fgColor, bgColor, borderRadius, style]);

  const handleDownload = (format) => {
    if (!code) return;

    const downloadUrl =
      format === "svg"
        ? `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
            inputValue
          )}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}&format=svg`
        : code;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `qrcode.${format}`;
    link.click();
  };

  return (
    <div className={`flex justify-center items-center min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-500 to-purple-600 animate-gradient"}`}>
      <div className={`p-6 rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-md transition-all duration-300 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white/10 backdrop-blur-lg text-gray-900"}`}>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-yellow-400">
            <FaQrcode /> QR Code Generator
          </h1>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full transition-all duration-300 hover:bg-gray-700">
            {darkMode ? <FaSun className="text-yellow-300" size={24} /> : <FaMoon className="text-gray-300" size={24} />}
          </button>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter text or URL"
          className={`w-full px-4 py-3 mt-4 border-none rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 transition-all duration-500 transform hover:scale-105 ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* QR Code Settings */}
        <div className="flex flex-wrap gap-3 mt-4 w-full">
          <label className="flex items-center gap-2">
            <FaPaintBrush /> Foreground:
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 p-1 rounded-lg shadow-sm" />
          </label>
          <label className="flex items-center gap-2">
            <FaPaintBrush /> Background:
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 p-1 rounded-lg shadow-sm" />
          </label>
        </div>

        {/* Size Selection */}
        <div className="mt-4 text-black">
          <label>QR Code Size:</label>
          <select value={qrSize} onChange={(e) => setQrSize(e.target.value)} className="ml-2 p-2 border rounded-md">
            <option value="150">150x150</option>
            <option value="200">200x200</option>
            <option value="250">250x250</option>
            <option value="300">300x300</option>
          </select>
        </div>

        {/* QR Code Style */}
        <div className="mt-4 text-black">
          <label>QR Code Style:</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="ml-2 p-2 border rounded-md">
            <option value="square">Square</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>

        {/* Display QR Code */}
        {code && (
          <div className="mt-6 flex flex-col items-center">
            <img 
              src={code} 
              alt="Generated QR Code" 
              className="border-4 border-white shadow-lg rounded-lg transform hover:scale-110 transition-all duration-500"
            />
            
            {/* Download Buttons */}
            <div className="mt-4 flex gap-3">
              <button onClick={() => handleDownload("png")} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                <FaDownload /> PNG
              </button>
              <button onClick={() => handleDownload("svg")} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                <FaDownload /> SVG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCode;