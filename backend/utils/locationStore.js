const locations = {
    1: { name: "museum", imageUrl: "https://dummyimage.com/600x400/000/fff&text=museum" },
    2: { name: "park", imageUrl: "https://dummyimage.com/600x400/000/fff&text=park" },
    3: { name: "restaurant", imageUrl: "https://dummyimage.com/600x400/000/fff&text=restaurant" },
    4: { name: "hospital", imageUrl: "https://dummyimage.com/600x400/000/fff&text=hospital" },
    5: { name: "school", imageUrl: "https://dummyimage.com/600x400/000/fff&text=school" },
    6: { name: "library", imageUrl: "https://dummyimage.com/600x400/000/fff&text=library" },
    7: { name: "cinema", imageUrl: "https://dummyimage.com/600x400/000/fff&text=cinema" },
    8: { name: "beach", imageUrl: "https://dummyimage.com/600x400/000/fff&text=beach" },
    9: { name: "zoo", imageUrl: "https://dummyimage.com/600x400/000/fff&text=zoo" },
    10: { name: "market", imageUrl: "https://dummyimage.com/600x400/000/fff&text=market" },
    11: { name: "stadium", imageUrl: "https://dummyimage.com/600x400/000/fff&text=stadium" },
    12: { name: "amusement park", imageUrl: "https://dummyimage.com/600x400/000/fff&text=amusement+park" },
    13: { name: "aquarium", imageUrl: "https://dummyimage.com/600x400/000/fff&text=aquarium" },
    14: { name: "art gallery", imageUrl: "https://dummyimage.com/600x400/000/fff&text=art+gallery" },
    15: { name: "nursery", imageUrl: "https://dummyimage.com/600x400/000/fff&text=nursery" },
    16: { name: "bakery", imageUrl: "https://dummyimage.com/600x400/000/fff&text=bakery" },
    17: { name: "cafe", imageUrl: "https://dummyimage.com/600x400/000/fff&text=cafe" },
    18: { name: "gym", imageUrl: "https://dummyimage.com/600x400/000/fff&text=gym" },
    19: { name: "pharmacy", imageUrl: "https://dummyimage.com/600x400/000/fff&text=pharmacy" },
    20: { name: "supermarket", imageUrl: "https://dummyimage.com/600x400/000/fff&text=supermarket" },
    21: { name: "bank", imageUrl: "https://dummyimage.com/600x400/000/fff&text=bank" },
    22: { name: "police station", imageUrl: "https://dummyimage.com/600x400/000/fff&text=police+station" },
    23: { name: "fire station", imageUrl: "https://dummyimage.com/600x400/000/fff&text=fire+station" },
    24: { name: "train station", imageUrl: "https://dummyimage.com/600x400/000/fff&text=train+station" },
    25: { name: "airport", imageUrl: "https://dummyimage.com/600x400/000/fff&text=airport" }
};

const getRandomLocation = () => {
    const keys = Object.keys(locations);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return locations[randomKey].name;
};

const getLocationImage = (locationName) => {
    for(const key in locations) {
        if (locations[key].name === locationName) {
            return locations[key].imageUrl;
        }
    }
    return null; // Return null if location not found
};

const getLocationId = (locationName) => {
    for(const key in locations) {
        if (locations[key].name === locationName) {
            return key; // Return the key (ID) of the location
        }
    }
    return null; // Return null if location not found
};

export default {
    getRandomLocation,
    getLocationImage,
    getLocationId
}