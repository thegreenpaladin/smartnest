// lib/data.ts

// lib/data.ts (Add this section)
export const COLLECTIONS = [
    {
        id: "col-1",
        title: "Smart Lighting",
        slug: "lighting",
        description: "LED panels, smart lamps, and ambient systems for modern rooms.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "col-2",
        title: "Power & Charging",
        slug: "portable-power",
        description: "Power banks, travel charging stations, and utility-ready portable power.",
        image: "https://images.unsplash.com/photo-1609091839311-d5368195ad71?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "col-3",
        title: "Cooling & Workspace",
        slug: "personal-climate",
        description: "Personal cooling gadgets and desk essentials for productive setups.",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "col-4",
        title: "Home Utility Electronics",
        slug: "utility",
        description: "Everyday electronic tools for convenience, safety, and small-space living.",
        image: "https://images.unsplash.com/photo-1622467820155-212624da5233?auto=format&fit=crop&q=80&w=800",
    }
];

export const PRODUCTS = [
    // --- AMBIENT LIGHTING ---
    {
        id: "g1",
        name: "Smart LED Glow Cube",
        price: 85,
        compareAtPrice: 99,
        images: ["https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"],
        category: "Lighting",
        slug: "smart-glow-cube",
        sizes: ["Single", "Duo Pack"],
        description: "App-controlled ambient cube with 16 million colors and music sync mode. Perfect for gaming setups or bedside mood lighting.",
        specs: {
            "Colors": "16 Million",
            "Control": "Mobile App & Voice",
            "Power": "USB-C",
            "Dimensions": "3.5 x 3.5 x 3.5 inches",
            "Weight": "250g"
        }
    },
    {
        id: "g2",
        name: "Minimalist Mag-Safe Desk Lamp",
        price: 145,
        compareAtPrice: 179,
        images: ["https://cdn.pixabay.com/photo/2022/02/07/14/15/lamp-6999488_1280.jpg"],
        category: "Lighting",
        slug: "mag-safe-lamp",
        sizes: ["Standard"],
        description: "Gravity-defying design with a built-in 15W MagSafe wireless charger in the base. Dimmable touch control with 3 color temperatures.",
        specs: {
            "Charger": "MagSafe 15W",
            "Brightness": "Up to 400 lumens",
            "Color Temperatures": "3 (Warm, Neutral, Cool)",
            "Material": "Aluminum & Polycarbonate",
            "Weight": "1.2kg"
        }
    },
    {
        id: "g3",
        name: "Hexa-Link Wall Panels",
        price: 195,
        compareAtPrice: 229,
        images: ["https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800"],
        category: "Lighting",
        slug: "hexa-link-panels",
        sizes: ["7-Piece Kit", "13-Piece Kit"],
        description: "Modular touch-sensitive LED panels. Arrange them in any configuration to create custom wall art that reacts to your touch.",
        specs: {
            "Material": "Aluminum & Polycarbonate",
            "Power Source": "USB-C (5V/2A)",
            "Battery Life": "Up to 12 hours",
            "Weight": "1.2kg per panel"
        }
    },

    // --- PORTABLE POWER & UTILITY ---
    {
        id: "g4",
        name: "Plasma Arc Lighter",
        price: 40,
        images: ["https://cdn.pixabay.com/photo/2018/04/07/05/47/arc-lighter-3297780_1280.jpg"],
        category: "Portable Power",
        slug: "plasma-arc-lighter",
        sizes: ["One Size"],
        description: "Windproof, butane-free, and rechargeable. Uses dual-plasma arcs to light anything from candles to campfires. USB-C charging included.",
        specs: {
            "Ignition Type": "Dual Plasma Arc",
            "Battery": "Rechargeable Lithium-ion",
            "Charging Port": "USB-C",
            "Safety": "Child-resistant lock",
            "Usage": "Up to 300 ignitions per charge"
        }
    },
    {
        id: "g5",
        name: "Titan 20K Power Bank",
        price: 110,
        compareAtPrice: 139,
        images: ["https://images.unsplash.com/photo-1609091839311-d5368195ad71?auto=format&fit=crop&q=80&w=800"],
        category: "Portable Power",
        slug: "titan-power-bank",
        sizes: ["20,000mAh"],
        description: "Ultra-fast 65W PD output capable of charging a MacBook Pro. Features a digital status display and aerospace-grade aluminum casing.",
        specs: {
            "Capacity": "20,000mAh / 74Wh",
            "Output": "65W Max USB-C PD",
            "Ports": "2x USB-C, 1x USB-A",
            "Material": "Aerospace Aluminum",
            "Charging Time": "1.5 hours via 65W wall plug"
        }
    },
    {
        id: "g6",
        name: "Magnetic 3-in-1 Foldable Station",
        price: 90,
        compareAtPrice: 119,
        images: ["https://images.unsplash.com/photo-1616401775146-042655483125?auto=format&fit=crop&q=80&w=800"],
        category: "Portable Power",
        slug: "foldable-3in1-station",
        sizes: ["Standard"],
        description: "The ultimate travel companion. Folds into a wallet-sized square and opens to charge your iPhone, Apple Watch, and AirPods simultaneously.",
        specs: {
            "Outputs": "15W (iPhone), 5W (Apple Watch), 5W (AirPods)",
            "Battery": "5,000mAh",
            "Material": "Aluminum & Vegan Leather",
            "Weight": "180g",
            "Dimensions": "Closed: 3.5 x 3.5 x 0.6 inches"
        }
    },

    // --- PERSONAL CLIMATE / GADGETS ---
    {
        id: "g7",
        name: "AeroBlade Handheld Fan",
        price: 55,
        images: ["https://images.unsplash.com/photo-1619234139049-36603a118d0b?auto=format&fit=crop&q=80&w=800"],
        category: "Personal Climate",
        slug: "aeroblade-fan",
        sizes: ["Midnight", "Frost"],
        description: "High-velocity brushless motor with 100-speed settings. Lasts up to 12 hours on a single charge. Features a hidden LED flashlight.",
        specs: {
            "Motor": "Brushless High-Velocity",
            "Speed Settings": "100",
            "Battery Life": "Up to 12 hours",
            "Charging": "USB-C (2 hours)",
            "Weight": "250g"
        }
    },
    {
        id: "g8",
        name: "Smart Neck Cooler Pro",
        price: 180,
        compareAtPrice: 225,
        images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"],
        category: "Personal Climate",
        slug: "neck-cooler-pro",
        sizes: ["Adjustable Fit"],
        description: "Wearable air conditioning using Peltier cooling technology. Lowers body temperature sensation by 15 degrees in seconds.",
        specs: {
            "Cooling Technology": "Peltier Cooling",
            "Temperature Reduction": "15 degrees",
            "Battery Life": "Up to 8 hours",
            "Charging": "USB-C (3 hours)",
            "Weight": "200g"
        }
    },
    {
        id: "g9",
        name: "Sonic Essence Diffuser",
        price: 75,
        compareAtPrice: 95,
        images: ["https://cdn.pixabay.com/photo/2019/03/22/22/04/essential-oils-4074315_1280.jpg"],
        category: "Utility",
        slug: "sonic-diffuser",
        sizes: ["300ml"],
        description: "Waterless nebulizing technology that preserves the purity of essential oils. Rechargeable and portable for car or office use.",
        specs: {
            "Technology": "Waterless Nebulizing",
            "Battery Life": "Up to 12 hours",
            "Charging": "USB-C (2 hours)",
            "Weight": "150g"
        }
    },
    {
        id: "g10",
        name: "Nano-Vacuum Desk Cleaner",
        price: 35,
        images: ["https://cdn.pixabay.com/photo/2014/02/17/14/15/vacuum-cleaner-268169_1280.jpg"],
        category: "Utility",
        slug: "nano-vacuum",
        sizes: ["Standard"],
        description: "Pocket-sized vacuum for crumbs, dust, and keyboard debris. Powerful suction in a minimalist cylindrical design.",
        specs: {
            "Suction Power": "15,000 RPM",
            "Battery Life": "Up to 45 minutes",
            "Charging": "USB-C (2 hours)",
            "Weight": "180g"
        }
    }
];
