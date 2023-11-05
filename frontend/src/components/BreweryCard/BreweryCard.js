import React, { useState } from "react";
import "./BreweryCard.css";
import { Card, Button } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import StarRating from "../Rating/Rating";
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function BreweryCard({ brewery }) {
  const [rating, setRating] = useState(0);
  return (
    <Link to={`/brewery/${brewery.id}`}>
      <Card className="brewery" hoverable>
        <div className="card-header">
          <div>
            <div className="brewery-name">{brewery.name}</div>
            <div className="brewery-location">
              {brewery.state}, {brewery.city}
            </div>
          </div>
          <a href={brewery.website_url} className="brewery-url">
            <LinkOutlined />
          </a>
        </div>
        <div className="card-body">
          <div className="brewery-number">
            <strong>Phone Number:</strong> {brewery.phone}
          </div>
          <div className="brewery-address">
            <strong>Address: </strong>
            {brewery.street},{brewery.state_province},{brewery.state},
            {brewery.country},{brewery.postal_code}
          </div>
          <div className="brewery-rating">
            <StarRating size={20} onSetRating={setRating} isReadOnly={true} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
