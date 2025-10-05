import React from "react";
import { useId } from "react";

function Star({ fraction = 0, size = 18, idSuffix = "" }) {
    // fraction: 0..1 fill for this star
    // we render an SVG star and mask fill to fraction
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
            <defs>
                <linearGradient id={`g-${idSuffix}`}>
                    <stop offset={`${fraction * 100}%`} stopColor="#198754" />
                    <stop offset={`${fraction * 100}%`} stopColor="#bebfc2ff" />
                </linearGradient>
            </defs>
            <path
                fill={`url(#g-${idSuffix})`}
                d="M12 .587l3.668 7.431L24 9.753l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.601 0 9.753l8.332-1.735z"
            />
        </svg>
    );
}

function RatingStars({ value = 0, max = 5, size = 18 }) {
    const baseId = useId();
    const stars = [];
    for (let i = 0; i < max; i++) {
        const starValue = Math.min(Math.max(value - i, 0), 1); // fraction for this star
        stars.push(
            <Star
                key={i}
                fraction={starValue}
                size={size}
                idSuffix={`${baseId}-${i}`}
            />
        );
    }
    return (
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {stars}
        </div>
    );
}

export default RatingStars;
