const eventsData = [
  {
    id: 237632,
    date: new Date("2026-03-21"),
    events: [
      {
        id: 7843687,
        title: "Gorvin Show",
        description: "An amazing theatrical performance",
        venue: "Central Theater",
        time: "19:00",
        price: 45,
        seats: [
          { id: 1, label: "2a", isSelected: false },
          { id: 2, label: "2b", isSelected: false },
          { id: 3, label: "2c", isSelected: true },
          { id: 4, label: "3a", isSelected: false },
          { id: 5, label: "3b", isSelected: false },
          { id: 6, label: "3c", isSelected: false },
        ],
      },
      {
        id: 7843688,
        title: "Comedy Night",
        description: "Stand-up comedy with top comedians",
        venue: "Laugh Factory",
        time: "21:00",
        price: 30,
        seats: [
          { id: 1, label: "A1", isSelected: false },
          { id: 2, label: "A2", isSelected: true },
          { id: 3, label: "A3", isSelected: false },
          { id: 4, label: "B1", isSelected: false },
          { id: 5, label: "B2", isSelected: false },
        ],
      },
    ],
  },
  {
    id: 237633,
    date: new Date("2026-03-22"),
    events: [
      {
        id: 7843689,
        title: "Rock Concert",
        description: "Live rock music experience",
        venue: "Stadium Arena",
        time: "20:00",
        price: 60,
        seats: [
          { id: 1, label: "1a", isSelected: true },
          { id: 2, label: "1b", isSelected: false },
          { id: 3, label: "1c", isSelected: true },
          { id: 4, label: "2a", isSelected: false },
        ],
      },
    ],
  },
  {
    id: 237634,
    date: new Date("2026-03-23"),
    events: [
      {
        id: 7843690,
        title: "Magic Show",
        description: "Illusions and mind-bending tricks",
        venue: "Mystery Hall",
        time: "18:00",
        price: 40,
        seats: [
          { id: 1, label: "Front 1", isSelected: false },
          { id: 2, label: "Front 2", isSelected: false },
          { id: 3, label: "Front 3", isSelected: true },
          { id: 4, label: "Back 1", isSelected: false },
        ],
      },
      {
        id: 7843691,
        title: "Jazz Evening",
        description: "Smooth jazz and cocktails",
        venue: "Blue Note Club",
        time: "22:00",
        price: 50,
        seats: [
          { id: 1, label: "VIP 1", isSelected: true },
          { id: 2, label: "VIP 2", isSelected: true },
          { id: 3, label: "VIP 3", isSelected: false },
        ],
      },
    ],
  },
];

export default eventsData;
