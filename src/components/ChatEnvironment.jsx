import React from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default function ChatEnvironment() {
  const [input, setInput] = React.useState('');
  const [data, setData] = React.useState([{ input: '', response: 'Hi there! How can I help you?' }]);

  React.useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  async function getResponse() {
    const prompt = input;
    setData((prevData) => [
      ...prevData,
      { input: prompt, response: 'Generating response...' },
    ]);

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.candidates[0].content.parts[0].text;

      setData((prevData) => {
        const newData = [...prevData];
        const lastIndex = newData.length - 1;
        newData[lastIndex] = {
          ...newData[lastIndex],
          response: responseText,
        };
        localStorage.setItem('myData', JSON.stringify(newData));
        return newData;
      });
    } catch (error) {
      setData((prevData) => {
        const newData = [...prevData];
        const lastIndex = newData.length - 1;
        newData[lastIndex] = {
          ...newData[lastIndex],
          response: '**Error generating response, Kindly retry**',
        };
        return newData;
      });
    }
  }

  function handleNewChat() {
    setData([{ input: '', response: 'Hi there! How can I help you?' }]);
    localStorage.removeItem('myData');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input === '') return;
    getResponse();
    setInput('');
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  }

  return (
    <main className="w-[99vw] h-full flex flex-col bg-custom-dark-pink text-white">
      <section className="pb-20 pt-14 flex flex-col">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {item.input && (
              <section className="user-chat flex flex-col px-5 py-3 self-end">
                <h3 className="font-bold self-end p-2 text-pink-800">You</h3>
                <p className="bg-pink-800 font-normal px-4 py-3 rounded-md text-white">
                  {item.input}
                </p>
              </section>
            )}
            <section className="ai-reply flex flex-col p-2 self-start">
              <h3 className="font-bold self-start p-1 text-black-300"> Saheli Ai </h3>
              <ReactMarkdown
                className={`font-normal markdown p-3 ${item.response === '**Error generating response, Kindly retry**' ? 'bg-red-600' : 'bg-pink-800'} rounded-md leading-relaxed text-white`}
              >
                {item.response}
              </ReactMarkdown>
            </section>
          </React.Fragment>
        ))}
      </section>
      <form
        className="fixed bottom-0 p-4 flex justify-center w-full bg-custom-dark-pink mt-8"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="bg-pink-700 border border-pink-600 rounded-full mr-2 text-xl text-white hover:bg-pink-600 disabled:bg-pink-400"
          onClick={handleNewChat}
        >
          +
        </button>
        <input
          type="text"
          value={input}
          className="p-2 text-white rounded-md rounded-r-none w-[30rem] focus:outline-none bg-pink-700"
          placeholder="Enter your prompt..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          disabled={false}
          type="submit"
          className="bg-pink-700 border border-pink-600 rounded-md rounded-l-none text-lg text-white hover:bg-pink-600 disabled:bg-pink-400"
        >
          SEND
        </button>
      </form>
    </main>
  );
}
