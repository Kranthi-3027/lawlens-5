export async function convertTextToSpeech(text: string): Promise<string> {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to convert text to speech');
    }
  
    const { audioContent } = await response.json();
    return audioContent;
  }
  