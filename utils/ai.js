import fetch from "node-fetch";

export async function askAI(question) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API Key missing in .env file");
  }

  const modelsRes = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
  );

  const modelsData = await modelsRes.json();

  if (modelsData.error) {
    throw new Error("API Key invalid or access denied");
  }

  const modelObj = modelsData.models.find((m) =>
    m.supportedGenerationMethods?.includes("generateContent")
  );

  if (!modelObj) {
    throw new Error("No Gemini model available for generateContent");
  }

  const MODEL = modelObj.name;

  const url = `https://generativelanguage.googleapis.com/v1/${MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: question }] }]
    })
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!data.candidates || data.candidates.length === 0) {
    return "AI response unavailable";
  }

  let text = data.candidates[0].content.parts[0].text.trim();

  text = text.replace(/\*\*/g, "");

  let words = text.split(/\s+/);

  let answer = words[words.length - 1];

  answer = answer.replace(/[.,!?]/g, "");

  return answer;
}
