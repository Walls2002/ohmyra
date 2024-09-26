const waitingMessages = [
  "Searching for a partner... Please wait.",
  "Connecting you with someone special... Hang tight!",
  "Finding a match... This may take a moment.",
  "Please hold on while we connect you to another user.",
  "Looking for a chat partner... Thank you for your patience!",
  "We’re finding the perfect match for you. Please wait...",
  "Pairing you up with another user. This won't take long!",
  "Hold on! We're searching for someone to chat with you.",
  "Just a moment... We're connecting you with a new friend!",
  "Please wait while we find a user to connect with you.",
];
export function waitMessage() {
  const randomMessage = Math.floor(Math.random() * waitingMessages.length);
  return waitingMessages[randomMessage];
}
