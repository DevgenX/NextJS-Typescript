import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// safeguard the api's, only allow the mentioned method to work
export function withMethods(methods: string[], handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method || !methods.includes(req.method)) {
      return res.status(405).end();
    }
    return handler(req, res);
  };
}
