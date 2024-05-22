export default defineEventHandler(async (event) => {
  const words = [
    "blush", "plaid", "stout", "fling", "pride", "crave", "spicy", "unlit", 
    "vigor", "wacky", "jazzy", "candy", "crisp", "faint", "grasp", "large", 
    "mango", "nasty", "olive", "plumb", "quirk", "radio", "sauna", "token", 
    "unwed", "voter", "whelp", "yield", "blunt", "crust", "foyer", "glory", 
    "hotel", "irate", "jolly", "knoll"
  ];
  
  const generatedId = `${words[Math.floor(Math.random() * words.length)]}-${words[Math.floor(Math.random() * words.length)]}-${words[Math.floor(Math.random() * words.length)]}-${words[Math.floor(Math.random() * words.length)]}-${words[Math.floor(Math.random() * words.length)]}`;
  return generatedId
})
