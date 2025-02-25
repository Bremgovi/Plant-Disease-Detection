import TeachableMachine from "./components/Model";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const diseaseList = [
  "Calabaza (Cenicilla)",
  "Cerezo (Cenicilla)",
  "Durazno (Mancha bacteriana)",
  "Fresa (Chamuscado de hoja)",
  "Maiz (Cercospora)",
  "Maiz (Roya común)",
  "Maiz (Plaga del tizon)",
  "Manzana (Sarna del manzano)",
  "Manzana (Pobredumbre negra)",
  "Manzana (Roya del cedro)",
  "Papa (Tizón temprano)",
  "Papa (Tizón tardío)",
  "Tomate (Mancha bacteriana)",
  "Tomate (Moho)",
  "Tomate (Virus del mosaico)",
];

export default function Home() {
  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: "url('/wp.gif')" }}>
      <div className="flex justify-center items-center h-screen w-full bg-gray-900 bg-opacity-75">
        <div className="flex flex-col items-center w-3/4">
          <h1 className={`text-8xl text-gray-200 font-extrabold mb-4 text-start ml-5 mt-10 tracking-wide ${inter.variable}`}>Detección de enfermedades de plantas</h1>
          <div className="w-3/4 flex justify-between">
            <img src="/dancingPlants.gif" alt="" className="w-1/3 h-1/2 object-contain" />
            <div className="relative w-1/3 mt-[-50px]">
              <img src="/plant.gif" alt="Plant Disease Detection" className="w-full h-auto mb-10 relative z-10" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/5 bg-slate-900 rounded-full opacity-50 z-0"></div>
            </div>
            <img src="/dancingPlants.gif" alt="" className="w-1/3 h-1/2 object-contain" />
          </div>
          <div className="bg-gray-400 bg-opacity-50 p-4 rounded-lg shadow-lg w-5/6">
            <p className="text-lg mb-2 text-center font-extrabold">Lista de enfermedades:</p>
            <p className="text-base text-center font-bold text-gray-300">{diseaseList.join(", ")}</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-full w-1/4 bg-gray-900 bg-opacity-80 p-4">
          <TeachableMachine />
        </div>
      </div>
    </div>
  );
}
