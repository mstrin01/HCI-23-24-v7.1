"use client"
import React, { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/app/utils/contentfulFetch';
import Card from './Card';

const space_id = 'oryvsd9mg11g';
const access_token = 'lfsKVzhuOdUcubBJ7kSWzOzihmY7G-Lgn6ofML8Q-_g';

interface Shop {
  name: string;
  price: string;
  image: {
    id: string;
    title: string;
    description: string;
    contentType: string;
    url: string;
  };
  category: string;
}

const Shop = () => {
  const faceQuery = `
    query {
      shopCollection(where: { category_contains: "face" }) {
        items {
          name
          price
          image {
            sys {
              id
            }
            title
            description
            contentType
            url
          }
          category
        }
      }
    }
  `;

  const [faceShops, setFaceShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchFaceData = async () => {
      try {
        const response = await fetchGraphQL(faceQuery, space_id, access_token);
        const data = await response.json();

        console.log("Face Products GraphQL Response:", data);

        if (response.ok) {
          setFaceShops(data.data.shopCollection.items);
        } else {
          console.error("Face Products GraphQL Errors:", data.errors);
        }
      } catch (error) {
        console.error("Error fetching Face Products:", error);
      }
    };

    fetchFaceData();
  }, [faceQuery]);

  const handleAddToCart = (title: string) => {
    console.log('Added to cart:', title);
  };

  return (
    <div className="container mx-auto md:p-8">
      <h1 className="text-3xl md:text-6xl font-roboto-condensed font-bold mb-15 text-center text-terra m-[20px]">
        Face
      </h1>
      <div className="flex justify-center">
        <section className="grid md:grid-cols-2 lg:grid-cols-3">
          {faceShops.map((shop, index) => (
            <Card
              imageUrl={shop.image.url}
              title={shop.name}
              price={shop.price}
              onAddToCart={() => handleAddToCart(shop.name)}
              key={index}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Shop;
