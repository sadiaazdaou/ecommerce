import { Header } from "../../components/Header";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
// test utilities
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import Checkmark from "../../assets/images/icons/checkmark.png";
import RatingStars from "../../components/RatingStars";
import { ProductsList } from "./ProcuctsList";
import HomePage from "./HomePage";

vi.mock("axios");

describe("HomePage component", () => {
    let loadCart;

    beforeEach(() => {
        loadCart = vi.fn();

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath == "/api/products") {
                return {
                    data: [
                        {
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87,
                            },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"],
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127,
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"],
                        },
                    ],
                };
            }
        });
    });

    it("displays the products correct", async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCarts={loadCart} />
            </MemoryRouter>
        );
        const productContainer = await screen.findAllByTestId(
            "product-container"
        );

        expect(productContainer.length).toBe(2);

        expect(
            within(productContainer[0]).getByText(
                "Black and Gray Athletic Cotton Socks - 6 Pairs"
            )
      ).toBeInTheDocument();
      
      expect(
          within(productContainer[1]).getByText("Intermediate Size Basketball")
      ).toBeInTheDocument();
    });
});
