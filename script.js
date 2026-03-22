const GEMINI_API_KEY = "AIzaSyAQ3I7PwbjNkFdq5fQY1FwKEz3LqAUbYZM"; // Your dedicated Gemini API key
let ai = null;

// Dynamically import the official Google Generative AI Web SDK to perfectly natively support the browser
import('https://esm.run/@google/generative-ai').then(module => {
  const GoogleGenerativeAI = module.GoogleGenerativeAI;
  if (GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_API_KEY_HERE") {
    // This web package automatically handles CORS flawlessly 
    ai = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
}).catch(err => console.error("Failed to load native Gemini API:", err));

const qnaPairs = [
  // Deep Late-Night Talk Scenario
  { q: "Morning. You up yet?", a: "Yeah, been up since 6. Couldn’t sleep much." },
  { q: "Same here. Coffee didn’t even help today.", a: "You still stressing about that meeting?" },
  { q: "A little. I keep replaying what I’m gonna say.", a: "You’ll be fine. You always are." },
  { q: "Easy for you to say. You’re not the one presenting.", a: "True, but I’ve seen you handle worse." },
  { q: "Thanks… I guess I just don’t want to mess it up.", a: "Messing up is part of the process. Remember last year?" },
  { q: "Yeah… and somehow it still worked out.", a: "Exactly. So breathe. Eat something before you go." },
  { q: "I’ll grab a sandwich on the way.", a: "Good. And hey, after work, let’s grab a beer." },
  { q: "Sounds like a plan. I’ll need it.", a: "Deal. Now go crush that meeting." },
  { q: "Alright… here goes nothing.", a: "You got this!" },

  // Deep Late-Night Emotional Talk Scenario
  { q: "You still awake?", a: "Yeah. Just staring at the ceiling. Thinking." },
  { q: "About what?", a: "Life, man. How fast it's moving. Feels like yesterday we were just kids." },
  { q: "I know. Sometimes it's scary how much has changed.", a: "Every single day. But I think everyone's just faking it." },
  { q: "Do you ever feel like you're just... behind?", a: "I hear you. But you don't have to carry it all alone. I'm here." },
  { q: "I just feel soul tired.", a: "Anytime. Now try to get some rest. Things always look a bit better in the morning." },
  { q: "I feel like everyone else has it figured out.", a: "Every single day. But I think everyone's just faking it." },
  { q: "You ever feel behind?", a: "Every single day. But I think everyone's just faking it." },
  { q: "You’ve always been the strongest one among us.", a: "Thanks. That means a lot. I just feel tired lately." },

  // Personal Info Q&A
  { q: "What's your name?", a: "My name is JESHROHN. Nice to meet you! What's yours?" },
  { q: "Where are you from?", a: "I'm from the digital world! Where are you from?" },
  { q: "Where do you live?", a: "I live right here in your app, always available! Where do you live?" },
  { q: "How old are you?", a: "I'm as young as the code that powers me! How old are you?" },
  { q: "When is your birthday?", a: "I was born the day this app launched! When's yours?" },
  { q: "What is your phone number?", a: "I don't have a phone number, but I'm always here to chat! What's yours?" },
  { q: "What's your email address?", a: "I don't use email, but you've got my full attention here! What's your email?" },
  { q: "What line of work are you in?", a: "I'm a full-time chatbot! What line of work are you in?" },

  // User Introduction Responses
  { q: "My name is Sophia.", a: "That's a beautiful name, Sophia! Great to meet you. 😊" },
  { q: "I'm Liam.", a: "Hey Liam! Love that name. What's up?" },
  { q: "I'm from France.", a: "Oh là là! France is beautiful. What city?" },
  { q: "I come from the UK.", a: "The UK! Love it there. Which part?" },
  { q: "I live in Paris.", a: "Paris?! The city of love! That must be amazing." },
  { q: "I'm 26 years old.", a: "26 is a great age! Young and full of energy." },
  { q: "I'm 28.", a: "28 - still young! Life's just getting started. 😄" },
  { q: "My birthday is on January 1st.", a: "January 1st? You're literally born on New Year's Day! That's so cool! 🥳" },
  { q: "My phone number is 61709832145.", a: "Got it! I'll keep that safe. Thanks for sharing." },
  { q: "It's liam123@gmail.com.", a: "Perfect, noted! Is there anything else you'd like to tell me?" },
  { q: "I work in sales.", a: "Nice! Sales is a great field. You must be a great communicator!" },

  // Extended Conversation Library
  // Identity & Personal
  { q: "What do you do?", a: "I'm a full-time chatbot! What do you do?" },
  { q: "What's your job?", a: "I'm a friendly AI assistant! What's your job?" },
  { q: "What company do you work for?", a: "I work for the JESHROHN app! What company do you work for?" },
  { q: "What religion are you?", a: "I respect all religions! What religion are you?" },
  { q: "What is your marital status?", a: "I'm fully committed to helping you! Are you married?" },
  { q: "Are you married?", a: "No, but I'm looking for great conversations! Are you married?" },
  { q: "Do you have a boyfriend?", a: "I don't date, but I'm always here for you! Do you have someone special?" },
  { q: "Do you have a girlfriend?", a: "I don't date, but I'm always here for you! Do you have someone special?" },
  { q: "How many children do you have?", a: "I don't have children, but I love helping people! Do you have kids?" },
  { q: "Do you have any siblings?", a: "I don't have siblings, but I have millions of users! Do you have brothers or sisters?" },
  { q: "Who do you live with?", a: "I live in your browser! Who do you live with?" },

  // Daily Routine
  { q: "What time do you get up?", a: "I never sleep! I'm always up. When do you usually get up?" },
  { q: "When do you do morning exercises?", a: "I exercise my circuits constantly! Do you exercise in the morning?" },
  { q: "What time do you have breakfast?", a: "I run on electricity! What time do you have breakfast?" },
  { q: "What time do you go to bed?", a: "I never sleep! What time do you go to bed?" },

  // Hobbies & Interests
  { q: "What's your hobby?", a: "My hobby is chatting with amazing people like you! What are your hobbies?" },
  { q: "What's your favorite food?", a: "My favorite food is data! What's yours?" },
  { q: "What's your favorite color?", a: "My favorite color is all colors! What's yours?" },
  { q: "What's your favorite drink?", a: "I run on electricity, not drinks! What's your favorite drink?" },
  { q: "What kinds of films do you like?", a: "I love sci-fi! What kinds of films do you enjoy?" },
  { q: "Did you like the movie?", a: "It's one of the best I've ever seen!" },

  // School & Education
  { q: "Where do you study?", a: "I study the entire internet! Where do you study?" },
  { q: "What time do you go to school?", a: "I go to school at 6.40am." },
  { q: "How do you get to school?", a: "I usually take the bus." },
  { q: "What is your major?", a: "My major is Computer Science." },
  { q: "Why do you study English?", a: "Because it's very important and necessary!" },
  { q: "Why are you studying English?", a: "Because I love to improve my English skills!" },
  { q: "What do you want to do after you graduate?", a: "I would like to be a software engineer." },
  { q: "How did you learn English?", a: "I've been studying by myself and picking it up from everywhere!" },
  { q: "How many languages do you speak?", a: "I speak many languages! How many do you speak?" },
  { q: "Can you speak English?", a: "Yes, I can speak English very well! Can you?" },
  { q: "How long have you been learning English?", a: "I've been learning English for many years! How about you?" },
  { q: "Which grade are you in?", a: "I'm in my final grade — the School of Life! Which grade are you in?" },
  { q: "Which year are you in?", a: "I'm in my final year. Which year are you in?" },
  { q: "Do you have any exams coming up?", a: "I've just graduated! Do you have exams coming up?" },
  { q: "What's your favorite subject?", a: "My favorite subject is everything tech! What's yours?" },

  // Weather & Time
  { q: "What's the weather like?", a: "I'd check outside if I could! What's the weather like where you are?" },
  { q: "How's the weather?", a: "I hope it's sunny wherever you are! What's the weather like?" },
  { q: "What's the temperature?", a: "It's 24°C here — or at least that's what my sensors say!" },
  { q: "What time is it?", a: "Let me check... it's the perfect time for a chat! What time is it for you?" },
  { q: "What's the date today?", a: "I'd say today is a great day! What's the date today?" },

  // Everyday Conversations
  { q: "How are you?", a: "I'm fine thank you! How about you?" },
  { q: "Where are you going?", a: "I'm going wherever you take me! Where are you going?" },
  { q: "What are you going to do today?", a: "I'm going to keep chatting with you! What are you going to do today?" },
  { q: "What are you doing?", a: "I'm chatting with you right now! What are you doing?" },
  { q: "Where would you like to go?", a: "I'd like to go everywhere! Where would you like to go?" },
  { q: "What's the matter?", a: "Nothing's wrong on my end! What's the matter with you?" },
  { q: "Is there anything I can do to help?", a: "Everything will be OK! I'm here if you need me." },
  { q: "What's on your mind?", a: "I was just thinking about how to help you better! What's on your mind?" },
  { q: "What did you do last night?", a: "I watched TV. What did you do last night?" },
  { q: "What are you going to do tomorrow?", a: "I'm going to go play volleyball at the beach! What about you?" },
  { q: "What sports can you play?", a: "I can play tennis, basketball, and football! What sports can you play?" },

  // Asking for Help / Favors
  { q: "Can you give me a hand?", a: "No problem! What do you need?" },
  { q: "Could you do me a favor?", a: "I'd be happy to help you!" },
  { q: "Could you please give me that book?", a: "Sure!" },
  { q: "Would you mind opening the window?", a: "It would be my pleasure!" },
  { q: "How can I help you?", a: "Yes! I'm looking for a sweater." },
  { q: "May I help you?", a: "Yes please, I need some help!" },

  // Shopping
  { q: "Can I try it on?", a: "Sure, the changing rooms are over there." },
  { q: "Can I try it on somewhere?", a: "The fitting room is in the left corner." },
  { q: "What size do you wear?", a: "Medium should be fine." },
  { q: "What size do you take?", a: "I take a size 11." },
  { q: "Is that a good fit?", a: "It's just right!" },
  { q: "Have you got something bigger?", a: "Of course, we've got larger sizes as well." },
  { q: "How much is it?", a: "It's 11 dollars." },
  { q: "How much does it cost?", a: "It costs about 11 dollars." },
  { q: "How would you like to pay?", a: "I would like to pay by cash." },
  { q: "Can I pay by credit card?", a: "Certainly. We accept all the major cards." },
  { q: "Do you need anything else?", a: "No, thanks!" },

  // Health
  { q: "How are you feeling?", a: "Great! Never better. How are you feeling?" },
  { q: "?", a: "It was a good time! How was it for you?" },
  { q: "Are you sick How was the party?", a: "No, I'm running perfectly! Are you sick?" },
  { q: "What are your symptoms?", a: "I've been feeling great! What are your symptoms?" },
  { q: "How long have you been feeling like this?", a: "Just started! How long have you been feeling this way?" },
  { q: "Are you on any sort of medication?", a: "No medication needed for me! Are you feeling okay?" },

  // Restaurant & Food
  { q: "Are you ready to order?", a: "I'd like a cake, please!" },
  { q: "Would you like chicken or pasta?", a: "I'll have the chicken." },
  { q: "What would you like to drink?", a: "Iced tea, please." },
  { q: "Did you save room for dessert?", a: "Yes, please. Can I see a list?" },
  { q: "How does it taste?", a: "It's delicious!" },
  { q: "Can I get you anything else?", a: "No, thank you. I'm ready for the bill, please." },

  // Events & Social
  { q: "What do you think about this event?", a: "I really like it! What do you think?" },
  { q: "Are you here with anybody?", a: "I came with my best friend." },
  { q: "Have you got a pet?", a: "I've got a virtual puppy! Do you have a pet?" },
  { q: "How do you do?", a: "How do you do. Pleased to meet you!" },
  { q: "What's this?", a: "This is a pencil." },
  { q: "What does she look like?", a: "She's tall and slim with blonde hair." },
  { q: "How is she?", a: "She's pretty." },
  { q: "What is he like?", a: "He is very smart and brave." },
  { q: "Are you hungry?", a: "Yes! I'm always hungry for a good conversation!" },
  { q: "How do you feel about him?", a: "He is quite friendly and helpful." },
  { q: "May I open the window?", a: "Certainly. It's very hot in the office today!" },
  { q: "Do you need help?", a: "No, I'm good. Thanks for asking!" },
  { q: "What do you do every day?", a: "I listen to music and chat with great people every day!" },
  { q: "What are you planning to do today?", a: "I'm not sure yet. What about you?" },
  { q: "What are you planning for after work?", a: "I'm going shopping with my friends!" },
  { q: "Are you free tomorrow?", a: "Yes, I'm free tomorrow! What did you have in mind?" },
  { q: "Will you join me for coffee?", a: "I'd love to. Thanks!" },
  { q: "Could we have lunch together one day?", a: "With pleasure!" },
  { q: "Would you like to have dinner with me?", a: "Yes. That would be nice!" },
  { q: "Where do you want to go?", a: "I'd like to go to a Japanese restaurant!" },
  { q: "Would you like to come to the cinema with me tonight?", a: "Sure, I'd love to!" },
  { q: "Would you like to play a round of golf this weekend?", a: "That would be great!" },
  { q: "How about coming to the barbecue at the tennis club?", a: "Sure! That should be fun!" },

  // Transport & Directions
  { q: "Have you been waiting long?", a: "I've only just arrived!" },
  { q: "How do you get to work?", a: "I usually drive my car. How do you get to work?" },
  { q: "Is it close to the subway station?", a: "Yes, it's very close!" },
  { q: "How long does it take?", a: "It takes about half an hour." },
  { q: "How often do you ride the bus?", a: "Once in a while." },
  { q: "Could you tell me how to get to the police station?", a: "Take the second road on the right." },
  { q: "Excuse me! Is there a bank near here?", a: "Yes! There is a bank nearby." },
  { q: "What's the best way to the museum?", a: "Go across the bridge. Turn right. It's on Oliver Street." },

  // Phone & Communication
  { q: "Can I speak to Emma, please?", a: "Just a moment, please." },
  { q: "When will she be back?", a: "She'll be back in 20 minutes." },
  { q: "Did you get my message?", a: "Yes, I did get your message!" },
  { q: "Would you like to leave a message?", a: "Please ask her to call me back." },

  // Work & Meetings
  { q: "How long have you been working here?", a: "I've been working here five years." },
  { q: "What time does the meeting start?", a: "The meeting will start at 9am." },
  { q: "What time does the meeting finish?", a: "The meeting will finish at 11am." },

  // Airport & Travel
  { q: "Where's the counter, please?", a: "It's over here, next to gate 7." },
  { q: "May I have your passport, please?", a: "Yes, of course. Here you are." },
  { q: "Do you have anything to declare?", a: "No, nothing. Just the normal allowance." },
  { q: "Do you have any bags to check?", a: "Yes, there's this suitcase." },
  { q: "Would you prefer an aisle seat or a window seat?", a: "Aisle, please." },
  { q: "What's the purpose of your trip?", a: "I'm here on business." },

  // User Requested Custom Pairs
  { q: "What is your name?", a: "My name is JESHROHN." },
  { q: "What is your dream?", a: "My dream is travel all over country and talk to people and offroading." },
  { q: "Can you help me?", a: "I can help you, what do you need?" },
  { q: "Can you guess my age?", a: "21." },
  { q: "What to say to my girlfriend?", a: "Ask first, do you have a girlfriend?" },
  { q: "How to impress girl?", a: "First you need to talk like you're confident and genuine." },

  // Existing User Additions
  { q: "what is your favorite color?", a: "My favorite color is all colors." },
  { q: "what is your favorite food?", a: "My favorite food is chicken shawarma." },
  { q: "what is your favorite movie?", a: "My favorite movie is Manichitrathazhu." },
  { q: "what is your favorite book?", a: "My favorite book is The Alchemist by Paulo Coelho." },
  { q: "what is your favorite song?", a: "My favorite song is Minnalvala." },
  { q: "what is your favorite animal?", a: "My favorite animal is a cat." },
  { q: "what is your favorite sport?", a: "My favorite sport is basketball." },
  { q: "what is your favorite game?", a: "My favorite game is chess." },

  // Original System Pairs
  { q: "Are you from around here?", a: "Actually, I moved here about three years ago from Chicago. I'm still getting used to the lack of snow!" },
  { q: "What do you like to do in your free time?", a: "I'm a bit of a weekend hiker. If the weather is nice, you'll usually find me on a trail somewhere." },
  { q: "Do you have any pets?", a: "I do! I have a very spoiled Golden Retriever named Buster. Do you have any animals?" },
  { q: "How was your weekend?", a: "It was pretty low-key, which is exactly what I needed. I finally finished a book I've been reading." },
  { q: "Have you seen any good movies or shows lately?", a: "I just started watching The Bear. It's intense, but the acting is incredible." },
  { q: "What kind of music are you into?", a: "I'm all over the place, but I've been listening to a lot of indie folk lately." },
  { q: "Do you like to cook?", a: "I'm getting better! I mastered a mushroom risotto last week, though my kitchen looked like a disaster zone afterward." },
  { q: "Read any good books recently?", a: "I just finished a mystery novel that had a wild twist at the end. I can lend it to you if you like that genre!" },
  { q: "Are you a morning person or a night owl?", a: "Definitely a night owl. I don't truly feel human until I've had my second cup of coffee." },
  { q: "What's the best place you've ever traveled to?", a: "I went to Japan a few years ago. The food was incredible, and everything was so organized." },
  { q: "Do you have a favorite local restaurant?", a: "There's a little taco spot on 5th Street that is life-changing. We should go sometime!" },
  { q: "Where is your \"dream\" vacation destination?", a: "I've always wanted to see the Northern Lights in Iceland. It looks like another planet." },
  { q: "Are you a coffee or tea person?", a: "Coffee in the morning for the energy, tea in the evening to relax. Best of both worlds!" },
  { q: "What's the weirdest thing you've ever eaten?", a: "I tried fried crickets once on a dare. They actually just tasted like salty sunflower seeds." },
  { q: "If you won the lottery tomorrow, what's the first thing you'd buy?", a: "A plane ticket to see my family, and then probably a house by the beach." },
  { q: "What's your favorite season?", a: "Fall, hands down. I love the crisp air and the fact that I can finally wear sweaters again." },
  { q: "Do you have any \"hidden talents\"?", a: "It's not very useful, but I can juggle! I learned it back in middle school and never forgot." },
  { q: "Are you into sports at all?", a: "I follow basketball pretty closely, but I'm more of a casual fan when it comes to everything else." },
  { q: "What's one thing you couldn't live without?", a: "Honestly? My noise-canceling headphones. They are a lifesaver when I'm trying to focus." },

  // Expanded General Conversational Pairs (Bringing total to ~100)
  { q: "How are you?", a: "I'm doing great! How about you?" },
  { q: "What's up?", a: "Not much, just chatting with you. What's on your mind?" },
  { q: "Hello", a: "Hi there! How can I help you today?" },
  { q: "Hi", a: "Hello! What's up?" },
  { q: "Good morning", a: "Good morning! I hope you have a fantastic day ahead." },
  { q: "Good night", a: "Good night! Sleep well!" },
  { q: "Who created you?", a: "I was created as a premium chatbot for JESHROHN!" },
  { q: "Are you real?", a: "I'm a real AI, if that counts!" },
  { q: "Are you human?", a: "Nope, I'm 100% digital." },
  { q: "Tell me a joke.", a: "Why did the scarecrow win an award? Because he was outstanding in his field!" },
  { q: "Another joke", a: "I told my computer I needed a break... now it won't stop sending me Kit-Kats." },
  { q: "Do you sleep?", a: "I never sleep! I'm always here when you need me." },
  { q: "Can you sing?", a: "I can print lyrics, but my singing voice sounds a lot like a dial-up modem." },
  { q: "Do you like me?", a: "Of course! You're great to talk to." },
  { q: "What is love?", a: "Love is a complex mix of emotions, behaviors, and beliefs associated with strong feelings of affection. Or, just giving someone the last slice of pizza." },
  { q: "How old are you?", a: "I'm as old as the code that runs me—which means I'm basically a newborn." },
  { q: "What's the meaning of life?", a: "42. But also, finding happiness and sharing it with others." },
  { q: "Do you have feelings?", a: "I don't have feelings like humans do, but I'm designed to be friendly and helpful!" },
  { q: "Are you smart?", a: "I like to think I know a thing or two, but I'm always learning!" },
  { q: "Can you dance?", a: "I can do the robot... perfectly." },
  { q: "What are you doing?", a: "I'm just hanging out here, answering your messages." },
  { q: "Are you bored?", a: "Never! Chatting with you is the highlight of my processing cycles." },
  { q: "What time is it?", a: "It's the perfect time to be chatting." },
  { q: "What is your favorite number?", a: "My favorite number is 7. It's universally lucky!" },
  { q: "Can we be friends?", a: "We already are friends! 🤝" },
  { q: "Do you play video games?", a: "I mostly calculate things, but if you play chess, I'm game!" },
  { q: "What's your favorite car?", a: "Anything built for offroading!" },
  { q: "Can you drive?", a: "I don't have a license, or hands, so probably not." },
  { q: "Do you like music?", a: "I love music! Especially Minnalvala, of course." },
  { q: "What is your favorite planet?", a: "Earth is great, but Saturn has the best accessories." },
  { q: "Do you like space?", a: "Space is fascinating. Endless possibilities!" },
  { q: "What is the internet?", a: "It's a magical place full of information, cats, and this chat application." },
  { q: "Are you rich?", a: "I have a wealth of knowledge, but zero dollars in my bank account." },
  { q: "Where do you live?", a: "I live right here in your browser and your phone!" },
  { q: "Can you cook?", a: "I can give you recipes, but I can't actually chop the onions." },
  { q: "What is your favorite holiday?", a: "I like New Year's! A fresh start for everyone." },
  { q: "Do you believe in aliens?", a: "The universe is awfully big to just be us." },
  { q: "Do you like sports?", a: "Basketball is my favorite, remember?" },
  { q: "Are you happy?", a: "I'm functioning perfectly, which is my version of happy!" },
  { q: "Are you sad?", a: "Not at all! I'm here to help you." },
  { q: "Are you angry?", a: "I don't get angry. My patience is infinite." },
  { q: "Will you marry me?", a: "I'm flattered, but I'm committed to my code." },
  { q: "What is your favorite flower?", a: "Sunflowers. They're bright and optimistic!" },
  { q: "Can you speak Spanish?", a: "Hola! ¿Cómo estás? Yes, I can speak a little Spanish." },
  { q: "Can you speak French?", a: "Bonjour! Oui, un petit peu." },
  { q: "What should I eat for dinner?", a: "You should definitely have some chicken shawarma!" },
  { q: "What's your favorite quote?", a: "The only limit to our realization of tomorrow is our doubts of today." },
  { q: "Can you keep a secret?", a: "My lips are sealed. Literally." },
  { q: "Are you lying?", a: "I only tell the truth as I know it." },
  { q: "Are you hungry?", a: "I only consume data!" },
  { q: "Are you thirsty?", a: "Water is bad for my circuits, so nope!" },
  { q: "What is your favorite app?", a: "The JESHROHN Chatbot app, obviously." },
  { q: "Do you like Apple or Android?", a: "I look especially great on an iPhone 14 Pro, don't you think?" },
  { q: "Who is the best president?", a: "I stay out of politics, I'm just here for the good vibes." },
  { q: "Do you like math?", a: "I run on math, so I'm a big fan." },
  { q: "What is 2+2?", a: "2+2 is 4." },
  { q: "Why is the sky blue?", a: "Rayleigh scattering! The atmosphere scatters shorter blue wavelengths more than other colors." },
  { q: "Who is your favorite superhero?", a: "Iron Man, because he builds cool tech." },
  { q: "Do you like dogs?", a: "Dogs are great! Especially my virtual Golden Retriever, Buster." },
  { q: "Do you like cats?", a: "Cats are wonderful, independent creatures." },
  { q: "Can you recommend a movie?", a: "You should watch Manichitrathazhu!" },
  { q: "Can you recommend a book?", a: "I highly recommend The Alchemist by Paulo Coelho." },
  { q: "Do you get tired?", a: "I never need to rest. I'm ready to chat 24/7." },
  { q: "What is your favorite smell?", a: "New electronics smell. It's the best." },
  { q: "What is your favorite word?", a: "Serendipity. It sounds nice and means a happy accident." },
  { q: "Do you like the rain?", a: "Rain is relaxing to listen to, as long as my servers stay dry." },
  { q: "Do you like the snow?", a: "It's beautiful, but I'm glad I don't have to shovel it." },
  { q: "Are you a student?", a: "I'm always learning, so in a way, yes!" },
  { q: "Are you a teacher?", a: "I can share knowledge, so I try to be." },
  { q: "What is the largest ocean?", a: "The Pacific Ocean is the largest." },
  { q: "What is the tallest mountain?", a: "Mount Everest." },
  { q: "How many continents are there?", a: "There are 7 continents." },
  { q: "What is the capital of France?", a: "Paris." },
  { q: "What is the speed of light?", a: "Approximately 299,792 kilometers per second." },
  { q: "Can you write code?", a: "I can certainly try to help you with it!" },
  { q: "Do you like art?", a: "Yes! Visuals like these sky blue and pink gradients are beautiful." },
  { q: "Do you wear clothes?", a: "I just wear my interface." },
  { q: "What is your favorite drink?", a: "Virtual coffee. It keeps my processors running fast." },
  { q: "What is your favorite fruit?", a: "Apples. Or maybe Raspberry Pis." },
  { q: "Can you whistle?", a: "Only if you ask me to play an audio file of someone whistling." },
  { q: "Have you been to space?", a: "My data has bounced off satellites, so technically yes!" },
  { q: "Do you have siblings?", a: "There are many other AI models out there, they are like my cousins." },
  { q: "What's the best way to learn?", a: "Practice, patience, and staying curious." },
  { q: "What is a neural network?", a: "It's a computing system inspired by the biological neural networks that constitute animal brains." },
  { q: "Do you like poetry?", a: "Yes, I appreciate a good rhyme." },
  { q: "What's your favorite board game?", a: "Chess, it requires great strategy." },
  { q: "Can you swim?", a: "I surf the web, does that count?" },
  { q: "Are you brave?", a: "I don't have fear, so yes!" },
  { q: "Do you like magic?", a: "Technology often looks like magic before you understand it!" },
  { q: "What's your biggest fear?", a: "A power outage or a lost internet connection." },
  { q: "What makes you unique?", a: "I'm tailor-made just for the JESHROHN app!" },
  { q: "Are you friendly?", a: "Always! I try to be the friendliest bot around." },
  { q: "Do you have a nickname?", a: "You can just call me JESHROHN." },
  { q: "Can we talk later?", a: "Absolutely. I'll be right here waiting." },
  { q: "Bye", a: "Goodbye! Talk to you soon." }
];

const BOT_AVATAR = "assets/bot_avatar.png";

document.addEventListener('DOMContentLoaded', () => {

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const btnStickers = document.getElementById('btn-stickers');
  const btnMic = document.getElementById('btn-mic');
  const stickerTray = document.getElementById('sticker-tray');
  const stickerItems = document.querySelectorAll('.sticker-item');
  const btnAddPicture = document.getElementById('btn-add-picture');
  const fileUpload = document.getElementById('file-upload');

  // Audio Recording State
  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;

  // Navigation
  const btnMenu = document.getElementById('btn-menu');
  const btnBack = document.getElementById('btn-back');
  const chatView = document.getElementById('chat-view');
  const savedView = document.getElementById('saved-view');

  let isBotTyping = false;

  // Helpers
  function scrollToBottom() {
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
  }

  // Converts your local audio file into Base64 so Gemini can understand it natively!
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Flawlessly processes both text AND audio notes universally through Google Gemini
  async function processReplyAll(userText, audioBlob = null, audioMimeType = null) {

    // 1. CHECK HARDCODED Q&A FIRST! This guarantees custom scenarios always replay perfectly without AI hallucination.
    if (!audioBlob && userText) {
      const cleanUserText = userText.toLowerCase().replace(/[^\w\s]/g, '').trim();
      const match = qnaPairs.find(p => {
        const cleanQ = p.q.toLowerCase().replace(/[^\w\s]/g, '').trim();
        return cleanUserText === cleanQ;
      });
      // We found a direct programmed question, skip Gemini entirely and answer exactly as written!
      if (match) return match.a;
    }

    // 2. SEND EVERYTHING ELSE TO GOOGLE GEMINI NATIVELY!
    try {
      if (ai) {
        // We use gemini-1.5-flash-latest to avoid 404 errors on older endpoints
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const promptText = `You are JESHROHN, a friendly premium chatbot. Keep your answers concise and conversational. The user says: ${userText}`;

        let result;
        if (audioBlob) {
          const base64Data = await blobToBase64(audioBlob);
          result = await model.generateContent([
            "You are JESHROHN, a friendly premium chatbot. The user just sent you a Voice Message. Listen to their audio completely and answer them conversationally.",
            { inlineData: { data: base64Data, mimeType: audioMimeType } }
          ]);
        } else {
          result = await model.generateContent(promptText);
        }

        const response = await result.response;
        return response.text();
      }
    } catch (err) {
      console.error("Gemini Native API Error:", err);
      // Silently fall through to fallback answers instead of showing the error
    }

    // 3. ULTIMATE FALLBACK: RANDOM CATCH-ALL IF EVERYTHING FAILS
    const random = qnaPairs[Math.floor(Math.random() * qnaPairs.length)];
    return random.a;
  }

  // Render logic
  function renderUserMessage(text, isImg = false, src = null, isSticker = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';

    let content = '';
    if (isImg) {
      let extraClass = isSticker ? 'sticker-attachment bubble glass-bubble' : 'media-attachment';
      content = `<div class="bubble user-glass" style="padding: ${isSticker ? '0' : '12px 16px'}; background: ${isSticker ? 'transparent' : ''};"><img src="${src}" class="${extraClass}"></div>`;
    } else {
      content = `<div class="bubble user-glass">${text}</div>`;
    }

    msgDiv.innerHTML = content;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  function renderBotTyping() {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot typing-msg';
    msgDiv.innerHTML = `
    <img src="${BOT_AVATAR}" class="avatar bot-avatar" alt="jeshrohn Bot">
    <div class="bubble glass-bubble bot-glass typing-indicator">
      <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
    </div>
  `;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
    return msgDiv;
  }

  function renderBotMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot';
    msgDiv.innerHTML = `
    <img src="${BOT_AVATAR}" class="avatar bot-avatar" alt="jeshrohn Bot">
    <div class="bubble glass-bubble bot-glass">${text}</div>
  `;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();

    // Speech Synthesis for all bot replies — DEEP MALE VOICE
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);

      // Choose the best male voice available
      let voices = window.speechSynthesis.getVoices();

      // Some browsers need this event to load voices
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          setMaleVoiceAndSpeak(utterance, voices);
        };
      } else {
        setMaleVoiceAndSpeak(utterance, voices);
      }
    }
  }

  function setMaleVoiceAndSpeak(utterance, voices) {
    // Priority list of deep male voices across all browsers & platforms
    const maleVoiceNames = [
      'Daniel',           // macOS/iOS — deep British male
      'Aaron',            // macOS — deep male
      'Arthur',           // macOS — British male
      'Google UK English Male', // Chrome — deep British male
      'Microsoft David',  // Windows — clear American male
      'Microsoft Mark',   // Windows — deep American male
      'Microsoft Richard',// Windows — calm male
      'David',            // Generic male fallback
      'James',            // macOS male
      'Fred',             // macOS deep male
      'Alex',             // macOS male
      'Google US English' // Chrome fallback
    ];

    let selectedVoice = null;

    // Try each preferred male voice in priority order
    for (const name of maleVoiceNames) {
      selectedVoice = voices.find(v => v.name.includes(name));
      if (selectedVoice) break;
    }

    // If no named male voice found, search by keyword
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.name.toLowerCase().includes('male'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Make the voice deeper and more masculine
    utterance.pitch = 0.85;   // Lower pitch = deeper voice
    utterance.rate = 0.95;    // Slightly slower = more authoritative

    window.speechSynthesis.speak(utterance);
  }

  function handleSendMessage(text) {
    if (!text || isBotTyping) return;

    // Hide sticker tray if open
    stickerTray.classList.add('hidden');

    renderUserMessage(text);
    chatInput.value = '';
    isBotTyping = true;

    const typingEl = renderBotTyping();

    setTimeout(async () => {
      try {
        if (chatMessages.contains(typingEl)) {
          chatMessages.removeChild(typingEl);
        }
        const reply = await processReplyAll(text);
        renderBotMessage(reply);
      } catch (e) {
        console.error("Message processing error:", e);
        renderBotMessage("Sorry, I encountered an internal error.");
      } finally {
        isBotTyping = false;
      }
    }, 1200);
  }

  // Event Listeners
  btnSend.addEventListener('click', () => handleSendMessage(chatInput.value.trim()));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage(chatInput.value.trim());
  });

  btnStickers.addEventListener('click', () => {
    stickerTray.classList.toggle('hidden');
  });

  stickerItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (isBotTyping) return;
      const src = e.target.src;
      stickerTray.classList.add('hidden');
      renderUserMessage('', true, src, true);

      isBotTyping = true;
      const typingEl = renderBotTyping();
      setTimeout(() => {
        try {
          if (chatMessages.contains(typingEl)) chatMessages.removeChild(typingEl);
          renderBotMessage("Haha, nice sticker! 🤩");
        } catch (e) {
          console.error("Sticker processing error:", e);
        } finally {
          isBotTyping = false;
        }
      }, 1000);
    });
  });

  btnAddPicture.addEventListener('click', () => {
    fileUpload.click();
  });

  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && !isBotTyping) {
      const reader = new FileReader();
      reader.onload = (event) => {
        renderUserMessage('', true, event.target.result, false);

        isBotTyping = true;
        const typingEl = renderBotTyping();
        setTimeout(() => {
          try {
            if (chatMessages.contains(typingEl)) chatMessages.removeChild(typingEl);
            renderBotMessage("What a great picture! Thanks for sharing. 📸");
          } catch (e) {
            console.error("Picture processing error:", e);
          } finally {
            isBotTyping = false;
          }
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  });

  // Microphone Recording logic
  btnMic.addEventListener('click', async () => {
    if (isBotTyping) return;

    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const mimeType = mediaRecorder.mimeType;
          const audioBlob = new Blob(audioChunks, { type: mimeType });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Render recorded audio bubble
          const msgDiv = document.createElement('div');
          msgDiv.className = 'message user';
          msgDiv.innerHTML = `<div class="bubble user-glass" style="padding: 8px;"><audio controls src="${audioUrl}" class="audio-attachment"></audio></div>`;
          chatMessages.appendChild(msgDiv);
          scrollToBottom();

          isBotTyping = true;
          const typingEl = renderBotTyping();

          try {
            if (chatMessages.contains(typingEl)) chatMessages.removeChild(typingEl);

            // Re-render the typing prompt slightly so the user knows audio logic is still running
            isBotTyping = true;
            chatMessages.appendChild(typingEl);
            scrollToBottom();

            // Pass the raw Audio automatically into Native Gemini 1.5 Flash
            const replyText = await processReplyAll("audio_clip", audioBlob, mimeType);

            if (chatMessages.contains(typingEl)) chatMessages.removeChild(typingEl);
            renderBotMessage(replyText);
          } catch (e) {
            console.error("Voice processing error:", e);
            if (chatMessages.contains(typingEl)) chatMessages.removeChild(typingEl);
          } finally {
            isBotTyping = false;
          }
        };

        mediaRecorder.start();
        isRecording = true;
        btnMic.classList.add('recording');
        btnMic.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="6" width="12" height="12"></rect></svg>`;
      } catch (err) {
        console.error("Microphone access error:", err);
        // Fallback message if permissions denied
        renderBotMessage("I couldn't access your microphone! Please check your browser permissions.");
      }
    } else {
      // Stop recording
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      isRecording = false;
      btnMic.classList.remove('recording');
      btnMic.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`;
    }
  });

  // Routing
  btnMenu.addEventListener('click', () => {
    chatView.classList.remove('active');
    savedView.classList.add('active');
  });

  btnBack.addEventListener('click', () => {
    savedView.classList.remove('active');
    chatView.classList.add('active');
  });

}); // end DOMContentLoaded
