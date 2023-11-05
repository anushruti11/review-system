import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Breweries.css";
import axios from "axios";
import { Col, Row } from "antd";
import BreweryCard from "../BreweryCard/BreweryCard";
export default function Breweries() {
  const [breweriesData, setBreweriesData] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [searchData, setSearchData] = useState({
    input: "",
    type: "by_city",
  });
  const [loading, setLoading] = useState(true);
  const [debounce, setDebounce] = useState(null);

  const performAPICall = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.openbrewerydb.org/v1/breweries"
      );

      console.log(response.data);
      setBreweriesData(response.data);
      setFilteredBreweries(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const performSearch = async (searchData) => {
    setLoading(true);
    try {
      if (searchData.input === "") {
        setFilteredBreweries(breweriesData);
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries?${searchData.type}=${searchData.input}`
      );

      console.log("hi");
      setFilteredBreweries(response.data);
      setLoading(false);
    } catch (err) {
      setFilteredBreweries([]);
      setLoading(false);
    }
  };

  const getProductElement = (brewery) => {
    return (
      <Col xs={24} sm={12} xl={6} key={brewery.id}>
        <BreweryCard brewery={brewery} />
      </Col>
    );
  };

  useEffect(() => {
    performSearch(searchData);
  }, [searchData]);

  useEffect(() => {
    performAPICall();
  }, []);

  return (
    <>
      <Header
        onPage="breweries"
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <div className="grid-container">
        <Row gutter={[24, 16]}>
          {loading ? (
            <div className="loading-text">Loading products...</div>
          ) : filteredBreweries.length !== 0 ? (
            filteredBreweries.map((brewery) => getProductElement(brewery))
          ) : (
            <div className="loading-text">No products to list</div>
          )}
        </Row>
      </div>
    </>
  );
}
