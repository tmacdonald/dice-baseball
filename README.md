A ruleset is a listing of dice rolls with the corresponding action taken in the game.

ie. 
  1 / 1   double 
  1 / 2   single 
  1 / 3   single 
  1 / 4   single 
  1 / 5   base on error  
  1 / 6   base on balls 
  2 / 2   strike 
  2 / 3   strike 
  2 / 4   strike 
  2 / 5   strike 
  2 / 6   foul out 
  3 / 3   out at 1st 
  3 / 4   out at 1st 
  3 / 5   out at 1st 
  3 / 6   out at 1st 
  4 / 4   fly out  
  4 / 5   fly out  
  4 / 6   fly out  
  5 / 5   double play  
  5 / 6   triple  
  6 / 6   home run 

I'm thinking of providing a function that takes a ruleset and generates a function that returns an action based on a roll