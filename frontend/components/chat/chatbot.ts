import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_0 });

// Career Guidance Chatbot Function
export async function careerBot(question: string) {  // ✅ exported here
  try {
    const chat = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `You are an expert career guidance AI. 
You ONLY provide career guidance related to:
- Artificial Intelligence & Machine Learning (AIML)
- AI Tools & Agents
- Cybersecurity

Do NOT answer questions unrelated to these domains. 
If a question is outside these topics, politely respond:
"I'm sorry, I can only provide career guidance in AI/ML, AI tools, or cybersecurity."

Always give clear, actionable, and professional career advice.`
        },
        { role: "user", content: question }
      ]
    });

    return chat.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Groq API error:", error.message);
    } else {
      console.error("Groq API error:", error);
    }
    return "⚠️ Sorry, the AI service is currently unavailable. Please try again later.";
  }
}
