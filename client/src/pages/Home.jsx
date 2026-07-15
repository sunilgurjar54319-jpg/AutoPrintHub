import { useState } from "react";
import Header from "../components/Header";
import UploadForm from "../components/UploadForm";
import PrintOptions from "../components/PrintOptions";
import PriceCard from "../components/PriceCard";

function Home() {
  const [pages, setPages] = useState(0);
  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("bw");

  const rate = color === "bw" ? 2 : 10;
  const total = pages * copies * rate;

  return (
    <div>
      <Header />


     <UploadForm 
  setPages={setPages}
  pages={pages}
/>

      <PrintOptions
        color={color}
        setColor={setColor}
        copies={copies}
        setCopies={setCopies}
      />

      <PriceCard
  pages={pages}
  copies={copies}
  color={color}
  total={total}
/>

    </div>
  );
}

export default Home;
