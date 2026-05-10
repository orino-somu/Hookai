// /backend/src/services/gemini.service.ts
import { model } from '../config/gemini';

export const generateFullScript = async (params: any) => {
  const { topic, niche, platform, tone, scriptLength, psychTriggers, audienceAge, voiceProfile } = params;

  const prompt = `
    You are an expert content creator and scriptwriter for ${platform}.
    Topic: ${topic}
    Niche: ${niche}
    Tone: ${tone}
    Length: ${scriptLength}
    Audience: ${audienceAge}
    Psychological Triggers: ${psychTriggers.join(', ')}
    Voice Profile: ${JSON.stringify(voiceProfile)}

    Generate a complete viral script structure in JSON format.
    The response MUST be ONLY a valid JSON object with the following structure:
    {
      "hookVariations": ["hook1", "hook2", ..., "hook10"],
      "fullScript": {
        "intro": "string",
        "body": ["point1", "point2", ...],
        "conclusion": "string",
        "cta": "string"
      },
      "retentionArc": {
        "0-10s": "strategy",
        "10-30s": "strategy",
        "30-60s": "strategy"
      },
      "metadata": {
        "titles": ["title1", "title2"],
        "hashtags": ["#tag1", "#tag2"],
        "description": "string"
      },
      "hookScore": number (0-10),
      "viralScore": number (0-10)
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Strip markdown formatting if present
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate script via AI');
  }
};

export const generateHooksOnly = async (params: any) => {
  const { topic, platform, hookStyles, audienceAge } = params;

  const prompt = `
    Generate 15 viral hooks for ${platform} about "${topic}".
    Audience: ${audienceAge}
    Styles: ${hookStyles.join(', ')}

    Return ONLY a JSON object:
    {
      "hooks": [
        { "text": "hook text", "type": "QUESTION/STORY/etc", "strengthScore": 0.0-10.0 }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    throw new Error('Failed to generate hooks');
  }
};

export const analyzeVoiceProfile = async (samples: string[]) => {
  const prompt = `
    Analyze these writing samples and extract the unique writing style as a voice profile:
    Samples: ${samples.join('\n\n')}

    Return ONLY a JSON object:
    {
      "vocabularyLevel": "string",
      "toneSignature": "string",
      "commonPhrases": ["phrase1", ...],
      "slangStyle": "string",
      "writingPatterns": ["pattern1", ...],
      "wordsToAvoid": ["word1", ...]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    throw new Error('Failed to analyze voice profile');
  }
};
