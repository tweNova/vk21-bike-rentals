export interface MotorbikeRental {
    id: string;
    name: string;
    category: 'Royal Enfield' | 'Commuter' | 'Scooter' | 'Adventure';
    description: string;
    price: string;
    rating: number;
    image: string;
    specs: string[];
}

export const motorbikeRentals: MotorbikeRental[] = [
    {
        id: 'classic-350-new',
        name: 'Royal Enfield Classic 350 (New Gen)',
        category: 'Royal Enfield',
        description: 'The timeless classic, redefined for the modern explorer. Smooth power and iconic design.',
        price: 'Rs. 1,500/day',
        rating: 4.9,
        image: '/bikes/classic-350.png',
        specs: ['350cc J-Series', 'Classic Aesthetics', 'Dual Channel ABS']
    },
    {
        id: 'hunter-350',
        name: 'Royal Enfield Hunter 350',
        category: 'Royal Enfield',
        description: 'Agile, stylish, and perfect for navigating Siliguri streets and winding mountain roads.',
        price: 'Rs. 1,300/day',
        rating: 4.7,
        image: '/bikes/hunter-350.png',
        specs: ['350cc', 'Urban Scrambler', 'Low Seat Height']
    },
    {
        id: 'himalayan-bike',
        name: 'Royal Enfield Himalayan',
        category: 'Adventure',
        description: 'The mountain goat. Built for the high-altitude trails of Leh, Ladakh, and Spiti.',
        price: 'Rs. 1,800/day',
        rating: 5.0,
        image: '/bikes/himalayan.png',
        specs: ['411cc/450cc', 'Long Travel Suspension', 'Adventure Ready']
    },
    {
        id: 'interceptor-650',
        name: 'Royal Enfield Interceptor 650',
        category: 'Royal Enfield',
        description: 'Powerful twin-cylinder engine for the ultimate highway and mountain cruising experience.',
        price: 'Rs. 2,500/day',
        rating: 4.9,
        image: '/bikes/interceptor-650.png',
        specs: ['650cc Twin', 'Smooth Torque', 'Premium Cruiser']
    },
    {
        id: 'thunderbird-350',
        name: 'Royal Enfield Thunderbird 350',
        category: 'Royal Enfield',
        description: 'The ultimate cruiser for long highway journeys and comfortable mountain rides.',
        price: 'Rs. 1,400/day',
        rating: 4.8,
        image: '/bikes/thunderbird-350.png',
        specs: ['350cc', 'Cruiser Styling', 'Projector Headlamp']
    },
    {
        id: 'xpulse-200',
        name: 'Hero Xpulse 200 4V',
        category: 'Adventure',
        description: 'Lightweight, nimble, and built for extreme off-road enthusiasts.',
        price: 'Rs. 1,200/day',
        rating: 4.8,
        image: '/bikes/hero-xpulse-2004v.png',
        specs: ['200cc 4V', 'Off-road Prowess', 'Lightweight Build']
    },
    {
        id: 'pulsar-150',
        name: 'Bajaj Pulsar 150',
        category: 'Commuter',
        description: 'The definitive commuter bike, offering a perfect blend of performance and fuel efficiency.',
        price: 'Rs. 1,000/day',
        rating: 4.6,
        image: '/bikes/pulsar-150.png',
        specs: ['150cc', 'Fuel Efficient', 'Reliable Performance']
    },
    {
        id: 'apache-200',
        name: 'TVS Apache 200 RTR',
        category: 'Commuter',
        description: 'Sporty performance and aggressive styling for those who love speed and agility.',
        price: 'Rs. 1,200/day',
        rating: 4.7,
        image: '/bikes/tvs-apache-200.png',
        specs: ['200cc', 'Race DNA', 'Slipper Clutch']
    },
    {
        id: 'ntorq-125',
        name: 'TVS NTORQ 125',
        category: 'Scooter',
        description: 'The ultimate performance scooter with Bluetooth connectivity and sporty handling.',
        price: 'Rs. 800/day',
        rating: 4.5,
        image: '/bikes/tvs-ntorq.png',
        specs: ['125cc', 'SmartXonnect', 'Disc Brakes']
    },
    {
        id: 'fz-250',
        name: 'Yamaha FZ 25',
        category: 'Commuter',
        description: 'Powerful 250cc engine in a street-fighter package. Great for both city and highway.',
        price: 'Rs. 1,400/day',
        rating: 4.8,
        image: '/bikes/yamaha-fz-250.png',
        specs: ['250cc', 'LED Headlamp', 'Street Fighter Look']
    },
    {
        id: 'avenger-220',
        name: 'Bajaj Avenger 220',
        category: 'Commuter',
        description: 'Low-slung cruiser comfort for those long, relaxed rides through the foothills.',
        price: 'Rs. 1,200/day',
        rating: 4.6,
        image: '/bikes/avenger220.png',
        specs: ['220cc', 'Cruiser Comfort', 'Easy Riding']
    }
];

export interface TourFeature {
    title: string;
    description: string;
    icon: string;
}

export const tourFeatures: TourFeature[] = [
    {
        title: 'Best Quality Bikes',
        description: 'Meticulously maintained fleet for the ultimate mountain experience.',
        icon: 'https://cdn-icons-png.flaticon.com/512/1768/1768191.png'
    },
    {
        title: 'Lowest Price Guarantee',
        description: 'Best rental rates in Siliguri. Match guaranteed.',
        icon: 'https://cdn-icons-png.flaticon.com/512/567/567600.png'
    },
    {
        title: 'Money Back Guarantee',
        description: 'Total peace of mind with our transparent refund policy.',
        icon: 'https://cdn-icons-png.flaticon.com/512/102/102649.png'
    }
];
