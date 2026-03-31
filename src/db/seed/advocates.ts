import _ from "lodash";
import { Advocate } from "../../app/types/advocate";

const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Michael",
  "Emily",
  "Chris",
  "Jessica",
  "David",
  "Laura",
  "Daniel",
  "Sarah",
  "James",
  "Megan",
  "Joshua",
  "Amanda",
];
const lastNames = [
  "Doe",
  "Smith",
  "Johnson",
  "Brown",
  "Davis",
  "Martinez",
  "Taylor",
  "Harris",
  "Clark",
  "Lewis",
  "Lee",
  "King",
  "Green",
  "Walker",
  "Hall",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "San Francisco",
  "Columbus",
  "Fort Worth",
];

const degrees = ["MD", "PhD", "MSW"];

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const randomInt = (upperLimit: number, lowerLimit: number = 0) =>
  Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
const randomEl = <T>(list: T[]) => list[randomInt(list.length)];

const randomSpecialties = () => {
  const random1 = randomInt(specialties.length);
  const random2 = randomInt(specialties.length, random1 + 1);
  return specialties.slice(random1, random2);
};

const randomPhoneNumber = () =>
  "555" +
  _.range(0, 7)
    .map(() => randomInt(10))
    .join("");

const randomAdvocate = (): Omit<Advocate, "id"> => ({
  firstName: randomEl(firstNames),
  lastName: randomEl(lastNames),
  city: randomEl(cities),
  degree: randomEl(degrees),
  specialties: randomSpecialties(),
  yearsOfExperience: randomInt(20),
  phoneNumber: randomPhoneNumber(),
});

const advocateData = (n: number = 20) =>
  _.range(0, n).map(() => randomAdvocate());

export { advocateData };
