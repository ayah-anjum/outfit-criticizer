function criticizeOutfit() {
    const input = document.getElementById("input").value.toLowerCase();
    const output = document.getElementById("output");
    
    if (!input.trim()) {
      output.innerText = "Please describe your outfit first!";
      return;
    }
    
    output.innerText = "Analyzing your fashion choices...";
    
    // Simulate thinking time
    setTimeout(() => {
      const criticism = generateOutfitCriticism(input);
      output.innerText = criticism;
    }, 800);
  }
  
  function generateOutfitCriticism(outfitDescription) {
    // Keywords to look for and their associated responses
    const fashionKeywords = {
      "jeans": ["Jeans? How original. Did you also discover fire today?", 
                "Ah yes, the universal symbol of 'I gave up today but still wanted pants'."],
      "t-shirt": ["A t-shirt? Revolutionary. Anna Wintour is shaking.", 
                  "Nothing says 'I'm trying, but not too hard' like a t-shirt."],
      "hoodie": ["A hoodie? Are you coding a startup or just hiding from fashion?", 
                 "Hoodies: the uniform of people who want to be comfortable while looking like they might steal your WiFi."],
      "suit": ["A suit doesn't automatically make you look professional if it fits like a tent.", 
               "Wearing a suit is like using punctuation; necessary, but won't make boring content interesting."],
      "dress": ["A dress can be elegant, but so can a napkin if folded correctly.", 
                "Dresses: when you want to look fancy but don't want to match separates."],
      "shorts": ["Shorts are just pants that gave up halfway.", 
                 "Ah, shorts - when you want your legs to be free but your fashion sense to be constrained."],
      "sneakers": ["Sneakers with that? Bold choice if 'bold' means 'what everyone else is doing'.", 
                   "Sneakers: because fashion and comfort reached a compromise that satisfies neither."],
      "heels": ["Heels: the perfect way to say 'I hate being comfortable but love being tall'.", 
                "Those heels are saying 'I'm prepared to suffer for fashion' but your posture is screaming 'help'."],
      "hat": ["A hat indoors? Are you hiding a bad haircut or just your fashion sense?", 
              "That hat is doing a lot of heavy lifting for this outfit. Maybe let it rest."],
      "black": ["Wearing all black doesn't make you look sophisticated, it makes you look like you're auditioning for a mime troupe.", 
                "Black is slimming, but it won't slim down a bloated fashion sense."],
      "colorful": ["I see you've embraced all the colors of the rainbow. The rainbow called, it wants its dignity back.", 
                   "Colorful doesn't mean fashionable, just like loud doesn't mean correct."],
      "vintage": ["'Vintage' is just a fancy word for 'I found this in the back of someone else's closet'.", 
                  "Vintage? Or just old? There's a fine line between retro and refuse."],
      "formal": ["Formal wear doesn't automatically make you look sophisticated if you wear it like you're being punished.", 
                 "Being overdressed is just as bad as being underdressed, but requires more ironing."],
      "casual": ["Casual doesn't mean 'looks like you just rolled out of bed', despite your best efforts to prove otherwise.", 
                 "There's casual, and then there's 'gave up on life'. You're dancing on that line."],
      "trendy": ["Trendy today, tragic tomorrow. Choose wisely.", 
                 "Following trends is like following a GPS into a lake. Just because everyone's doing it doesn't make it right."]
    };
    
    // Generic criticisms for when no keywords match
    const genericCriticisms = [
      "I've seen better outfits on mannequins that fell over in a department store.",
      "This outfit is screaming for help, and I'm here to answer the call: change everything.",
      "Bold choice going for the 'I dressed in the dark' aesthetic.",
      "Your outfit has potential... to be used as a cautionary tale in fashion schools.",
      "I appreciate your confidence in wearing that in public.",
      "This ensemble suggests you have a complex relationship with mirrors.",
      "Your outfit is like a modern art piece - confusing, yet somehow still expensive.",
      "I'm not saying it's bad, but fashion police are currently setting up a perimeter.",
      "This look is perfect for when you want people to remember you, but not for the right reasons.",
      "Your outfit is making a statement. Unfortunately, that statement is 'help'."
    ];
    
    // Check for occasions
    const occasions = {
      "wedding": "For a wedding? Unless you're the bride wearing white or showing up in pajamas, you've probably cleared the very low bar of wedding guest attire.",
      "interview": "For an interview? Nothing says 'hire me' like an outfit that's simultaneously trying too hard and not trying enough.",
      "date": "For a date? Well, at least you'll know they're interested in your personality.",
      "work": "For work? This outfit screams 'I'm ready to be overlooked for that promotion'.",
      "party": "For a party? This outfit says 'I want attention' but also 'not the good kind'.",
      "gym": "For the gym? You look like you're more prepared for a fashion emergency than a workout."
    };
    
    let criticism = "";
    
    // Check for occasion-specific criticism
    for (const [occasion, response] of Object.entries(occasions)) {
      if (outfitDescription.includes(occasion)) {
        criticism = response;
        break;
      }
    }
    
    // If no occasion found, check for keyword-specific criticisms
    if (!criticism) {
      const matchedKeywords = Object.keys(fashionKeywords).filter(keyword => 
        outfitDescription.includes(keyword)
      );
      
      if (matchedKeywords.length > 0) {
        // Pick a random keyword from those that matched
        const randomKeyword = matchedKeywords[Math.floor(Math.random() * matchedKeywords.length)];
        // Pick a random criticism for that keyword
        const keywordCriticisms = fashionKeywords[randomKeyword];
        criticism = keywordCriticisms[Math.floor(Math.random() * keywordCriticisms.length)];
      } else {
        // If no keywords match, use a generic criticism
        criticism = genericCriticisms[Math.floor(Math.random() * genericCriticisms.length)];
      }
    }
    
    // Add a sassy closing line
    const closingLines = [
      "But what do I know? I'm just an algorithm with impeccable taste.",
      "Don't take it personally, I criticize everyone equally harshly.",
      "Maybe fashion just isn't your thing. Have you tried paper bags?",
      "On the bright side, confidence can make any outfit work. You'll need a lot of it.",
      "Remember: fashion rules are made to be broken, but not shattered like you've done."
    ];
    
    return criticism + "\n\n" + closingLines[Math.floor(Math.random() * closingLines.length)];
  }