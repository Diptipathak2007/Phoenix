import model from "../lib/googleAi";

const getConversationTitle = async (userPrompt) => {
    try {
        const result=await model.generateContent(
            `Given a user prompt, generate a concise and relevant title for a conversation. The title should be engaging and reflect the main theme of the conversation. The title should be no more than 10 words long. 
            Prompt: ${userPrompt}`,
            
        )
        return result.response.text();
    } catch (err) {
        console.error("Error in generating title:", err);
    }
}

const getAiResponse = async (userPrompt,chats=[]) => {
  const history=[]
  chats.forEach(({user_prompt,ai_response})=>{
    history.push(
      {
        role:'user',
        parts:[{text:user_prompt}]
      },
      {
        role:'model',
        parts:[{text:ai_response}]
      }
    )
  })
  try {
    model.generationConfig={temperature:1.5}
    const chat=model.startChat({history});
    const result=await chat.sendMessage(userPrompt);

    return result.response.text()
  } catch (err) {
    console.error("Error in generating AI response:", err.message);
  }
}
export {getConversationTitle,getAiResponse}