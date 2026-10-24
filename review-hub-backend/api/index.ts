import app from "../src/server";

export default function handler(req: any, res: any) {
  const server = (app as any).default || app;
  return server(req, res);
}
