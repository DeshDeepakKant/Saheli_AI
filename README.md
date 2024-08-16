# Chat with Saheli AI


## Overview

This project is a chat application that integrates Google's Generative AI, specifically the Gemini-1.5-flash model, to provide users with an interactive chat experience. Users can input their questions or messages, and the AI model generates responses, simulating a conversation with an AI entity.

## Features

- **Interactive Chat Interface**: A user-friendly interface where users can send messages and receive responses from the AI.
- **Integration with Google Generative AI**: Utilizes the Google Generative AI's Gemini-1.5-flash model for generating conversational responses.
- **Real-time Response Generation**: The AI generates responses in real-time, providing an engaging user experience.
- **State Management**: Uses React's state management to handle user inputs and AI responses, ensuring a smooth and dynamic chat flow.

## Technologies Used

- **React**: For building the user interface.
- **Google Generative AI SDK**: To integrate the Gemini-1.5-flash model for generating AI responses.
- **React Markdown**: To render the AI's responses, allowing for rich text formatting if needed.

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourgithubusername/chat-with-gemini-ai.git
   cd chat-with-gemini-ai
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Set Up Environment Variables**
   Create a .env file in the root directory and add your [Google Generative AI API key](https://ai.google.dev/gemini-api/docs/api-key):
   ```env
   VITE_API_KEY=<YOUR_API_KEY>
   ```
5. **Start the Development Server**
   ```node
   npm run dev
   ```
   The application will be available at [localhost](https://localhost:5173).

## Usage

Simply type your message in the input box and press enter or click the send button. The AI will process your input and generate a response, which will appear in the chat window.

## Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, please open an **issue** or submit a **pull request**.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
