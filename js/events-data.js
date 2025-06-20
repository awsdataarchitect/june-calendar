/**
 * June Calendar Events Data
 * This file contains the data for all significant events in June
 */

/**
 * Event Categories
 * Defines the different types of events in the calendar
 */
const eventCategories = [
  {
    id: "cultural",
    name: "Cultural Celebrations",
    description: "Holidays and events celebrating cultural heritage and traditions",
    color: "#FF5722",
    icon: "cultural-icon.svg"
  },
  {
    id: "historical",
    name: "Historical Events",
    description: "Significant historical moments and commemorations",
    color: "#2196F3",
    icon: "historical-icon.svg"
  },
  {
    id: "awareness",
    name: "Awareness Days",
    description: "Days dedicated to raising awareness about important causes",
    color: "#4CAF50",
    icon: "awareness-icon.svg"
  },
  {
    id: "natural",
    name: "Natural Phenomena",
    description: "Astronomical and seasonal events",
    color: "#9C27B0",
    icon: "natural-icon.svg"
  },
  {
    id: "other",
    name: "Other Celebrations",
    description: "Fun, quirky, and miscellaneous observances",
    color: "#FFC107",
    icon: "other-icon.svg"
  }
];

/**
 * June Events
 * Array of objects containing events for each day in June
 */
const juneEvents = [
  {
    day: 1,
    events: [
      {
        title: "Global Day of Parents",
        type: "awareness",
        description: "A day to appreciate parents worldwide for their selfless commitment to children.",
        fullDescription: "Established by the UN General Assembly in 2012, this day honors parents' dedication to their children and acknowledges the primary responsibility of families in nurturing and protecting children.",
        imageUrl: "https://via.placeholder.com/300x160?text=Global+Day+of+Parents",
        links: [
          {
            title: "United Nations Official Page",
            url: "https://www.un.org/en/observances/parents-day"
          }
        ]
      },
      {
        title: "World Milk Day",
        type: "awareness",
        description: "A day established by the Food and Agriculture Organization to recognize the importance of milk.",
        fullDescription: "First celebrated in 2001, World Milk Day raises awareness about the dairy sector and the nutritional value of milk in our diets. The date was chosen because many countries were already celebrating milk-related events around this time.",
        imageUrl: "https://via.placeholder.com/300x160?text=World+Milk+Day",
        links: [
          {
            title: "FAO World Milk Day",
            url: "http://www.fao.org/world-milk-day"
          }
        ]
      }
    ]
  },
  {
    day: 2,
    events: [
      {
        title: "Italian Republic Day",
        type: "cultural",
        description: "National day of Italy, commemorating the institutional referendum of 1946.",
        fullDescription: "Festa della Repubblica (Republic Day) is the Italian National Day, which commemorates the institutional referendum held on June 2, 1946, when the Italian population was called to decide on the form of government following World War II and the fall of Fascism.",
        imageUrl: "https://via.placeholder.com/300x160?text=Italian+Republic+Day",
        links: [
          {
            title: "Learn More About Italian Republic Day",
            url: "https://en.wikipedia.org/wiki/Festa_della_Repubblica"
          }
        ]
      }
    ]
  },
  {
    day: 3,
    events: [
      {
        title: "World Bicycle Day",
        type: "awareness",
        description: "A day to celebrate the uniqueness, longevity, and versatility of the bicycle.",
        fullDescription: "Adopted by the United Nations in 2018, World Bicycle Day acknowledges the bicycle as a simple, affordable, reliable, and environmentally friendly means of transportation that promotes good health and physical activity.",
        imageUrl: "https://via.placeholder.com/300x160?text=World+Bicycle+Day",
        links: [
          {
            title: "UN World Bicycle Day",
            url: "https://www.un.org/en/observances/bicycle-day"
          }
        ]
      }
    ]
  },
  {
    day: 5,
    events: [
      {
        title: "World Environment Day",
        type: "awareness",
        description: "The United Nations' principal vehicle for encouraging awareness and action for the environment.",
        fullDescription: "First held in 1974, World Environment Day is a global platform for public outreach that is widely celebrated in over 100 countries. Each year, the day focuses on a particular environmental concern, with different host countries and themes.",
        imageUrl: "https://via.placeholder.com/300x160?text=World+Environment+Day",
        links: [
          {
            title: "Official World Environment Day Site",
            url: "https://www.worldenvironmentday.global/"
          }
        ]
      }
    ]
  },
  {
    day: 6,
    events: [
      {
        title: "D-Day Anniversary",
        type: "historical",
        description: "Commemorates the Normandy landings of Allied forces in 1944 during World War II.",
        fullDescription: "On June 6, 1944, the Allied forces launched the largest seaborne invasion in history, beginning the liberation of Western Europe from Nazi control. This operation, codenamed Operation Neptune but commonly known as D-Day, was a turning point in World War II.",
        imageUrl: "https://via.placeholder.com/300x160?text=D-Day+Anniversary",
        links: [
          {
            title: "D-Day History",
            url: "https://www.history.com/topics/world-war-ii/d-day"
          }
        ]
      }
    ]
  },
  {
    day: 8,
    events: [
      {
        title: "World Oceans Day",
        type: "awareness",
        description: "A day to celebrate the role of oceans and raise awareness about their conservation.",
        fullDescription: "Officially recognized by the United Nations since 2008, World Oceans Day reminds us of the major role oceans play in everyday life. The day is an opportunity to inform the public of the impact of human actions on the ocean and mobilize global efforts for sustainable management of the world's oceans.",
        imageUrl: "https://via.placeholder.com/300x160?text=World+Oceans+Day",
        links: [
          {
            title: "World Oceans Day Official Site",
            url: "https://worldoceansday.org/"
          }
        ]
      }
    ]
  },
  {
    day: 12,
    events: [
      {
        title: "World Day Against Child Labor",
        type: "awareness",
        description: "A day to raise awareness about the plight of child laborers worldwide.",
        fullDescription: "Launched by the International Labour Organization (ILO) in 2002, this day focuses attention on the global extent of child labor and the actions needed to eliminate it. The day brings together governments, employers, labor organizations, civil society, and millions of people to highlight the plight of child laborers and what can be done to help them.",
        imageUrl: "https://via.placeholder.com/300x160?text=World+Day+Against+Child+Labor",
        links: [
          {
            title: "ILO World Day Against Child Labor",
            url: "https://www.ilo.org/ipec/Campaignandadvocacy/wdacl/lang--en/index.htm"
          }
        ]
      }
    ]
  },
  {
    day: 14,
    events: [
      {
        title: "World Blood Donor Day",
        type: "awareness",
        description: "A day to thank voluntary blood donors and raise awareness about the need for blood donations.",
        fullDescription: "Established by the World Health Organization, this day thanks voluntary blood donors for their life-saving gifts of blood and raises awareness of the need for regular blood donations. The day also focuses on the importance of safe blood transfusions and the contribution they make to maternal health, childcare, and emergency response.",
        imageUrl: "https://via.placeholder.com/300x160?text=World+Blood+Donor+Day",
        links: [
          {
            title: "WHO World Blood Donor Day",
            url: "https://www.who.int/campaigns/world-blood-donor-day"
          }
        ]
      },
      {
        title: "Flag Day (USA)",
        type: "cultural",
        description: "Commemorates the adoption of the flag of the United States on June 14, 1777.",
        fullDescription: "Flag Day commemorates the adoption of the Stars and Stripes as the official flag of the United States. The flag was adopted by resolution of the Second Continental Congress on June 14, 1777. In 1916, President Woodrow Wilson issued a proclamation that officially established June 14 as Flag Day.",
        imageUrl: "https://via.placeholder.com/300x160?text=Flag+Day+USA",
        links: [
          {
            title: "History of Flag Day",
            url: "https://www.history.com/topics/holidays/flag-day"
          }
        ]
      }
    ]
  },
  {
    day: 19,
    events: [
      {
        title: "Juneteenth",
        type: "historical",
        description: "Commemorates the emancipation of enslaved African Americans in the United States.",
        fullDescription: "Juneteenth (a blend of 'June' and 'nineteenth') marks the day in 1865 when Union soldiers arrived in Galveston, Texas, with news that the Civil War had ended and that enslaved people were now free. This was two and a half years after President Lincoln's Emancipation Proclamation. Juneteenth became a federal holiday in the United States in 2021.",
        imageUrl: "https://via.placeholder.com/300x160?text=Juneteenth",
        links: [
          {
            title: "Juneteenth History",
            url: "https://www.juneteenth.com/history/"
          }
        ]
      }
    ]
  },
  {
    day: 20,
    events: [
      {
        title: "World Refugee Day",
        type: "awareness",
        description: "A day to honor the courage and resilience of refugees around the world.",
        fullDescription: "Established by the United Nations, World Refugee Day honors the strength and courage of refugees and encourages public awareness and support of the refugees, people who have had to flee their home countries because of conflict or natural disaster.",
        imageUrl: "https://via.placeholder.com/300x160?text=World+Refugee+Day",
        links: [
          {
            title: "UNHCR World Refugee Day",
            url: "https://www.unhcr.org/world-refugee-day.html"
          }
        ]
      }
    ]
  },
  {
    day: 21,
    events: [
      {
        title: "Summer Solstice (Northern Hemisphere)",
        type: "natural",
        description: "The longest day of the year in the Northern Hemisphere, marking the start of summer.",
        fullDescription: "The summer solstice occurs when one of Earth's poles has its maximum tilt toward the Sun. It happens twice yearly, once in each hemisphere. In the Northern Hemisphere, the June solstice marks the day when the Sun is at its highest point in the sky, resulting in the longest period of daylight for the year.",
        imageUrl: "https://via.placeholder.com/300x160?text=Summer+Solstice",
        links: [
          {
            title: "Learn About the Summer Solstice",
            url: "https://www.timeanddate.com/calendar/summer-solstice.html"
          }
        ]
      },
      {
        title: "International Day of Yoga",
        type: "awareness",
        description: "A day to raise awareness worldwide of the many benefits of practicing yoga.",
        fullDescription: "Proclaimed by the United Nations in 2014, the International Day of Yoga aims to raise awareness worldwide of the many benefits of practicing yoga. The draft resolution establishing the day was proposed by India and endorsed by a record 175 member states.",
        imageUrl: "https://via.placeholder.com/300x160?text=International+Yoga+Day",
        links: [
          {
            title: "UN International Day of Yoga",
            url: "https://www.un.org/en/observances/yoga-day"
          }
        ]
      }
    ]
  },
  {
    day: 23,
    events: [
      {
        title: "International Olympic Day",
        type: "other",
        description: "A day to commemorate the birth of the modern Olympic Games and promote participation in sport.",
        fullDescription: "Created in 1948 to commemorate the birth of the modern Olympic Games on June 23, 1894, Olympic Day is much more than just a sports event. It is a day for the world to get active, learn about Olympic values, and discover new sports.",
        imageUrl: "https://via.placeholder.com/300x160?text=Olympic+Day",
        links: [
          {
            title: "Olympic Day Information",
            url: "https://olympics.com/ioc/olympic-day"
          }
        ]
      }
    ]
  },
  {
    day: 27,
    events: [
      {
        title: "Micro-, Small and Medium-sized Enterprises Day",
        type: "awareness",
        description: "A day to raise awareness of the contribution of small businesses to sustainable development.",
        fullDescription: "Designated by the United Nations, this day recognizes the importance of micro-, small and medium-sized enterprises in achieving sustainable development goals, particularly in promoting innovation, creativity, and decent work for all.",
        imageUrl: "https://via.placeholder.com/300x160?text=MSME+Day",
        links: [
          {
            title: "UN MSME Day",
            url: "https://www.un.org/en/observances/micro-small-medium-businesses-day"
          }
        ]
      }
    ]
  },
  {
    day: 30,
    events: [
      {
        title: "International Asteroid Day",
        type: "awareness",
        description: "A day to raise awareness about asteroids and their potential impact on Earth.",
        fullDescription: "International Asteroid Day aims to raise public awareness about the asteroid impact hazard and inform the public about the crisis communication actions to be taken at the global level in case of a credible near-Earth object threat. It was established by the United Nations in 2016.",
        imageUrl: "https://via.placeholder.com/300x160?text=Asteroid+Day",
        links: [
          {
            title: "Asteroid Day Official Site",
            url: "https://asteroidday.org/"
          }
        ]
      }
    ]
  }
];

/**
 * Get events for a specific day
 * @param {number} day - The day number (1-30)
 * @returns {Array} - Array of events for the specified day
 */
function getEventsForDay(day) {
  const dayEvents = juneEvents.find(item => item.day === day);
  return dayEvents ? dayEvents.events : [];
}

/**
 * Get all events across all days
 * @returns {Array} - Array of all events with day information
 */
function getAllEvents() {
  return juneEvents.reduce((allEvents, dayData) => {
    dayData.events.forEach(event => {
      allEvents.push({
        day: dayData.day,
        ...event
      });
    });
    return allEvents;
  }, []);
}

/**
 * Get events by category
 * @param {string} category - The category to filter by
 * @returns {Array} - Array of events in the specified category
 */
function getEventsByCategory(category) {
  return getAllEvents().filter(event => event.type === category);
}

// This function has been replaced with an enhanced version below

/**
 * Get days with events
 * @returns {Array} - Array of day numbers that have events
 */
function getDaysWithEvents() {
  return juneEvents.map(item => item.day);
}

/**
 * Get days with events of a specific category
 * @param {string} category - The category to filter by
 * @returns {Array} - Array of day numbers that have events in the specified category
 */
function getDaysWithCategoryEvents(category) {
  return juneEvents
    .filter(item => item.events.some(event => event.type === category))
    .map(item => item.day);
}

/**
 * Get event category information by ID
 * @param {string} categoryId - The category ID
 * @returns {Object|null} - The category information or null if not found
 */
function getEventCategory(categoryId) {
  return eventCategories.find(category => category.id === categoryId) || null;
}

/**
 * Get all event categories
 * @returns {Array} - Array of all event categories
 */
function getAllEventCategories() {
  return eventCategories;
}

/**
 * Count events by category
 * @returns {Object} - Object with category IDs as keys and counts as values
 */
function countEventsByCategory() {
  const counts = {};
  
  // Initialize counts for all categories
  eventCategories.forEach(category => {
    counts[category.id] = 0;
  });
  
  // Count events by category
  getAllEvents().forEach(event => {
    if (counts[event.type] !== undefined) {
      counts[event.type]++;
    }
  });
  
  return counts;
}

/**
 * Get category legend data for display
 * @returns {Array} - Array of objects with category information and counts
 */
function getCategoryLegendData() {
  const counts = countEventsByCategory();
  
  return eventCategories.map(category => {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color,
      count: counts[category.id] || 0
    };
  });
}
/**
 * Get featured events for the carousel with enhanced selection algorithm
 * @returns {Array} - Array of featured events
 */
function getFeaturedEvents() {
  // Get all events
  const allEvents = getAllEvents();
  
  // Calculate event importance scores
  const scoredEvents = allEvents.map(event => {
    let score = 0;
    
    // Score based on event type
    switch(event.type) {
      case 'historical':
        score += 5; // Historical events are highly significant
        break;
      case 'cultural':
        score += 4; // Cultural celebrations are important
        break;
      case 'natural':
        score += 4; // Natural phenomena are interesting
        break;
      case 'awareness':
        score += 3; // Awareness days are meaningful
        break;
      case 'other':
        score += 2; // Other events are still relevant
        break;
    }
    
    // Score based on content richness
    if (event.fullDescription && event.fullDescription.length > 200) score += 2;
    if (event.imageUrl) score += 2;
    if (event.links && event.links.length > 0) score += 1;
    
    // Score based on day position (favor events spread throughout the month)
    const dayPosition = event.day;
    if (dayPosition <= 10) score += 1;
    else if (dayPosition <= 20) score += 2;
    else score += 1;
    
    // Return event with score
    return {
      ...event,
      score
    };
  });
  
  // Sort by score (descending)
  scoredEvents.sort((a, b) => b.score - a.score);
  
  // Get top 8 events
  const topEvents = scoredEvents.slice(0, 8);
  
  // Ensure diversity of event types
  const featuredEvents = [];
  const includedTypes = new Set();
  const includedDays = new Set();
  
  // First pass: add highest scoring event of each type
  topEvents.forEach(event => {
    if (!includedTypes.has(event.type) && featuredEvents.length < 6) {
      featuredEvents.push(event);
      includedTypes.add(event.type);
      includedDays.add(event.day);
    }
  });
  
  // Second pass: fill remaining slots with highest scoring events
  // that don't share the same day as already included events
  topEvents.forEach(event => {
    if (!includedDays.has(event.day) && featuredEvents.length < 6) {
      featuredEvents.push(event);
      includedDays.add(event.day);
    }
  });
  
  // If we still have slots, add any remaining top events
  if (featuredEvents.length < 6) {
    topEvents.forEach(event => {
      if (!featuredEvents.includes(event) && featuredEvents.length < 6) {
        featuredEvents.push(event);
      }
    });
  }
  
  // Sort by day for chronological display
  featuredEvents.sort((a, b) => a.day - b.day);
  
  return featuredEvents;
}