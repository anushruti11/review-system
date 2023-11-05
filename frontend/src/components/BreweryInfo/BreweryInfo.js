import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import "./BreweryInfo.css";
import StarRating from "../Rating/Rating";
import { Button, Modal, Input } from "antd";
export default function BreweryInfo() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState({
    breweryId: id,
    customerReviews: [
      {
        customerID: "7832478234",
        customerName: "Anushruti",
        rating: 4,
        comments: "This is a very nice product",
      },
      {
        customerID: "7832478235",
        customerName: "Rahul",
        rating: 5,
        comments: "This is a very nice product",
      },
      {
        customerID: "7832478233",
        customerName: "XYZ",
        rating: 1,
        comments: "This is a very nice product",
      },
    ],
  });
  const [breweryDetail, setBreweryDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setReviews((prevState) => ({
      ...prevState,
      customerReviews: [
        ...prevState.customerReviews,
        {
          customerID: "472389472",
          customerName: "New_User",
          rating: rating,
          comments: reviewComment,
        },
      ],
    }));
    setRating(0);
    setReviewComment("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const totalReviews = reviews.customerReviews.length;
  const averageRating =
    reviews.customerReviews.reduce((acc, nums) => acc + nums.rating, 0) /
    totalReviews;
  const performAPICall = async (id) => {
    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/${id}`
      );
      console.log(response.data);
      setBreweryDetail(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    performAPICall(id);
  }, [id]);
  return (
    <>
      <Header />
      {breweryDetail ? (
        <div className="details-container">
          <div className="info-header">
            <h1 style={{ margin: "10px" }}>{breweryDetail.name}</h1>
            <Button type="primary" onClick={showModal}>
              Add Review
            </Button>
            <Modal
              title="Add Review"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input
                placeholder="Add Comment"
                onChange={(e) => setReviewComment(e.target.value)}
              />
              <br />
              <br />
              <StarRating size={30} onSetRating={setRating} />
            </Modal>
          </div>
          <h3>
            {breweryDetail.state}, {breweryDetail.country}
          </h3>
          <div className="phone">Phone Number: {breweryDetail.phone}</div>
          <div className="brewery-address">
            <strong>Address: </strong>
            {breweryDetail.street},{breweryDetail.state_province},
            {breweryDetail.state},{breweryDetail.country},
            {breweryDetail.postal_code}
          </div>
          <div className="website-url">
            <strong>Website URL: </strong>
            {breweryDetail.website_url}
          </div>
          {/* Customer Reviews */}
          <h2>Cusomter Reviews:</h2>

          <div>Total Reviews: {totalReviews}</div>
          <div>Average Rating: {averageRating.toFixed(1)}</div>
          <h4>Here's what our customer say:</h4>
          {reviews.customerReviews.length !== 0
            ? reviews.customerReviews.map((item) => (
                <div className="review-container">
                  <div>{item.customerName}</div>
                  <div className="rating">
                    <span>
                      <StarRating size={20} defaultRating={item.rating} />
                    </span>
                    <span>{item.rating}</span>
                  </div>
                  <div> User Review: {item.comments}</div>
                </div>
              ))
            : null}
        </div>
      ) : (
        <div>Something went Wrong</div>
      )}
    </>
  );
}
