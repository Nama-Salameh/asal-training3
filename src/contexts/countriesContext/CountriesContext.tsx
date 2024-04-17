import React, { useContext, createContext, useReducer, ReactNode } from "react";

interface Country {
  name: string;
  description: string;
  id: number;
}
type Action = { type: "delete"; id: number };

const CountriesContext = createContext<Country[] | null>(null);
const CountriesDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

export const CountriesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [countries, dispatch] = useReducer(countriesReducer, initialCountries);
  return (
    <CountriesContext.Provider value={countries}>
      <CountriesDispatchContext.Provider value={dispatch}>
        {children}
      </CountriesDispatchContext.Provider>
    </CountriesContext.Provider>
  );
};

export function useCountries() {
  return useContext(CountriesContext);
}

export function useCountriesDispatch() {
  return useContext(CountriesDispatchContext);
}

function countriesReducer(countries: Country[], action: Action) {
  switch (action.type) {
    case "delete": {
      return countries.filter((country: Country) => country.id !== action.id);
    }
    default: {
      throw Error("Unknown action");
    }
  }
}
const initialCountries: Country[] = [
  {
    name: "Al Atatra",
    description:
      "Al Atatra, situated in Gaza, encapsulates the essence of Palestinian resilience amidst adversity. Despite facing challenges, the community of Al Atatra remains steadfast, embodying the enduring spirit of Gaza's people. Its streets, lined with humble homes and bustling markets, reflect the daily life and perseverance of its residents. Al Atatra stands as a testament to the unwavering determination and solidarity of Gaza's inhabitants, inspiring hope and resilience in the face of hardship.",
    id: 0,
  },
  {
    name: "Beit Hanoun",
    description:
      "Beit Hanoun, in northern Gaza, boasts serene landscapes dotted with lush orchards and olive groves. Despite its tranquility, the town bears the marks of conflict, reflecting the resilience of its inhabitants. Amidst its peaceful surroundings, Beit Hanoun remains a symbol of hope and endurance in the face of adversity.",
    id: 1,
  },
  {
    name: "Al Zahra",
    description:
      "Al Zahra, in Gaza, is a vibrant neighborhood bustling with activity. Its lively markets and traditional cafes are hubs of community interaction and warmth. Despite challenges, Al Zahra thrives as a symbol of resilience and unity in Gaza's dynamic landscape.",
    id: 2,
  },
  {
    name: "Al Karameh ",
    description:
      "Al Karameh in Gaza City is a bustling marketplace, alive with the vibrant energy of vendors and shoppers. Its narrow alleys are lined with stalls selling everything from spices to textiles, creating a kaleidoscope of colors and scents. Amidst the chaos, Al Karameh is a symbol of resilience, embodying the spirit of Gaza's community and heritage in every bustling corner.",
    id: 2,
  },
];
