import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid iCal URL" })
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch iCal data")
    }

    const icalData = await response.text()
    res.status(200).send(icalData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch iCal data" })
  }
}
