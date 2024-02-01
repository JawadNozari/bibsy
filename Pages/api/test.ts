// this is a test NextJS api endpoint that returns a json object
// it is used to test the api service
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({ name: "Vercel Works!!!" })
}
