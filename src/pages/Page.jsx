
import React from "react";
import { useParams } from "react-router-dom";
import HomePageSection from "../components/page-section/HomePageSection";
export default function Page() {
  const params = useParams();

  if(params.id === "2") {
    return (
      <HomePageSection page={params.id}/>
    );
  }
  return (
    null
  );
}
