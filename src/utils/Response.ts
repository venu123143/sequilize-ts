import { Response } from "express";

interface SuccessData {
  status?: number;
  message: string;
  data: {
    [key: string]: any;
  };
  meta?: {
    totalPages: number;
    currentPage: number;
    page_size?: number;
    total?: number;
  };
}

interface FailureData {
  message: string;
  status?: number;
  [key: string]: any;
}

type FailureStatus = 400 | 401 | 402 | 403 | 404 | 413 | 422 | 429 | 409 | 500 | 503;

const RESPONSE = {
  SuccessResponse: (res: Response, status: 200 | 201, data: SuccessData) => {
    return res.status(status).json(data);
  },
  FailureResponse: (res: Response, status: FailureStatus, data: FailureData) => {
    return res.status(status).json(data);
  },
};

export default RESPONSE;
