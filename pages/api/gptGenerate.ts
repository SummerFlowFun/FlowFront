import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAIORG,
  apiKey: process.env.OPENAIAPIKEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const FoodName = req.body.foodName;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `치킨을 먹을때 껍질을 벗겨서 먹으면 조금더 튀김없이 건강하게 먹을 수 있어, 이런식으로 ${FoodName}을 먹을때 건강하게 먹을 수 있는 방법이 있다면 알려줄래?`,
        },
      ],
      model: "gpt-4o",
    });

    const GPTAnswer = completion.choices[0].message.content;
    res.status(200).json({ answer: GPTAnswer });
    res.status(200);
  } catch (error) {
    res.status(200).json({
      answer:
        "죄송합니다. 제가 답변할 수 없는 문제입니다. 다른 질문을 해주세요.",
    });
  }
}
