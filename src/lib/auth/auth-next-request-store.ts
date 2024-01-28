import { AsyncLocalStorage } from "async_hooks";
import { logger } from "../logger";

export const nextRequestStorage = new AsyncLocalStorage<Request>();

export const nextRequestHeader = () => {
  logger.debug("nextRequestHeader", nextRequestStorage);
  return nextRequestStorage.getStore();
};
