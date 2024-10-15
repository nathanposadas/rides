// data.js

export interface Request {
  name: string;
  destination: string;
  fare: string;
  schedule: string;
  day?: string; // Optional if not always present
  time?: string; // Optional if not always present
}

const requests: Request[] = [
  {
    name: "Juan Dela Cruz",
    destination: "Santolan - Parada",
    fare: "Php15",
    schedule: 'N/A',
    time: 'N/A',
  },
  {
    name: "Maria Clara",
    destination: "Bonifacio High Street",
    fare: "Php30",
    schedule: 'N/A',
    time: 'N/A',
  },
  {
    name: "Jose Rizal",
    destination: "Intramuros",
    fare: "Php20",
    schedule: 'N/A',
    time: 'N/A',
  },
  {
    name: "Andres Bonifacio",
    destination: 'N/A',
    fare: 'N/A',
    schedule: "October",
    day: "Mon-Fri",
    time: "7am",
  },
  {
    name: "Emilio Aguinaldo",
    destination: 'N/A',
    fare: 'N/A',
    schedule: "November",
    day: "Mon-Fri",
    time: "8am",
  },
];

export default requests;
