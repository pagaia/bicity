import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Map.js"), {
    ssr: false
  });

  return (
    <div id="map">
      <MapWithNoSSR />
    </div>
  );
}
