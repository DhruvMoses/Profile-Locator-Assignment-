// Sample list of user profiles with detailed data
export const profiles = [
  {
    id: '1',
    name: 'Alisha',
    picture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Kerela, India',
    coordinates: {
      lat: 10.850516,
      lng: 76.271080
    },
    intro: 'Product designer with 5+ years of experience in UX/UI design. Passionate about creating accessible interfaces and solving complex user problems. Currently working on fintech solutions that make banking easier for everyone.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'San Francisco',
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    intro: 'Full stack developer specializing in React and Node.js. Former startup founder with a passion for building scalable applications. Advocate for clean code and test-driven development. Currently working remotely for a health tech company.'
  },
  {
    id: '3',
    name: 'Olivia Rodriguez',
    picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Chicago, USA',
    coordinates: {
      lat: 41.8781,
      lng: -87.6298
    },
    intro: 'Marketing specialist with expertise in digital campaigns and brand strategy. Has worked with Fortune 500 companies and small businesses alike. Passionate about data-driven marketing and creating authentic brand experiences.'
  },
  {
    id: '4',
    name: 'David Kim',
    picture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Seattle, USA',
    coordinates: {
      lat: 47.6062,
      lng: -122.3321
    },
    intro: 'Software engineer turned product manager. Combines technical knowledge with business acumen to build products users love. Passionate about agile methodologies and creating inclusive team environments.'
  }
];

// Extracts unique locations from profiles for filtering purposes
export const locations = [...new Set(profiles.map(profile => profile.location))];
