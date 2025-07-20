"use client";
import React from "react";
import { motion } from "framer-motion"; // Correct import path for motion

// Use a more descriptive type for the color prop
type ColorfulTextProps = {
    text: string;
    color?: string | string[]; // Added an optional prop for custom color(s)
};

export function ColourfulText({ text, color }: ColorfulTextProps) {
    // Define the base set of colors
    const defaultColors = [
        "rgb(131, 179, 32)",
        "rgb(47, 195, 106)",
        "rgb(42, 169, 210)",
        "rgb(4, 112, 202)",
        "rgb(107, 10, 255)",
        "rgb(183, 0, 218)",
        "rgb(218, 0, 171)",
        "rgb(230, 64, 92)",
        "rgb(232, 98, 63)",
        "rgb(249, 129, 47)",
        "rgb(13, 13, 12)",
    ];

    // Use the provided color prop, or fall back to the default colors
    // This allows you to pass a single color string or an array of colors
    const colors = color
        ? Array.isArray(color)
            ? color
            : [color]
        : defaultColors;

    const [currentColors, setCurrentColors] = React.useState(colors);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const shuffled = [...colors].sort(() => Math.random() - 0.5);
            setCurrentColors(shuffled);
            setCount((prev) => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, [colors]); // Added colors to the dependency array to react to changes

    return text.split("").map((char, index) => (
        <motion.span
            key={`${char}-${count}-${index}`}
            initial={{
                y: 0,
            }}
            animate={{
                color: currentColors[index % currentColors.length],
                y: [0, -3, 0],
                scale: [1, 1.01, 1],
                filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
                opacity: [1, 0.8, 1],
            }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
            }}
            className="inline-block whitespace-pre font-sans tracking-tight"
        >
            {char}
        </motion.span>
    ));
}
