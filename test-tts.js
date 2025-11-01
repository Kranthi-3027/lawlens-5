import dotenv from 'dotenv';
dotenv.config();

async function testTTS() {
  const text = "Hello, world!";
  try {
    const response = await fetch("http://localhost:5173/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      console.error("TTS API call failed with status:", response.status);
      const errorBody = await response.text();
      console.error("Error details:", errorBody);
      return;
    }

    const { audioContent } = await response.json();

    if (audioContent) {
      console.log("TTS API call successful. Received audio content.");
    } else {
      console.error("TTS API call failed. No audio content received.");
    }
  } catch (error) {
    console.error('An error occurred during the TTS test:', error);
  }
}

testTTS();
