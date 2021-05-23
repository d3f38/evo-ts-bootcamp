import { Rover } from "./solSlice";

// A mock function to mimic making an async request for data
export function fetchPhotos(sol: number, rover: Rover) {
  return fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=KJvAIAOEUgokd71oXfGaQqniBUKqxfkGCbBGvRdA`
  )
    .then((res) => res.json())
    .then((data) => data.photos);
}
